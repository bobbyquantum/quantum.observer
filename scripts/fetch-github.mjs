// Fetches the GitHub numbers the site shows and writes src/app/data/github.json.
// Runs before every build. If GitHub can't be reached, the last saved file is kept.
// Set GITHUB_TOKEN to raise the API rate limit (the GitHub Action does this).
import { readFile, writeFile } from 'node:fs/promises';

const OWNER = 'bobbyquantum';
const REPOS = ['inkweld', 'pomegranate', 'fracticons', 'fonts.quantum.observer'];
const OUT = new URL('../src/app/data/github.json', import.meta.url);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'quantum.observer-build',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path, { retries = 6 } = {}) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(`https://api.github.com${path}`, { headers });
    // GitHub answers 202 while it computes repository statistics.
    if (res.status === 202) {
      await sleep(3000);
      continue;
    }
    if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
    return res.json();
  }
  throw new Error(`${path}: statistics still being computed`);
}

async function repo(name) {
  const [activity, commits, release] = await Promise.all([
    get(`/repos/${OWNER}/${name}/stats/commit_activity`),
    get(`/repos/${OWNER}/${name}/commits?per_page=1`),
    get(`/repos/${OWNER}/${name}/releases/latest`).catch(() => null),
  ]);
  const weeks = Array.isArray(activity) ? activity.map((w) => w.total) : [];
  const out = {
    weeks,
    weekStart: Array.isArray(activity) && activity[0] ? new Date(activity[0].week * 1000).toISOString().slice(0, 10) : null,
    commitsYear: weeks.reduce((a, b) => a + b, 0),
    lastCommit: commits[0]?.commit?.committer?.date ?? null,
    release: release ? { tag: release.tag_name, date: release.published_at } : null,
  };
  if (name === 'inkweld') {
    const since = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
    const prs = await get(`/search/issues?q=repo:${OWNER}/${name}+is:pr+is:merged+merged:>=${since}&per_page=1`);
    out.prsMergedYear = prs.total_count;
  }
  return out;
}

try {
  const repos = {};
  for (const name of REPOS) repos[name] = await repo(name);
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), repos }, null, 2) + '\n');
  console.log('github.json updated');
} catch (err) {
  const existing = await readFile(OUT, 'utf8').catch(() => null);
  if (!existing) throw err;
  console.warn(`GitHub fetch failed, keeping the saved data: ${err.message}`);
}
