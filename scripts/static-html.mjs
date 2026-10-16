// Turns the prerendered pages into plain static HTML: inlines the site stylesheet and removes the
// Angular scripts. Every page is complete as prerendered and nothing on the site needs JavaScript,
// so links become ordinary page loads and visitors download no JS at all.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../dist/analog/public/', import.meta.url));

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

const cssCache = new Map();
async function css(href) {
  if (!cssCache.has(href)) cssCache.set(href, await readFile(join(ROOT, href), 'utf8'));
  return cssCache.get(href);
}

const files = await htmlFiles(ROOT);
for (const file of files) {
  let html = await readFile(file, 'utf8');
  // Scripts: the app bundle, module preloads and Angular's transfer state.
  html = html.replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '');
  html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '');
  html = html.replace(/<script\b[^>]*id="ng-state"[^>]*>[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script\b[^>]*id="ng-event-dispatch-contract"[^>]*>[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>[^<]*__jsaction_bootstrap[\s\S]*?<\/script>/g, '');
  // Attributes only Angular's runtime reads (component style scoping attributes stay).
  html = html.replace(/\s(?:jsaction|routerlink|routerlinkactive|ariacurrentwhenactive|ngh|ng-server-context|ng-version)="[^"]*"/g, '');
  // The site stylesheet, inlined so nothing blocks the first paint.
  const links = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)];
  for (const [tag, href] of links) {
    html = html.replace(tag, `<style>${await css(href)}</style>`);
  }
  await writeFile(file, html);
}
const leftover = (await Promise.all(files.map((f) => readFile(f, 'utf8')))).filter((h) => /<script\b(?![^>]*application\/ld\+json)/.test(h));
console.log(`static html: ${files.length} pages${leftover.length ? `, ${leftover.length} still have scripts` : ', no scripts'}`);
