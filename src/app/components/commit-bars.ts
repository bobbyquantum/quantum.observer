import { Component, Input } from '@angular/core';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** One bar per week. Height is the square root of the week's commits against the busiest week. */
@Component({
  selector: 'qo-commit-bars',
  template: `
    <div class="bars" [style.height.px]="height" [style.gap.px]="gap" aria-hidden="true">
      @for (bar of bars; track $index) {
        <span [class.empty]="!bar" [style.height.px]="bar"></span>
      }
    </div>
    @if (months) {
      <div class="months" aria-hidden="true">
        @for (label of monthLabels; track $index) {
          <span>{{ label }}</span>
        }
      </div>
    }
  `,
  styles: `
    :host { display: block; }
    .bars { display: flex; align-items: flex-end; }
    .bars span { flex: 1 1 0; min-width: 1px; border-radius: 2px; background: var(--lens); }
    .bars span.empty { height: 1px !important; background: var(--haze); }
    .months {
      display: grid;
      grid-template-columns: repeat(52, minmax(0, 1fr));
      margin-top: 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--dusk);
      white-space: nowrap;
    }
  `,
})
export class CommitBars {
  @Input({ required: true }) weeks: number[] = [];
  @Input() height = 28;
  @Input() gap = 2;
  @Input() months = false;
  /** Date of the first week, YYYY-MM-DD. */
  @Input() weekStart: string | null = null;

  get bars(): number[] {
    const max = Math.max(1, ...this.weeks);
    return this.weeks.map((n) => (n ? Math.max(3, Math.round(this.height * Math.sqrt(n / max))) : 0));
  }

  /** A month name on the first week that starts in each month. */
  get monthLabels(): string[] {
    if (!this.weekStart) return [];
    const first = new Date(`${this.weekStart}T00:00:00Z`);
    let last = -1;
    return this.weeks.map((_, i) => {
      const m = new Date(first.getTime() + i * 7 * 864e5).getUTCMonth();
      if (m === last) return '';
      last = m;
      return MONTHS[m];
    });
  }
}
