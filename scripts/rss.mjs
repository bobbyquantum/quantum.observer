// Writes dist/analog/public/rss.xml from the updates in src/updates. Runs after the build.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import fm from 'front-matter';
import { marked } from 'marked';

const SITE = 'https://quantum.observer';
const DIR = new URL('../src/updates/', import.meta.url);
const OUT = new URL('../dist/analog/public/rss.xml', import.meta.url);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
const items = [];
for (const file of files) {
  const { attributes: a, body } = fm(await readFile(new URL(file, DIR), 'utf8'));
  // front-matter parses unquoted YAML dates into Date objects.
  const date = a.date instanceof Date ? a.date : new Date(`${a.date}T12:00:00Z`);
  items.push({ ...a, date, html: marked.parse(body) });
}
items.sort((a, b) => b.date - a.date);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Quantum Observer</title>
    <link>${SITE}/</link>
    <description>Updates on the things Bobby Quantum makes.</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (i) => `    <item>
      <title>${esc(`${i.tag}: ${i.title}`)}</title>
      <link>${SITE}/updates/${i.slug}</link>
      <guid>${SITE}/updates/${i.slug}</guid>
      <pubDate>${i.date.toUTCString()}</pubDate>
      <description>${esc(i.html)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;
await writeFile(OUT, xml);
console.log(`rss.xml: ${items.length} updates`);
