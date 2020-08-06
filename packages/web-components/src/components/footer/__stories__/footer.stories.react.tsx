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
import DDSFooterComposite from '@carbon/ibmdotcom-web-components/es/components-react/footer/footer-composite';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSFooterContainer from '@carbon/ibmdotcom-web-components/es/components-react/footer/footer-container';
import { FOOTER_SIZE } from '../footer';
import styles from './footer.stories.scss';

export { default } from './footer.stories';

export const Default = ({ parameters }) => {
  const { langDisplay, language, size, legalLinks, links, localeList } = parameters?.props?.['dds-footer-composite'] ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  const Component = useMock ? DDSFooterComposite : DDSFooterContainer;
  return (
    <>
      <style>{styles.cssText}</style>
      <Component
        language={language}
        langDisplay={langDisplay}
        legalLinks={legalLinks}
        links={links}
        localeList={localeList}
        size={size}
      />
    </>
  );
};

export const short = ({ parameters }) => {
  const { props = {} } = parameters;
  props['dds-footer-composite'] = {
    ...(props['dds-footer-composite'] || {}),
    size: FOOTER_SIZE.SHORT,
  };
  return Default({ parameters });
};
