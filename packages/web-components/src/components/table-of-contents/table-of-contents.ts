/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './table-of-contents.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Table of contents.
 *
 * @element dds-table-of-contents
 */
@customElement(`${ddsPrefix}-table-of-contents`)
class DDSTableOfContents extends StableSelectorMixin(LitElement) {
  /**
   * The alternate text.
   */
  @property()
  alt = '';

  /**
   * The image source.
   */
  @property({ attribute: 'default-src' })
  defaultSrc = '';

  render() {
    const { alt, defaultSrc, _images: images, _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
      <picture>
        ${images.map(
          image => html`<source media="${image.getAttribute('media')}" srcset="${image.getAttribute('srcset')}"></source>`
        )}
        <img class="${prefix}--table-of-contents__img" src="${defaultSrc}" alt="${alt}" aria-describedby="long-description" />
      </picture>
      <div id="long-description" class="${prefix}--table-of-contents__longdescription">
        <slot name="long-description"></slot>
      </div>
      <slot name="icon"></slot>
    `;
  }

  /**
   * A selector that will return image items.
   */
  static get selectorItem() {
    return `${ddsPrefix}-table-of-contents-item`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--tableofcontents`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTableOfContents;
