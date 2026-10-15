import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <qo-site-header />
    <main id="main">
      <router-outlet />
    </main>
    <qo-site-footer />
  `,
  styles: `
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    main { flex: 1 0 auto; }
  `,
})
export class App {}
