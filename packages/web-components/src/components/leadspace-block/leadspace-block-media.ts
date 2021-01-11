/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, customElement, html, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './leadspace-block.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * LeadSpace Block Media Component.
 *
 * @element dds-leadspace-block-media
 */
@customElement(`${ddsPrefix}-leadspace-block-media`)
class DDSLeadSpaceBlockMedia extends StableSelectorMixin(LitElement) {
  /**
   * The shadow slot this media content should be in.
   */
  @property({ reflect: true })
  slot = 'media';

  render() {
    return html`
      <slot></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--leadspace-block__media`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSLeadSpaceBlockMedia;
