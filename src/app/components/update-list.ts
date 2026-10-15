import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Update } from '../data/updates';

@Component({
  selector: 'qo-update-list',
  imports: [RouterLink, DatePipe],
  template: `
    <ol>
      @for (update of updates(); track update.attributes.slug) {
        <li>
          <a [routerLink]="['/updates', update.attributes.slug]">
            <time class="date" [attr.datetime]="update.attributes.date">{{ update.attributes.date | date: dateFormat() }}</time>
            <span class="body">
              <span class="label">{{ update.attributes.tag }}</span>
              <span class="title">{{ update.attributes.title }}</span>
              <span class="summary">{{ update.attributes.summary }}</span>
            </span>
          </a>
        </li>
      }
    </ol>
  `,
  styles: `
    ol { list-style: none; margin: 0; padding: 0; border-bottom: 1px solid var(--haze); }
    li { border-top: 1px solid var(--haze); }
    a {
      display: grid;
      grid-template-columns: 96px minmax(0, 1fr);
      gap: var(--space-3);
      padding: 20px 0;
      color: var(--starlight);
    }
    a:hover { text-decoration: none; }
    a:hover .title { color: var(--lens-text); }
    time { line-height: 30px; }
    .body { display: flex; flex-direction: column; gap: 6px; }
    .title { font-family: var(--font-display); font-size: 24px; line-height: 30px; }
    .summary { font-size: 16px; line-height: 25px; color: var(--dusk); max-width: 58ch; }
    @media (max-width: 480px) {
      a { grid-template-columns: 1fr; gap: var(--space-1); }
      time { line-height: 20px; }
    }
  `,
})
export class UpdateList {
  readonly updates = input.required<Update[]>();
  readonly dateFormat = input('d MMM');
}
