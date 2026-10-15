import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';

export const routeMeta = {
  title: 'Not found · Quantum Observer',
} satisfies RouteMeta;

@Component({
  selector: 'qo-not-found',
  imports: [RouterLink],
  template: `
    <section class="wrap page">
      <h1>Nothing here</h1>
      <p>This page doesn’t exist. Try the <a routerLink="/">home page</a> or the <a routerLink="/updates">updates</a>.</p>
    </section>
  `,
  styles: `
    .page { max-width: 784px; padding-top: 56px; }
    h1 { font-size: clamp(44px, 6vw, 64px); line-height: 1.05; margin-bottom: 16px; }
  `,
})
export default class NotFound {}
