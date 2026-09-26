#!/usr/bin/env node
/**
 * brain.js — deterministic retrieval layer for a Life OS folder.
 *
 * Scores files WITHOUT reading them at query time. One indexing pass reads every
 * markdown file once and stores a compact JSON index; queries hit only the index.
 * No LLM, no embeddings, no network, no dependencies (Node 18+).
 *
 * Commands:
 *   node brain/brain.js index                          rebuild the index
 *   node brain/brain.js query "..." [-n N] [--json]    ranked retrieval
 *   node brain/brain.js stats                          index overview
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(__dirname, 'index.json');
const EXCLUDE_DIRS = new Set(['.git', 'node_modules', 'brain', '_templates']);

const STOP = new Set(('a an and are as at be but by for from has have how i if in into is it its me my of on or ' +
  'so that the their them then there these they this to was we what when where which who will with you your not no do does').split(' '));

// ---------- tokenizing ----------
function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9'-]*/g) || [])
    .map(t => t.replace(/'s$/, ''))
    .filter(t => t.length > 1 && !STOP.has(t));
}

// crude stemmer so "reviews" matches "review", "payments" matches "payment"
function stem(t) {
  return t.replace(/(ings?|ies|ied|ers?|ed|es|s)$/, m => (t.length - m.length >= 3 ? '' : m));
}

// ---------- indexing ----------
function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!EXCLUDE_DIRS.has(e.name)) walk(full, out);
    } else if (e.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function groupOf(rel) {
  if (rel.startsWith('north-star')) return 'north-star';
  const m = rel.match(/^(\d{2}-[^/]+)/);
  return m ? m[1] : 'root';
}

function parseDoc(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');

  let body = raw, fm = '';
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) { fm = fmMatch[1]; body = raw.slice(fmMatch[0].length); }
  const desc = (fm.match(/description:\s*(.+)/) || [])[1] || '';

  const title = (body.match(/^#\s+(.+)$/m) || [])[1] || path.basename(file, '.md');
  const headings = [...body.matchAll(/^#{2,4}\s+(.+)$/gm)].map(m => m[1]);
  const wikilinks = [...raw.matchAll(/\[\[([^\]|]+)/g)].map(m => m[1].trim().toLowerCase());

  // term frequencies with field weighting: title 8x, path 4x, headings/desc 3x, body 1x
  const tf = {};
  const add = (text, w) => { for (const t of tokenize(text)) { const s = stem(t); tf[s] = (tf[s] || 0) + w; } };
  add(title, 8);
  add(rel, 4);
  add(headings.join(' '), 3);
  add(desc + ' ' + fm, 3);
  add(wikilinks.join(' '), 3);
  add(body, 1);

  return {
    path: rel, group: groupOf(rel), title, desc: desc.slice(0, 160),
    headings: headings.slice(0, 12),
    words: tokenize(body).length,
    modified: fs.statSync(file).mtime.toISOString().slice(0, 10),
    tf,
  };
}

function buildIndex() {
  const docs = walk(ROOT).map(f => { try { return parseDoc(f); } catch { return null; } }).filter(Boolean);
  const df = {};
  for (const d of docs) for (const t of Object.keys(d.tf)) df[t] = (df[t] || 0) + 1;
  const index = { built: new Date().toISOString(), n: docs.length, df, docs };
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index));
  return index;
}

function loadIndex() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('No index yet — building one...');
    return buildIndex();
  }
  return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
}

// ---------- query (TF-IDF, length-normalized) ----------
function query(index, q, n = 8) {
  const terms = tokenize(q).map(stem);
  if (!terms.length) return [];
  const scored = [];
  for (const d of index.docs) {
    let score = 0; const hits = [];
    const len = Math.max(1, Object.values(d.tf).reduce((a, b) => a + b, 0));
    for (const t of terms) {
      const f = d.tf[t];
      if (!f) continue;
      const idf = Math.log(1 + index.n / (index.df[t] || 1));
      score += idf * (f / Math.sqrt(len)) * 100;
      hits.push(t);
    }
    if (!score) continue;
    if (hits.length === terms.length) score *= 1.5; // all terms present
    scored.push({ score: +score.toFixed(1), hits, doc: d });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, n);
}

// ---------- CLI ----------
const [cmd, ...args] = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('-')));
const nFlag = args.indexOf('-n');
const rest = args.filter((a, i) => !a.startsWith('-') && i !== nFlag + 1);

switch (cmd) {
  case 'index': {
    const t0 = Date.now();
    const idx = buildIndex();
    console.log(`Indexed ${idx.n} docs in ${Date.now() - t0}ms -> brain/index.json`);
    break;
  }
  case 'query': {
    const idx = loadIndex();
    const n = nFlag >= 0 ? +args[nFlag + 1] : 8;
    const t0 = Date.now();
    const results = query(idx, rest.join(' '), n);
    if (flags.has('--json')) {
      console.log(JSON.stringify(results.map(r => ({ score: r.score, path: r.doc.path, title: r.doc.title, group: r.doc.group, desc: r.doc.desc, headings: r.doc.headings })), null, 1));
      break;
    }
    if (!results.length) { console.log('No matches.'); break; }
    for (const r of results) {
      console.log(`${String(r.score).padStart(7)}  ${r.doc.path}`);
      console.log(`         ${r.doc.title}${r.doc.desc ? ' — ' + r.doc.desc : ''}  [${r.hits.join(', ')}]`);
    }
    console.log(`\n${results.length} results in ${Date.now() - t0}ms (0 file reads)`);
    break;
  }
  case 'stats': {
    const idx = loadIndex();
    const byGroup = {};
    for (const d of idx.docs) { (byGroup[d.group] = byGroup[d.group] || { n: 0, words: 0 }).n++; byGroup[d.group].words += d.words; }
    console.log(`Index: ${idx.n} docs, built ${idx.built}`);
    for (const [g, s] of Object.entries(byGroup).sort()) console.log(`  ${g.padEnd(22)} ${String(s.n).padStart(4)} docs  ${String(s.words).padStart(7)} words`);
    break;
  }
  default:
    console.log('Usage: brain.js index | query "..." [-n N] [--json] | stats');
}
