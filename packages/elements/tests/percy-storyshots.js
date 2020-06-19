/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { html, render } = require('lit-html');

const specContext = require.context('../src', true, /-story\.ts$/);
const storyModules = specContext.keys().map(specContext);

const template = content => html`
  <style type="text/css">
    body {
      font-family: sans-serif;
    }
  </style>
  ${content}
`;

/**
 * @returns {Promise<void>} A promise that is resolved when animation frame runs
 */
function waitRAF() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}

/* eslint-disable func-names */

describe('Test stories', function() {
  storyModules.forEach(storyModule => {
    const { title: groupTitle } = storyModule.default ?? {};

    Object.keys(storyModule).forEach(name => {
      const Story = storyModule[name];
      if (typeof Story === 'function') {
        const { parameters, title = name } = Story.story ?? {};
        const { testProps = storyModule.default?.parameters?.testProps } = parameters ?? {};

        if (testProps) {
          it(`Should send Percy snapshot for ${groupTitle}|${title}`, async function() {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of testProps) {
              // eslint-disable-next-line no-await-in-loop
              await render(template(Story({ parameters: { props: item } })), document.body);
              // eslint-disable-next-line no-await-in-loop
              await waitRAF();
              // eslint-disable-next-line no-await-in-loop
              await expect().toSendPercySnapshot();
            }
          });
        }
      }
    });
  });

  afterEach(async function() {
    await render(undefined, document.body);
  });
});
