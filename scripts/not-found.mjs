// Workers static assets serve /404.html for missing pages. Analog prerenders the catch-all route at /404.
import { copyFile } from 'node:fs/promises';
const dir = new URL('../dist/analog/public/', import.meta.url);
await copyFile(new URL('404/index.html', dir), new URL('404.html', dir));
console.log('404.html written');
