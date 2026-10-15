import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { updates } from '../../data/updates';
import { UpdateList } from '../../components/update-list';

export const routeMeta = {
  title: 'Updates · Quantum Observer',
} satisfies RouteMeta;

@Component({
  selector: 'qo-updates',
  imports: [UpdateList],
  template: `
    <section class="wrap page">
      <h1>Updates</h1>
      <p class="lede">What changed in the things I make, newest first. Also as an <a href="/rss.xml">RSS feed</a>.</p>
      <qo-update-list [updates]="updates" dateFormat="d MMM y" />
    </section>
  `,
  styles: `
    .page { max-width: 880px; padding-top: 56px; }
    h1 { font-size: clamp(44px, 6vw, 64px); line-height: 1.05; }
    .lede { margin: 16px 0 40px; color: var(--dusk); font-size: 18px; }
  `,
})
export default class Updates {
  readonly updates = updates;
}
