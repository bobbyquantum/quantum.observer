import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Mark } from './mark';

@Component({
  selector: 'qo-site-footer',
  imports: [RouterLink, Mark],
  template: `
    <footer>
      <div class="wrap inner">
        <span class="lockup"><qo-mark [size]="28" /><span>Quantum Observer</span></span>
        <nav aria-label="Footer">
          <a routerLink="/about">About</a>
          <a href="https://github.com/bobbyquantum">GitHub</a>
          <a href="/rss.xml">RSS</a>
          <a href="https://github.com/bobbyquantum/quantum.observer">Source</a>
        </nav>
        <span class="note">Set in Vesica, Figtree and JetBrains Mono. Commit counts from GitHub.</span>
      </div>
    </footer>
  `,
  styles: `
    footer { margin-top: 96px; background: var(--night-deep); }
    .inner {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4) var(--space-5);
      justify-content: space-between;
      align-items: center;
      padding-block: var(--space-5);
    }
    .lockup { display: flex; align-items: center; gap: 12px; font-family: var(--font-display); font-size: 18px; }
    nav { display: flex; flex-wrap: wrap; gap: 0 var(--space-2); font-size: 14px; }
    nav a { display: inline-flex; align-items: center; min-height: 44px; padding: 0 10px; color: var(--dusk); }
    nav a:hover { color: var(--starlight); }
    .note { font-size: 14px; color: var(--dusk); }
  `,
})
export class SiteFooter {}
