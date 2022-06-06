import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { RHDSScreenSizeController } from '../../lib/RHDSScreenSizeController.js';

import styles from './rh-pagination.css';

/**
 * Pagination
 * @slot - Place element content here
 */
@customElement('rh-pagination')
export class RhPagination extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  private static chevronLeft = html`
    <svg viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m31.7 239 136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/>
    </svg>
  `;

  private static chevronLeftDouble = html`
    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path d="m223.7 239 136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34 136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"/>
    </svg>
  `;

  // QUESTION: How does the SERP/data distinction work?
  // Should this be private state based on some initial light DOM conditions?
  // Is there a `.data` DOM property which overrides light DOM?
  @property() type: 'serp' | 'data' = 'serp';

  @property({ reflect: true }) overflow: 'start' | 'end' | 'both' | null = null;

  #screenSize = new RHDSScreenSizeController(this);
  #logger = new Logger(this);
  #nav: HTMLElement | null = this.querySelector('nav');
  #links = this.#nav?.querySelectorAll<HTMLAnchorElement>('li a');
  #currentIndex: number | null = null;
  #currentLink: HTMLAnchorElement | null = this.#getCurrentLink();
  #firstLink: HTMLAnchorElement | null = null;
  #lastLink: HTMLAnchorElement | null = null;
  #nextLink: HTMLAnchorElement | null = null;
  #prevLink: HTMLAnchorElement | null = null;

  update(changed: PropertyValues<this>): void {
    this.#update();
    super.update(changed);
  }

  render() {
    const { mobile, size } = this.#screenSize;
    return html`
    <div id="container" class=${classMap({ mobile, [size as string]: true })}>
      <a id="first" class="stepper" href=${ifDefined(this.#currentLink === this.#firstLink ? undefined : this.#firstLink?.href)}>
        <slot name="first-icon">${RhPagination.chevronLeftDouble}</slot>
      </a>
      <a id="prev" class="stepper" href=${ifDefined(this.#prevLink?.href)}>
        <slot name="prev-icon">${RhPagination.chevronLeft}</slot>
      </a>
      <div id="nav-container" ?hidden=${mobile}>
        <slot @slotchange=${this.#update}></slot>
      </div>
      <a id="next" class="stepper" href=${ifDefined(this.#nextLink?.href)}>
        <slot name="next-icon">${RhPagination.chevronLeft}</slot>
      </a>
      <a id="last" class="stepper" href=${ifDefined(this.#currentLink === this.#lastLink ? undefined : this.#lastLink?.href)}>
        <slot name="last-icon">${RhPagination.chevronLeftDouble}</slot>
      </a>
      <div id="numeric" ?hidden=${!(this.type === 'data' || mobile)}>
        <span id="go-to-page">
          <slot name="go-to-page">Go to page</slot>
        </span>
        <input inputmode="numeric" aria-labelledby="go-to-page" value=${(this.#currentIndex ?? 0) + 1} />
        <slot name="out-of">of</slot>
        <a href=${ifDefined(this.#lastLink?.href)}>${this.#links?.length}</a>
      </div>
    </div>
    `;
  }

  #getOverflow(): 'start' | 'end' | 'both' | null {
    if (this.#currentIndex === null) {
      return null;
    }

    const overflowAt = this.type === 'serp' ? 9 : 6;
    const length = this.#links?.length ?? 0;
    const current = this.#currentIndex + 1;

    if (current > (overflowAt - 4) && current < (length - 4)) {
      return 'both';
    } else if (current <= (overflowAt - 4)) {
      return 'end';
    } else {
      return 'start';
    }
  }

  #update() {
    this.#updateLightDOMRefs();
    this.overflow = this.#getOverflow();
    this.#validateA11y();
  }

  #getCurrentLink(): HTMLAnchorElement | null {
    const ariaCurrent = this.querySelector<HTMLAnchorElement>('li a[aria-current="page"]');
    if (ariaCurrent) {
      return ariaCurrent;
    }
    for (const link of this.#links ?? []) {
      const url = new URL(link.href);
      if (url.pathname === location.pathname && url.search === location.search && url.hash === location.hash) {
        return link;
      }
    }
    this.#logger.warn('could not determine current link');
    return null;
  }

  #updateLightDOMRefs(): void {
    // NB: order of operations! must set up state
    this.#nav = this.querySelector('nav');
    this.#links = this.querySelectorAll('li a');
    this.#firstLink = this.querySelector('li:first-child a');
    this.#lastLink = this.querySelector('li:last-child a');
    this.#currentLink = this.#getCurrentLink();
    if (this.#currentLink) {
      const links = Array.from(this.#links);
      this.#currentIndex = links.indexOf(this.#currentLink);
      this.#prevLink = this.#links[this.#currentIndex - 1];
      this.#nextLink = this.#links[this.#currentIndex + 1];
      for (const link of this.querySelectorAll('[data-page]')) {
        link.removeAttribute('data-page');
      }
      this.#currentLink.closest('li')?.setAttribute('data-page', 'current');
      this.#prevLink?.closest('li')?.setAttribute('data-page', 'previous');
      this.#nextLink?.closest('li')?.setAttribute('data-page', 'next');
    }
  }

  #validateA11y(): void {
    if (!this.#nav || this.children.length > 1) {
      this.#logger.warn('must have a single <nav> element as it\'s only child');
    }
    if (!this.#nav?.getAttribute('aria-label')) {
      this.#logger.warn('<nav> must have an aria-label attribute');
      this.#nav?.setAttribute('aria-label', 'Pagination Navigation');
    }
    if (!this.#nav?.querySelector('ol')) {
      this.#logger.warn('<nav> must have an <ol> as it\'s only child');
    }
    if (this.#currentLink?.getAttribute('aria-current') !== 'page') {
      this.#currentLink?.setAttribute('aria-current', 'page');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rh-pagination': RhPagination;
  }
}
