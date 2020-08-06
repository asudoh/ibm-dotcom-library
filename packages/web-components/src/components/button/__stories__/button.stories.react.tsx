/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Add20 from '@carbon/icons-react/es/add/20';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSBtn from '@carbon/ibmdotcom-web-components/es/components-react/button/button';

export { default } from './button.stories';

export const Default = ({ parameters }) => {
  const { autofocus, disabled, download, href, hreflang, kind, ping, rel, size, target, type, onClick } =
    parameters?.props?.['dds-btn'] ?? {};
  return (
    <DDSBtn
      autofocus={autofocus}
      disabled={disabled}
      download={download}
      href={href}
      hreflang={hreflang}
      kind={kind}
      ping={ping}
      rel={rel}
      size={size}
      target={target}
      type={type}
      onClick={onClick}>
      Button
    </DDSBtn>
  );
};

export const icon = ({ parameters }) => {
  const { kind, disabled, size, href, onClick } = parameters?.props?.['dds-btn'] ?? {};
  return (
    <DDSBtn kind={kind} disabled={disabled} size={size} href={href || undefined} onClick={onClick}>
      <Add20 slot="icon" />
    </DDSBtn>
  );
};

export const textAndIcon = ({ parameters }) => {
  const { kind, disabled, size, href, onClick } = parameters?.props?.['dds-btn'] ?? {};
  return (
    <DDSBtn kind={kind} disabled={disabled} size={size} href={href || undefined} onClick={onClick}>
      Button
      <Add20 slot="icon" />
    </DDSBtn>
  );
};

textAndIcon.story = {
  name: 'Text and icon',
};
