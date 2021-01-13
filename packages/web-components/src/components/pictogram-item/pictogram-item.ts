/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { internalProperty, customElement, html, TemplateResult } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './pictogram-item.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  pictogram: '_hasPictogram',
};

/**
 * Pictogram item.
 *
 * @element dds-pictogram-item
 * @slot pictogram - The pictogram content.
 */
@customElement(`${ddsPrefix}-pictogram-item`)
class DDSPictogramItem extends StableSelectorMixin(DDSContentItem) {
  /**
   * `true` if there is a pictogram content.
   */
  @internalProperty()
  _hasPictogram = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange(event: Event) {
    const { target } = event;
    const { name } = target as HTMLSlotElement;
    if (!slotExistencePropertyNames[name]) {
      super._handleSlotChange(event);
      return;
    }
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name]] = hasContent;
  }

  /**
   * @returns The pictogram content.
   */
  protected _renderPictogram(): TemplateResult | string | void {
    const { _hasPictogram: hasPictogram, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasPictogram}" class="${prefix}--pictogram-item__wrapper">
        <slot class="${prefix}--pictogram-item__pictogram" name="pictogram" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      <div class="${prefix}--pictogram-item__row">
        ${this._renderPictogram()}
        <div class="${prefix}--pictogram-item__content">
          <div class="${prefix}--content-item">
            ${super.render()}
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pictogram-item`;
  }

  static styles = styles;
}

export default DDSPictogramItem;
