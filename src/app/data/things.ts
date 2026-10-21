import github from './github.json';

export interface RepoStats {
  weeks: number[];
  weekStart: string | null;
  commitsYear: number;
  lastCommit: string | null;
  release: { tag: string; date: string } | null;
  prsMergedYear?: number;
}

export const stats = github.repos as Record<string, RepoStats>;

/** The main thing, shown in the feature panel. */
export const feature = {
  name: 'Inkweld',
  repo: 'inkweld',
  label: 'Mostly working on · TypeScript · active',
  description:
    'A writing and world-building app. You host it yourself, it works offline first, and you can write with other people, then publish or export.',
  aside: 'It’s also how I procrastinate instead of finishing the book I’ve been working on for a long time.',
  source: 'https://github.com/bobbyquantum/inkweld',
  live: { href: 'https://inkweld.app', label: 'Try it at inkweld.app' },
  image: {
    src: '/images/inkweld-editor.webp',
    alt: 'Inkweld’s editor: a project tree on the left, and a chapter in the middle with character and place names highlighted as links',
    caption: 'The editor, with a project tree and linked characters and places',
  },
};

export interface Thing {
  name: string;
  status: string;
  /** Highlight the status (used for new things). */
  fresh?: boolean;
  description: string;
  href: string;
  repo: string;
  /** Show a Vesica type sample instead of the commit bars. */
  sample?: string;
  /** Text after the date on the last line when there is no release. */
  note?: string;
}

/** Everything else, in the column beside the updates. */
export const things: Thing[] = [
  {
    name: 'Vesica',
    status: 'new · typeface',
    fresh: true,
    description: 'A geometric monoline typeface built from the Quantum Observer mark. Free under the OFL.',
    href: 'https://fonts.quantum.observer',
    repo: 'fonts.quantum.observer',
    sample: 'Aa Bb Gg Qq Ss 0123',
    note: '0.15.1',
  },
  {
    name: 'Pomegranate',
    status: 'experimental · unstable',
    description: 'A reactive TypeScript database, with docs and an Expo example.',
    href: 'https://github.com/bobbyquantum/pomegranate',
    repo: 'pomegranate',
  },
  {
    name: 'Fracticons',
    status: 'stable · well tested',
    description: 'Deterministic fractal avatars.',
    href: 'https://bobbyquantum.github.io/fracticons/',
    repo: 'fracticons',
  },
];

/** Everything, for the Things page: the main project first. */
export const allThings: Thing[] = [
  {
    name: feature.name,
    status: 'active · main project',
    fresh: true,
    description: feature.description,
    href: feature.live.href,
    repo: feature.repo,
    note: 'latest commit',
  },
  ...things,
];
