/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { text } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-copy';
import '../../image-with-caption/image-with-caption';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../../video-player/video-player-container';
import '../../button-group/button-group';
import '../../button-group/button-group-item';
import '../leadspace-block';
import '../leadspace-block-heading';
import '../leadspace-block-media';

import readme from './README.stories.mdx';

const image = html`
  <dds-image-with-caption
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <dds-image-item
      media="(min-width: 672px)"
      srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
    <dds-image-item
      media="(min-width: 400px)"
      srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
    <dds-image-item
      media="(min-width: 320px)"
      srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
  </dds-image-with-caption>
`;

const linkList = html`
  <dds-link-list slot="links" type="end">
    <dds-link-list-heading>Featured products</dds-link-list-heading>
    <dds-link-list-item-cta href="https://example.com" cta-type="local">
      IBM Cloud Continuous Delivery
    </dds-link-list-item-cta>
    <dds-link-list-item-cta href="https://example.com" cta-type="local">
      UrbanCode
    </dds-link-list-item-cta>
    <dds-link-list-item-cta href="https://example.com" cta-type="download">
      View all products
    </dds-link-list-item-cta>
  </dds-link-list>
`;

const buttonCTA = html`
  <dds-button-group slot="footer">
    <dds-button-group-item href="www.ibm.com">Contact sales ${ArrowRight20({ slot: 'icon' })}</dds-button-group-item>
  </dds-button-group>
`;

export const Default = ({ parameters }) => {
  const { title, heading, copy } = parameters?.props?.LeadSpaceBlock ?? {};
  return html`
    <dds-leadspace-block>
      <dds-leadspace-block-heading>${title}</dds-leadspace-block-heading>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy slot="copy">${copy}</dds-content-block-copy>
      <dds-leadspace-block-media>${image}</dds-leadspace-block-media>
      ${linkList}${buttonCTA}
    </dds-leadspace-block>
  `;
};

export const WithVideo = ({ parameters }) => {
  const { title, heading, copy } = parameters?.props?.LeadSpaceBlock ?? {};
  return html`
    <dds-leadspace-block>
      <dds-leadspace-block-heading>${title}</dds-leadspace-block-heading>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-copy slot="copy">${copy}</dds-content-block-copy>
      <dds-leadspace-block-media>
        <dds-video-player-container video-id="1_9h94wo6b"></dds-video-player-container>
      </dds-leadspace-block-media>
      ${linkList}${buttonCTA}
    </dds-leadspace-block>
  `;
};

export default {
  title: 'Components/LeadSpaceBlock',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      LeadSpaceBlock: ({ groupId }) => ({
        title: text('title (title)', 'Continuous delivery', groupId),
        heading: text('heading (required):', 'Innovate like a startup and scale for the enterprise ', groupId),
        copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
      }),
    },
    decorators: [
      story => html`
        <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content">
          ${story()}
        </div>
      `,
    ],
  },
};
