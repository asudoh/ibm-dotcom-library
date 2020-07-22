/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';

function localeAPIActions({ getState, setState }) {
  return {
    setLanguage(_, language) {
      return {
        requestLanguage: Promise.resolve(language),
        requestLanguageInProgress: false,
        language,
      };
    },

    async loadLanguage() {
      const { requestLanguage } = getState();
      if (requestLanguage) {
        return requestLanguage;
      }
      const promiseLanguage: Promise<string> = LocaleAPI.getLang().then(
        ({ cc: country, lc: primary }) => `${primary}-${country}`
      );
      setState({
        requestLanguageInProgress: true,
        requestLanguage: promiseLanguage,
      });
      try {
        const language = await promiseLanguage;
        setState({
          requestLanguage: Promise.resolve(language),
          requestLanguageInProgress: false,
          language,
        });
      } catch (error) {
        setState({
          requestLanguageInProgress: false,
          errorRequestLanguage: error,
        });
        throw error;
      }
      return promiseLanguage;
    },

    setLangDisplay(_, langDisplay) {
      return {
        requestLangDisplay: Promise.resolve(langDisplay),
        requestLangDisplayInProgress: false,
        langDisplay,
      };
    },

    async loadLangDisplay({ requestLangDisplay }) {
      if (requestLangDisplay) {
        return requestLangDisplay;
      }
      const promiseLangDisplay: Promise<string> = LocaleAPI.getLangDisplay();
      setState({
        requestLangDisplayInProgress: true,
        requestLangDisplay: promiseLangDisplay,
      });
      try {
        const langDisplay = await promiseLangDisplay;
        setState({
          requestLangDisplay: Promise.resolve(langDisplay),
          requestLangDisplayInProgress: false,
          langDisplay,
        });
      } catch (error) {
        setState({
          requestLangDisplayInProgress: false,
          errorRequestLangDisplay: error,
        });
        throw error;
      }
      return promiseLangDisplay;
    },
  };
}

export default localeAPIActions;
