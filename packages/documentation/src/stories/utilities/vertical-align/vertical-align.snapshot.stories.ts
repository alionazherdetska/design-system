import type { StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import meta from './vertical-align.stories';
import './vertical-align.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const VerticalAlign: Story = {
  render: () => {
    return html`
      ${meta?.argTypes?.align?.options?.map(
        align =>
          html`<div>
            <span>${align ? `align-${align}` : 'text'}</span>
            <img class="logo align-${align}" alt="logo" src="/assets/images/logo-swisspost.svg" />
          </div>`,
      )}
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="snapshot">${story(context.args, context)}</div>`;
      return storyTemplate;
    },
  ],
};