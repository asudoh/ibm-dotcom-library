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
import 'carbon-web-components/es/components/button/button';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSBtn from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModal from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModalHeader from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal-header';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModalHeading from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal-heading';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModalCloseButton from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal-close-button';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModalBody from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal-body';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModalFooter from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal-footer';
import styles from './modal.stories.scss';

export { default } from './modal.stories';

export const Default = ({ parameters }) => {
  const { open, disableClose, expressiveSize, onBeforeClose, onClose } = parameters?.props?.['dds-modal'] ?? {};
  const { buttonContent } = parameters?.props?.Other ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <>
      <style>{styles.cssText}</style>
      <DDSModal open={open} expressiveSize={expressiveSize} onBeforeClose={handleBeforeClose} onClose={onClose}>
        <DDSModalHeader>
          <DDSModalCloseButton></DDSModalCloseButton>
          <DDSModalHeading>Modal Title</DDSModalHeading>
        </DDSModalHeader>
        <DDSModalBody>
          Quisque felis odio, egestas vel tempus iaculis, interdum vel eros. Phasellus pharetra, purus et pretium posuere, ipsum
          risus pulvinar leo, non rutrum tortor risus vitae quam. Nulla sed nibh felis. Maecenas nec tincidunt eros. Fusce
          sollicitudin sit amet quam eu fringilla. Donec tincidunt ut nisi vitae pharetra. Curabitur imperdiet ante sit amet mi
          laoreet, vitae facilisis ante convallis. Aenean quis dapibus augue. Sed nisl dui, scelerisque et augue eget, pharetra
          commodo elit. In venenatis sapien eu nisl congue suscipit.
        </DDSModalBody>
        <DDSModalFooter>
          <DDSBtn>
            {buttonContent}
            <ArrowRight20 slot="icon" />
          </DDSBtn>
        </DDSModalFooter>
      </DDSModal>
    </>
  );
};
