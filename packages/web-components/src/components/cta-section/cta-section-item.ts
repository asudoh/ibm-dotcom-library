/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, css, customElement, TemplateResult } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './cta-section.scss';
import DDSContentItem from '../content-item/content-item';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * List item version of Content Item.
 *
 * @element dds-cta-section-item
 */
@customElement(`${ddsPrefix}-cta-section-item`)
class DDSCTASectionItem extends StableSelectorMixin(DDSContentItem) {
  /**
   * @returns The footer content.
   */
  protected _renderFooter(): TemplateResult | string | void {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot name="footer" @slotchange="${handleSlotChange}"></slot>
    `;
  }

  /**
   * The shadow slot this CTA section item should be in.
   */
  @property({ reflect: true })
  slot = 'items';

  static get stableSelector() {
    return `${ddsPrefix}--cta-section-item`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

export default DDSCTASectionItem;
