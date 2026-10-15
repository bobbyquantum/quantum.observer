import { Component } from '@angular/core';
import { RouteMeta } from '@analogjs/router';

export const routeMeta = {
  title: 'About · Quantum Observer',
} satisfies RouteMeta;

@Component({
  selector: 'qo-about',
  template: `
    <section class="wrap page">
      <h1>About</h1>
      <div class="prose">
        <p>I’m Bobby Quantum, and I make things for fun.</p>
        <p>I live by the sea and spend most of my time coaxing machines and materials into things they wouldn’t have done on their own.</p>
        <p>
          Everything I make here is public. The code is on <a href="https://github.com/bobbyquantum">GitHub</a>, the typefaces
          are on <a href="https://fonts.quantum.observer">fonts.quantum.observer</a>, and this site’s source is in
          <a href="https://github.com/bobbyquantum/quantum.observer">its own repository</a>.
        </p>
      </div>
    </section>
  `,
  styles: `
    .page { max-width: 784px; padding-top: 56px; }
    h1 { font-size: clamp(44px, 6vw, 64px); line-height: 1.05; margin-bottom: 32px; }
  `,
})
export default class About {}
