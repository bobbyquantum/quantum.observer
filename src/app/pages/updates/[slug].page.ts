import { Component, computed, effect, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { updates } from '../../data/updates';

@Component({
  selector: 'qo-update',
  imports: [RouterLink, DatePipe],
  template: `
    @if (update(); as u) {
      <article class="wrap page">
        <a routerLink="/updates" class="back">All updates</a>
        <div class="meta">
          <time class="date" [attr.datetime]="u.attributes.date">{{ u.attributes.date | date: 'd MMM y' }}</time>
          <span class="tag">{{ u.attributes.tag }}</span>
        </div>
        <h1>{{ u.attributes.title }}</h1>
        <div class="prose" [innerHTML]="body()"></div>

        @if (newer() || older()) {
          <nav aria-label="More updates" class="more">
            @if (newer(); as n) {
              <a [routerLink]="['/updates', n.attributes.slug]">
                <span class="label">Newer · {{ n.attributes.date | date: 'd MMM' }}</span>
                <span class="title">{{ n.attributes.title }}</span>
              </a>
            }
            @if (older(); as o) {
              <a [routerLink]="['/updates', o.attributes.slug]">
                <span class="label">Older · {{ o.attributes.date | date: 'd MMM' }}</span>
                <span class="title">{{ o.attributes.title }}</span>
              </a>
            }
          </nav>
        }
      </article>
    } @else {
      <section class="wrap page">
        <h1>Nothing here</h1>
        <p>There’s no update at this address. <a routerLink="/updates">See all updates</a>.</p>
      </section>
    }
  `,
  styles: `
    .page { max-width: 784px; padding-top: 56px; }
    .back { display: inline-flex; align-items: center; min-height: 44px; font-size: 15px; }
    .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; margin-top: var(--space-4); }
    .tag {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: 0 12px;
      border-radius: var(--radius-full);
      border: 1px solid var(--lens-text);
      color: var(--lens-text);
      font-size: 13px;
    }
    h1 { margin-top: var(--space-3); font-size: clamp(36px, 5vw, 56px); line-height: 1.1; }
    .prose { margin-top: 32px; }
    .more {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
      gap: var(--space-3);
      margin-top: var(--space-6);
    }
    .more a { display: flex; flex-direction: column; gap: 6px; padding: 20px 0; border-top: 1px solid var(--haze); color: var(--starlight); }
    .more a:hover { text-decoration: none; }
    .more a:hover .title { color: var(--lens-text); }
    .more .label { letter-spacing: 0.08em; }
    .more .title { font-family: var(--font-display); font-size: 22px; line-height: 28px; }
  `,
})
export default class UpdatePage {
  private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('slug'))));
  private readonly index = computed(() => updates.findIndex((u) => u.attributes.slug === this.slug()));
  private readonly sanitizer = inject(DomSanitizer);

  readonly update = computed(() => updates[this.index()] ?? null);
  // The HTML comes from Markdown files in this repository, so it is trusted.
  readonly body = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.update()?.html ?? ''));
  readonly newer = computed(() => (this.index() > 0 ? updates[this.index() - 1] : null));
  readonly older = computed(() => (this.index() >= 0 && this.index() < updates.length - 1 ? updates[this.index() + 1] : null));

  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);
    effect(() => {
      const u = this.update();
      if (!u) return;
      title.setTitle(`${u.attributes.title} · Quantum Observer`);
      meta.updateTag({ name: 'description', content: u.attributes.summary });
    });
  }
}
