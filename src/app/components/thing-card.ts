import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Thing, stats } from '../data/things';
import { CommitBars } from './commit-bars';

@Component({
  selector: 'qo-thing-card',
  imports: [CommitBars, DatePipe],
  template: `
    @let t = thing;
    <a [href]="t.href">
      <span class="top">
        <span class="name">{{ t.name }}</span>
        <span class="status" [class.fresh]="t.fresh">{{ t.status }}</span>
      </span>
      <span class="desc">{{ t.description }}</span>
      @if (t.sample) {
        <span class="sample" aria-hidden="true">{{ t.sample }}</span>
      } @else if (repo; as r) {
        <qo-commit-bars [weeks]="r.weeks" [height]="28" />
      }
      @if (latest; as l) {
        <span class="date latest">{{ l.date | date: 'd MMM y' : 'UTC' }} · {{ l.text }}</span>
      }
    </a>
  `,
  styles: `
    a {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: var(--space-4);
      border-radius: var(--radius-m);
      background: var(--night-raised);
      color: var(--starlight);
    }
    a:hover { text-decoration: none; outline: 1px solid var(--lens); }
    .top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 4px 12px; }
    .name { font-family: var(--font-display); font-size: 26px; line-height: 32px; overflow-wrap: break-word; min-width: 0; }
    .status { font-family: var(--font-mono); font-size: 12px; color: var(--dusk); white-space: nowrap; }
    .status.fresh { color: var(--lens-text); }
    .desc { font-size: 15px; line-height: 24px; color: var(--dusk); }
    .sample {
      font-family: var(--font-display);
      font-size: 28px;
      line-height: 28px;
      height: 28px;
      white-space: nowrap;
      overflow: hidden;
    }
    .latest { color: var(--starlight); }
  `,
})
export class ThingCard {
  @Input({ required: true }) thing!: Thing;

  get repo() {
    return stats[this.thing.repo] ?? null;
  }

  /** The latest release if there is one, otherwise the latest commit with the thing's note. */
  get latest(): { date: string; text: string } | null {
    const r = this.repo;
    if (!r) return null;
    if (r.release) return { date: r.release.date, text: r.release.tag };
    return r.lastCommit ? { date: r.lastCommit, text: this.thing.note ?? 'latest commit' } : null;
  }
}
