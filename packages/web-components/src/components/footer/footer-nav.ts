/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './footer.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Footer nav.
 *
 * @element dds-footer-nav
 */
@customElement(`${ddsPrefix}-footer-nav`)
class DDSFooterNav extends StableSelectorMixin(LitElement) {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <ul class="${prefix}--accordion ${prefix}--footer-nav__container">
        <slot></slot>
      </ul>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--footer-nav`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSFooterNav;
