import { Component } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { feature, stats, things } from '../data/things';
import { updates } from '../data/updates';
import { CommitBars } from '../components/commit-bars';
import { ThingCard } from '../components/thing-card';
import { UpdateList } from '../components/update-list';

export const routeMeta = {
  title: 'Quantum Observer',
} satisfies RouteMeta;

@Component({
  selector: 'qo-home',
  imports: [RouterLink, DatePipe, DecimalPipe, CommitBars, ThingCard, UpdateList],
  template: `
    <section class="wrap intro">
      <p>I’m Bobby Quantum, and I make things for fun.</p>
    </section>

    <section class="wrap">
      <article class="feature">
        <div class="feature__top">
          <div class="feature__text">
            <div class="label">{{ feature.label }}</div>
            <h1>{{ feature.name }}</h1>
            <p>{{ feature.description }}</p>
            <p class="aside">{{ feature.aside }}</p>
            <div class="actions">
              <a class="btn btn--primary" [href]="feature.source">Source on GitHub</a>
              <a class="btn btn--secondary" [href]="feature.live.href">{{ feature.live.label }}</a>
            </div>
            <dl class="stats">
              <div><dt class="label">Commits, last year</dt><dd>{{ ink.commitsYear | number }}</dd></div>
              @if (ink.prsMergedYear) {
                <div><dt class="label">Pull requests merged</dt><dd>{{ ink.prsMergedYear | number }}</dd></div>
              }
              @if (ink.lastCommit) {
                <div><dt class="label">Last change</dt><dd>{{ ink.lastCommit | date: 'd MMM' : 'UTC' }}</dd></div>
              }
            </dl>
          </div>
          <figure class="feature__shot">
            <img [src]="feature.image.src" [alt]="feature.image.alt" width="800" height="500" />
            <figcaption>{{ feature.image.caption }}</figcaption>
          </figure>
        </div>
        <div class="feature__activity">
          <div class="label activity__head"><span>Commits per week</span><span>The last 52 weeks</span></div>
          <qo-commit-bars [weeks]="ink.weeks" [weekStart]="ink.weekStart" [height]="72" [gap]="3" [months]="true" />
        </div>
      </article>
    </section>

    <section class="wrap columns">
      <div class="updates">
        <div class="head">
          <h2>Updates</h2>
          <a routerLink="/updates">All updates</a>
        </div>
        <qo-update-list [updates]="updates" />
      </div>
      <div class="others">
        <h2>Other things</h2>
        @for (thing of things; track thing.name) {
          <qo-thing-card [thing]="thing" />
        }
      </div>
    </section>
  `,
  styles: `
    .intro { padding-top: var(--space-5); padding-bottom: 32px; }
    .intro p {
      margin: 0;
      max-width: 30ch;
      font-family: var(--font-display);
      font-size: clamp(26px, 3.2vw, 36px);
      line-height: 1.3;
    }

    .feature {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      padding: clamp(24px, 4vw, 48px);
      border-radius: var(--radius-l);
      background: var(--night-raised);
    }
    .feature__top { display: flex; flex-wrap: wrap; gap: 32px 56px; }
    .feature__text { flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 18px; }
    h1 { font-size: clamp(60px, 8vw, 104px); line-height: 0.95; }
    .feature__text p { margin: 0; font-size: 18px; line-height: 29px; max-width: 44ch; }
    .feature__text p.aside { color: var(--dusk); }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
    .stats { display: flex; flex-wrap: wrap; gap: var(--space-3) var(--space-5); margin: 8px 0 0; }
    .stats dt { letter-spacing: 0.08em; }
    .stats dd { margin: 4px 0 0; font-family: var(--font-display); font-size: 34px; line-height: 40px; }
    .feature__shot { flex: 1.2 1 420px; min-width: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
    .feature__shot img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 8 / 5;
      object-fit: cover;
      border-radius: var(--radius-m);
      border: 1px solid var(--haze);
    }
    .feature__shot figcaption { font-family: var(--font-mono); font-size: 12px; color: var(--dusk); }
    .activity__head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; margin-bottom: 10px; letter-spacing: 0.08em; }

    .columns {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: var(--space-5) var(--space-6);
      padding-top: 56px;
    }
    .updates { flex: 1 1 560px; min-width: 0; }
    .head { display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-3); margin-bottom: 8px; }
    .head a { font-size: 15px; }
    h2 { font-size: 30px; line-height: 36px; }
    .others { flex: 1 1 320px; min-width: 0; display: flex; flex-direction: column; gap: var(--space-3); }
    .others h2 { margin-bottom: 4px; }
  `,
})
export default class Home {
  readonly feature = feature;
  readonly ink = stats[feature.repo];
  readonly things = things;
  readonly updates = updates;
}
