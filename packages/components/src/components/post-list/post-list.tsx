import { Component, Element, Prop, Host, State, h } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing the list title.
 * @slot post-list-item - Slot for placing post-list-item components.
 */

@Component({
  tag: 'post-list',
  styleUrl: 'post-list.scss',
  shadow: false,
})
export class PostList {
  @Element() host: HTMLPostListElement;

  /**
   * The unique title of the list that is also referenced in the labelledby
   */
  @State() titleId: string;

  /**
   * If `true`, the list title will be hidden. Otherwise, it will be displayed.`
   */
  @Prop() readonly titleHidden: boolean = false;

  /**
   * The list can become horizontal by setting `horizontal="true"` or just `horizontal`
   */
  @Prop() readonly horizontal: boolean = false;

  titleEl: HTMLElement;

  componentWillLoad() {
    /**
     * Get the id set on the host element or use a random id by default
     */
    this.titleId = `list-${crypto.randomUUID()}`;
  }

  componentDidLoad() {
    this.checkTitle();
  }

  private checkTitle() {
    if (!this.titleEl.innerText) {
      throw new Error(
        'Please provide a title to the list component. Title is mandatory for accessibility purposes.',
      );
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          ref={el => (this.titleEl = el)}
          id={this.titleId}
          class={`list-title${this.titleHidden ? ' visually-hidden' : ''}`}
        >
          <slot></slot>
        </div>
        <div role="list" aria-labelledby={this.titleId}>
          <slot name="post-list-item"></slot>
        </div>
      </Host>
    );
  }
}