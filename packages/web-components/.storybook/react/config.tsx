/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { StrictMode } from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react'; // eslint-disable-line import/first
import { withKnobs } from '@storybook/addon-knobs';
import theme from '../theme';
import decoratorKnobs from '../decorator-knobs';
import containerStyles from '../container.scss'; // eslint-disable-line import/first

addParameters({
  options: {
    showRoots: true,
    theme,
  },
});

addDecorator(withKnobs);
addDecorator(decoratorKnobs);

addDecorator(story => {
  const result = story();
  const { hasMainTag } = result as any;
  return (
    <StrictMode>
      <style>{containerStyles.cssText}</style>
      <div
        id="main-content"
        data-floating-menu-container
        role={hasMainTag ? 'none' : 'main'}
        className="dds-ce-demo-devenv--container">
        {result}
      </div>
    </StrictMode>
  );
});

const reqComponents = require.context('../../src/components', true, /\.stories\.react\.[jt]sx?$/);
configure(reqComponents, module);

if (module.hot) {
  module.hot.accept(reqComponents.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, '', currentLocationHref);
    window.location.reload();
  });
}
