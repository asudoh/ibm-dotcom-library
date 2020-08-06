/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import 'carbon-web-components/es/components/modal/modal-close-button';
import BXModalCloseButton from 'carbon-web-components/es/components-react/modal/modal-close-button';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import DDSModal from '@carbon/ibmdotcom-web-components/es/components-react/modal/modal';
// @ts-ignore
// eslint-disable-next-line max-len, import/no-extraneous-dependencies
import DDSLightboxMediaViewerBody from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-media-viewer-body';
// @ts-ignore
// eslint-disable-next-line max-len, import/no-extraneous-dependencies
import DDSLightboxVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-video-player-container';
import styles from './lightbox-media-viewer.stories.scss';

export { default } from './lightbox-media-viewer.stories';

export const EmbeddedVideoPlayer = ({ parameters }) => {
  const { open, disableClose, onBeforeClose, onClose } = parameters?.props?.['dds-modal'] ?? {};
  const { hideCaption, videoId } = parameters?.props?.['dds-lightbox-video-player-container'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <>
      <style>{styles.cssText}</style>
      <DDSLightboxVideoPlayerContainer hideCaption={hideCaption} videoId={videoId}>
        <DDSModal open={open} size="full-width" onBeforeClose={handleBeforeClose} onClose={onClose}>
          <BXModalCloseButton />
          <DDSLightboxMediaViewerBody />
        </DDSModal>
      </DDSLightboxVideoPlayerContainer>
    </>
  );
};
