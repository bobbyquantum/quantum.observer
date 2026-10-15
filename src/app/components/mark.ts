import { Component, computed, input } from '@angular/core';

/** The Quantum Observer mark: two circles one radius apart, the overlap filled, the Q's tail two radii long. */
@Component({
  selector: 'qo-mark',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="-27 -27 71 71" aria-hidden="true">
      <path class="lens" d="M23.18 -6.21 A24 24 0 0 1 -6.21 23.18 A24 24 0 0 1 23.18 -6.21 Z" />
      <circle class="line" [attr.stroke-width]="stroke()" cx="0" cy="0" r="24" />
      <circle class="line" [attr.stroke-width]="stroke()" cx="16.97" cy="16.97" r="24" />
      <path class="line" [attr.stroke-width]="stroke()" d="M0 0 L33.94 33.94" />
    </svg>
  `,
  styles: `
    :host { display: inline-flex; }
    svg { display: block; }
    .lens { fill: var(--lens); }
    .line { fill: none; stroke: var(--starlight); stroke-linecap: round; }
  `,
})
export class Mark {
  readonly size = input(40);
  /** The heavy stroke reads better at 32px and below. */
  readonly stroke = computed(() => (this.size() <= 32 ? 8 : 5));
}
