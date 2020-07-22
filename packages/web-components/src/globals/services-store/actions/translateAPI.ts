/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TranslateAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import { Translation } from '../types/translateAPI';

function translateAPIActions({ setState }) {
  return {
    setTranslation(state, translation, language) {
      return {
        // If application sets language data without making a REST call, mark the request as resolved already
        requestsTranslationInProgress: {
          ...(state.requestsTranslationInProgress || {}),
          [language]: false,
        },
        requestsTranslation: {
          ...(state.requestsTranslation || {}),
          [language]: Promise.resolve(translation),
        },
        translations: {
          ...(state.translations || {}),
          [language]: translation,
        },
      };
    },

    async loadTranslation({
      requestsTranslationInProgress = {},
      requestsTranslation = {},
      errorsRequestTranslation = {},
      translations = {},
    }) {
      const language = 'en-US';
      const { [language]: requestTranslation } = requestsTranslation as { [language: string]: Translation };
      if (requestTranslation) {
        return requestTranslation;
      }
      const [primary, country] = language.split('-');
      const promiseTranslation: Promise<Translation> = TranslateAPI.getTranslation({
        cc: country.toLowerCase(),
        lc: primary.toLowerCase(),
      });
      setState({
        requestsTranslationInProgress: {
          ...requestsTranslationInProgress,
          [language]: true,
        },
        requestsTranslation: {
          ...requestsTranslation,
          [language]: requestTranslation,
        },
      });
      try {
        const translation = await promiseTranslation;
        setState({
          // If application sets language data without making a REST call, mark the request as resolved already
          requestsTranslationInProgress: {
            ...requestsTranslationInProgress,
            [language]: false,
          },
          requestsTranslation: {
            ...requestsTranslation,
            [language]: Promise.resolve(translation),
          },
          translations: {
            ...translations,
            [language]: translation,
          },
        });
      } catch (error) {
        setState({
          requestsTranslationInProgress: {
            ...requestsTranslationInProgress,
            [language]: false,
          },
          errorsRequestTranslation: {
            ...errorsRequestTranslation,
            [language]: error,
          },
        });
      }
      return promiseTranslation;
    },
  };
}

export default translateAPIActions;
