/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import Error20 from '@carbon/icons-react/es/error/20';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSCardLink from '@carbon/ibmdotcom-web-components/es/components-react/card-link/card-link';

export { default } from './card-link.stories';

export const Default = ({ parameters }) => {
  const { disabled, href } = parameters?.props?.['dds-card-link'] ?? {};
  return (
    <DDSCardLink disabled={disabled} href={href || undefined}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      {disabled ? <Error20 slot="footer" /> : <ArrowRight20 slot="footer" />}
    </DDSCardLink>
  );
};
