/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSCtaContainer from '@carbon/ibmdotcom-web-components/es/components-react/cta/cta-container';
import metadata from './cta.stories';

export const Default = ({ parameters }) => {
  const { ctaStyle, item } = parameters?.props?.['dds-cta-container'] ?? {};
  return <DDSCtaContainer ctaStyle={ctaStyle} item={item} />;
};

const { title, parameters } = metadata;

export default {
  title,
  decorators: [
    story => (
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">{story()}</div>
        </div>
      </div>
    ),
  ],
  parameters,
};
