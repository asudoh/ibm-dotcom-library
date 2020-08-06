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
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/link-with-icon/link-with-icon';

export { default } from './link-with-icon.stories';

export const Default = ({ parameters }) => {
  const { children, disabled, href, onClick } = parameters?.props?.['dds-link-with-icon'] ?? {};
  return (
    <DDSLinkWithIcon disabled={disabled} href={href} onClick={onClick}>
      {children}
      <ArrowRight20 slot="icon" />
    </DDSLinkWithIcon>
  );
};
