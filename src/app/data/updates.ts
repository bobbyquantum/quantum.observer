import fm from 'front-matter';
import { marked } from 'marked';

export interface UpdateAttributes {
  title: string;
  slug: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Which thing the update is about, e.g. Inkweld or Vesica. */
  tag: string;
  summary: string;
}

export interface Update {
  attributes: UpdateAttributes;
  /** The Markdown body rendered to HTML. */
  html: string;
}

// Updates live in src/updates rather than src/content: Analog turns every Markdown file under
// src/content into a route of its own, which would replace the update page below.
const files = import.meta.glob<string>('/src/updates/*.md', { query: '?raw', import: 'default', eager: true });

function isoDate(value: unknown): string {
  // front-matter parses an unquoted YAML date into a Date.
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

/** All updates, newest first. */
export const updates: Update[] = Object.values(files)
  .map((raw) => {
    const { attributes, body } = fm<UpdateAttributes>(raw);
    return {
      attributes: { ...attributes, date: isoDate(attributes.date) },
      html: marked.parse(body, { async: false }),
    };
  })
  .sort((a, b) => b.attributes.date.localeCompare(a.attributes.date));
