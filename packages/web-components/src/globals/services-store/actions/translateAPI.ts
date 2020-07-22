/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import TranslateAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import { loadLanguage } from './localeAPI';
import { Translation, TranslateAPIState } from '../types/translateAPI';
import rawAction, { RawAction } from './raw';

/**
 * @param language A language.
 * @param translation The translation data from the REST call.
 * @returns A Redux action to set the given translation data.
 * @private
 */
export function setTranslation(language: string, translation: Translation): RawAction<TranslateAPIState> {
  return rawAction<TranslateAPIState>((state?: TranslateAPIState) => ({
    ...(state || {}),
    // If application sets language data without making a REST call, mark the request as resolved already
    requestsTranslationInProgress: {
      ...(state?.requestsTranslationInProgress || {}),
      [language]: false,
    },
    requestsTranslation: {
      ...(state?.requestsTranslation || {}),
      [language]: Promise.resolve(translation),
    },
    translations: {
      ...(state?.translations || {}),
      [language]: translation,
    },
  }));
}

/**
 * @returns A Redux action that sends a REST call for translation data.
 */
export function loadTranslation(): ThunkAction<Promise<Translation>, TranslateAPIState, void, RawAction<TranslateAPIState>> {
  return async (dispatch, getState) => {
    // TODO: Can we go without casts without making `LocaleAPI` types a hard-dependency?
    const language: string = await dispatch(loadLanguage() as any);
    const { requestsTranslation = {} } = getState() ?? {};
    const { [language]: requestTranslation } = requestsTranslation;
    if (requestTranslation) {
      return requestTranslation;
    }
    const [primary, country] = language.split('-');
    const promiseTranslation: Promise<Translation> = TranslateAPI.getTranslation({
      cc: country.toLowerCase(),
      lc: primary.toLowerCase(),
    });
    dispatch(
      rawAction<TranslateAPIState>((state?: TranslateAPIState) => ({
        ...(state || {}),
        requestsTranslationInProgress: {
          ...(state?.requestsTranslationInProgress || {}),
          [language]: true,
        },
        requestsTranslation: {
          ...(state?.requestsTranslation || {}),
          [language]: promiseTranslation,
        },
      }))
    );
    try {
      dispatch(setTranslation(language, await promiseTranslation));
    } catch (error) {
      dispatch(
        rawAction<TranslateAPIState>((state?: TranslateAPIState) => ({
          ...(state || {}),
          requestsTranslationInProgress: {
            ...(state?.requestsTranslationInProgress || {}),
            [language]: false,
          },
          errorsRequestTranslation: {
            ...(state?.errorsRequestTranslation || {}),
            [language]: error,
          },
        }))
      );
    }
    return promiseTranslation;
  };
}
