import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Mark } from './mark';

@Component({
  selector: 'qo-site-header',
  imports: [RouterLink, RouterLinkActive, Mark],
  template: `
    <header class="wrap">
      <a class="home" routerLink="/">
        <qo-mark [size]="40" />
        <span class="word">Quantum Observer</span>
      </a>
      <nav aria-label="Main">
        <a routerLink="/updates" routerLinkActive="current" ariaCurrentWhenActive="page">Updates</a>
        <a href="https://fonts.quantum.observer">Fonts</a>
        <a routerLink="/about" routerLinkActive="current" ariaCurrentWhenActive="page">About</a>
      </nav>
    </header>
  `,
  styles: `
    header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2) var(--space-5);
      padding-block: var(--space-4);
    }
    .home {
      display: flex;
      align-items: center;
      gap: 14px;
      min-height: 44px;
      color: var(--starlight);
    }
    .home:hover { text-decoration: none; }
    .word { font-family: var(--font-display); font-size: 26px; line-height: 32px; }
    nav { display: flex; flex-wrap: wrap; gap: 0 var(--space-1); font-size: 15px; }
    nav a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      padding: 0 12px;
      color: var(--dusk);
    }
    nav a:hover { color: var(--starlight); text-decoration: none; }
    nav a.current { color: var(--starlight); box-shadow: inset 0 -2px 0 var(--lens); }
  `,
})
export class SiteHeader {}
