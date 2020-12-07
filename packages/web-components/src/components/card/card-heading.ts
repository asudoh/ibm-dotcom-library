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
 * Heading in card.
 *
 * @element dds-card-heading
 */
@customElement(`${ddsPrefix}-card-heading`)
class DDSCardHeading extends LitElement {
  @property({ reflect: true })
  slot = 'heading';

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default DDSCardHeading;
