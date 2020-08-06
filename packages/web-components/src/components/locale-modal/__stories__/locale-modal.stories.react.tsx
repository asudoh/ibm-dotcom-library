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
// eslint-disable-next-line max-len, import/no-extraneous-dependencies
import DDSLocaleModalContainer from '@carbon/ibmdotcom-web-components/es/components-react/locale-modal/locale-modal-container';
import styles from './locale-modal.stories.scss';

export { default } from './locale-modal.stories';

export const Default = ({ parameters }) => {
  const { langDisplay, localeList } = parameters?.props?.['dds-locale-modal-container'];
  return (
    <>
      <style>{styles.cssText}</style>
      <DDSLocaleModalContainer langDisplay={langDisplay} open localeList={localeList} />
    </>
  );
};
