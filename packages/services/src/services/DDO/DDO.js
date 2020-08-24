/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import root from 'window-or-global';

/**
 * Returns boolean if the isDataLayerReady flag is true
 *
 * @returns {*} boolean flag if data layer is ready in the digitalData object
 * @private
 */
function _checkFlag() {
  return (
    root.digitalData &&
    root.digitalData.page &&
    root.digitalData.page.isDataLayerReady
  );
}

/**
 * Number of times to retry the datalayer ready loop before failing
 *
 * @type {number}
 * @private
 */
const _timeoutRetries = 50;

let _dataLayerReadyPromise;

/**
 * Timeout loop to check if the digitalData object is ready.
 * This is the only way to achieve this without jQuery, as the event trigger
 * is fired from jQuery's custom event layer as
 * $(document).trigger('datalayer_ready').
 *
 * Application should `window.digitalData` up-front, e.g. in a `<script>` tag in `<head>`, that eliminates the polling.
 *
 * @private
 */
function _datalayerReady() {
  if (!_dataLayerReadyPromise) {
    let _hookedDL;
    let _resolved;

    _dataLayerReadyPromise = new Promise(resolve => {
      function hookDL(dl) {
        if (!_hookedDL) {
          _hookedDL = true;
          const { ddo, fn } = dl;
          if (ddo) {
            if (!_resolved) {
              resolve((_resolved = ddo));
            }
          } else if (fn) {
            const { finalizeDataLayer: origFinalizeDataLayer } = fn;
            fn.finalizeDataLayer = function finalizeDataLayer(...args) {
              origFinalizeDataLayer.call(this, ...args);
              if (!_resolved && dl.ddo) {
                resolve((_resolved = dl.ddo));
              }
            };
          }
        }
      }
      const { dl } = root;
      if (dl) {
        hookDL(dl);
      } else {
        let _dl;
        Object.defineProperty(root, 'dl', {
          get() {
            return _dl;
          },
          set(value) {
            _dl = value;
            if (value) {
              hookDL(value);
            }
          },
          configurable: true,
          enumerable: true,
        });
      }
    });
  }

  return _dataLayerReadyPromise;
}

/**
 * DDO API class with methods of fetching search results for
 * ibm.com
 */
class DDOAPI {
  /**
   * Promise function that determines when the digital data object is ready
   *
   * @returns {Promise} Resolved data layer ready signal
   */
  static isReady() {
    return _datalayerReady();
  }

  /**
   * Gets the full digitalData (DDO) object.
   * Application should `window.digitalData` up-front, e.g. in a `<script>` tag in `<head>`.
   * For quick developerment purpose, what `ibm-common.js` automatically populates can be used.
   *
   * @returns {Promise<*>} Promise object
   */
  static async getAll() {
    return await this.isReady()
      .then(() => {
        return root.digitalData;
      })
      .catch(() => {
        return null;
      });
  }

  /**
   * Sets the version of the library to the DDO.
   * Application should `window.digitalData` up-front, e.g. in a `<script>` tag in `<head>`.
   * For quick developerment purpose, what `ibm-common.js` automatically populates can be used.
   *
   * @returns {Promise<any>} Promise object
   */
  static async setVersion() {
    return await this.isReady().then(() => {
      root.digitalData.page.pageInfo.version = ddsSettings.version;
    });
  }

  /**
   * Gets the locale for the current page based on the language set as metadata.
   * Application should `window.digitalData` up-front, e.g. in a `<script>` tag in `<head>`.
   * For quick developerment purpose, what `ibm-common.js` automatically populates can be used.
   *
   * @returns {Promise<*>} Promise object
   */
  static async getLanguage() {
    return await this.isReady().then(() => {
      return root.digitalData.page.pageInfo.language;
    });
  }
}

export default DDOAPI;
