/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html'; // eslint-disable-line import/first
import { classMap } from 'lit-html/directives/class-map';
import 'carbon-web-components/es/components/skip-to-content/skip-to-content.js';
import coreEvents from '@storybook/core-events';
import addons from '@storybook/addons';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import theme from './theme';
import getSimpleStorySort from './get-simple-story-sort';
import containerStyles from './container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', (preservedTheme = theme));
  // Re-rendering upon theme change causes adverse effect for some stories
  if (!document.documentElement.hasAttribute('storybook-carbon-theme-prevent-reload')) {
    addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
  }
});

addons.setConfig({
  showRoots: true,
  theme,
});

export const parameters = {
  options: {
    showRoots: true,
    storySort: getSimpleStorySort([
      'overview-getting-started--page',
      'overview-building-for-ibm-dotcom--page',
      'overview-stable-selectors--page',
      'overview-using-server-side-template--page',
      'overview-enable-right-to-left-rtl--page',
      'overview-feature-flags--page',
      'overview-contributing-to-the-web-components-package--page',
    ]),
    theme: theme,
  },
};

let preservedTheme;

export const decorators = [
  function decoratorContainer(story, { parameters }) {
    const result = story();
    const { hasMainTag } = result as any;
    const { hasCardGroup, hasCardGroupStandalone, hasGrid, hasVerticalSpacingInComponent, useRawContainer } = parameters;
    const classes = classMap({
      'dds-ce-demo-devenv--container': !useRawContainer,
      'dds-ce-demo-devenv--container--has-card-group': hasCardGroup,
      'dds-ce-demo-devenv--container--has-card-group-standalone': hasCardGroupStandalone,
      'dds-ce-demo-devenv--container--has-grid': hasGrid,
      'dds-ce-demo-devenv--container--has-vertical-spacing-in-component': hasVerticalSpacingInComponent,
    });
    return html`
      <style>
        ${containerStyles}
      </style>
      <bx-skip-to-content href="#main-content">Skip to main content</bx-skip-to-content>
      <div
        id="main-content"
        name="main-content"
        data-floating-menu-container
        data-modal-container
        role="${hasMainTag ? 'none' : 'main'}"
        class="${classes}"
      >
        ${result}
      </div>
    `;
  },
  function decoratorDisabledCarbonTheme(story, { parameters }) {
    const root = document.documentElement;
    root.toggleAttribute('storybook-carbon-theme-prevent-reload', parameters['carbon-theme']?.preventReload);
    if (parameters['carbon-theme']?.disabled) {
      root.setAttribute('storybook-carbon-theme', '');
    } else {
      root.setAttribute('storybook-carbon-theme', preservedTheme || '');
    }
    return story();
  },
];
