/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-with-media.scss';
import DDSCalloutMixin from '../../component-mixins/callout/callout';
import DDSContentBlock from '../content-block/content-block';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-with-media`)
class DDSCalloutWithMedia extends DDSCalloutMixin(DDSContentBlock) {
  // eslint-disable-next-line class-methods-use-this
  protected _renderContent() {
    // Renders `<div class="bx--content-item">` directly instead of using `<dds-content-item>`
    // because `<dds-content-block-simple>` uses only the copy content
    return html`
      <div class="${prefix}--content-block__children">
        <div class="${prefix}--content-block-simple__content">
          <div class="${prefix}--content-item">
            <slot></slot>
          </div>
          <div>
            <slot name="media"></slot>
          </div>
        </div>
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  protected _renderCopy() {
    return '';
  }

  static styles = styles;
}

export default DDSCalloutWithMedia;
