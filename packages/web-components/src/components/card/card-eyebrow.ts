/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './card.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Eyebrow in card.
 *
 * @element dds-card-eyebrow
 */
@customElement(`${ddsPrefix}-card-eyebrow`)
class DDSCardEyebrow extends LitElement {
  @property({ reflect: true })
  slot = 'eyebrow';

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default DDSCardEyebrow;
