import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';
import { allThings } from '../data/things';
import { ThingCard } from '../components/thing-card';

export const routeMeta = {
  title: 'Things · Quantum Observer',
} satisfies RouteMeta;

@Component({
  selector: 'qo-things',
  imports: [ThingCard],
  template: `
    <section class="wrap page">
      <h1>Things</h1>
      <p class="lede">Everything I make here is public. The bars show commits per week over the last year.</p>
      <div class="grid">
        @for (thing of things; track thing.name) {
          <qo-thing-card [thing]="thing" />
        }
      </div>
    </section>
  `,
  styles: `
    .page { padding-top: 56px; }
    h1 { font-size: clamp(44px, 6vw, 64px); line-height: 1.05; }
    .lede { margin: 16px 0 40px; color: var(--dusk); font-size: 18px; max-width: 60ch; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
      gap: var(--space-3);
    }
  `,
})
export default class Things {
  readonly things = allThings;
}
