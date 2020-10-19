/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../my-awesome-component';

export const Default = () => {
  return html`
    <dds-my-awesome-component>My awesome component</dds-my-awesome-component>
  `;
};

export default {
  title: 'Components/My awesome component',
};
