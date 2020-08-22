/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const browser = process.env.DDS_UI_INTEGRATION_TEST_BROWSER;
const device = process.env.DDS_UI_INTEGRATION_TEST_DEVICE;

const config = {
  launchOptions: {
    headless: process.env.CI !== 'false',
  },
};

if (browser) {
  config.browsers = [browser];
}

if (device) {
  config.devices = [device];
}

module.exports = config;
