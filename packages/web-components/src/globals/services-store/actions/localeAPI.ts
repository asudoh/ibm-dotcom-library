/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ThunkAction } from 'redux-thunk';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import { LocaleList, LocaleAPIState } from '../types/localeAPI';
import rawAction, { RawAction } from './raw';

/**
 * @param language The language data from the REST call.
 * @returns A Redux action to set the given language data.
 * @private
 */
export function setLanguage(language: string): RawAction<LocaleAPIState> {
  return rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
    ...(state || {}),
    // If application sets language data without making a REST call, mark the request as resolved already
    requestLanguage: Promise.resolve(language),
    requestLanguageInProgress: false,
    language,
  }));
}

/**
 * @param langDisplay The display language data from the REST call.
 * @returns A Redux action to set the given display language data.
 * @private
 */
export function setLangDisplay(langDisplay: string): RawAction<LocaleAPIState> {
  return rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
    ...state,
    // If application sets display language without making a REST call, mark the request as resolved already
    requestLangDisplay: Promise.resolve(langDisplay),
    requestLangDisplayInProgress: false,
    langDisplay,
  }));
}

/**
 * @param language A language.
 * @param localeList The locale list data from the REST call.
 * @returns A Redux action to set the given locale list data.
 * @private
 */
export function setLocaleList(language: string, localeList: LocaleList): RawAction<LocaleAPIState> {
  return rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
    ...(state || {}),
    // If application sets language data without making a REST call, mark the request as resolved already
    requestsLocaleListInProgress: {
      ...(state?.requestsLocaleListInProgress || {}),
      [language]: false,
    },
    requestsLocaleList: {
      ...(state?.requestsLocaleList || {}),
      [language]: Promise.resolve(localeList),
    },
    localeLists: {
      ...(state?.localeLists || {}),
      [language]: localeList,
    },
  }));
}

/**
 * @returns A Redux action that sends a REST call for language data.
 */
export function loadLanguage(): ThunkAction<Promise<string>, LocaleAPIState, void, RawAction<LocaleAPIState>> {
  return async (dispatch, getState) => {
    const { requestLanguage } = getState() ?? {};
    if (requestLanguage) {
      return requestLanguage;
    }
    const promiseLanguage: Promise<string> = LocaleAPI.getLang().then(({ cc: country, lc: primary }) => `${primary}-${country}`);
    dispatch(
      rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
        ...(state || {}),
        requestLanguageInProgress: true,
        requestLanguage: promiseLanguage,
      }))
    );
    try {
      const language = await promiseLanguage;
      dispatch(setLanguage(language));
    } catch (error) {
      dispatch(
        rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
          ...(state || {}),
          requestLanguageInProgress: false,
          errorRequestLanguage: error,
        }))
      );
      throw error;
    }
    return promiseLanguage;
  };
}

/**
 * @returns A Redux action that sends a REST call for display language data.
 */
export function loadLangDisplay(): ThunkAction<Promise<string>, LocaleAPIState, void, RawAction<LocaleAPIState>> {
  return async (dispatch, getState) => {
    const { requestLangDisplay } = getState() ?? {};
    if (requestLangDisplay) {
      return requestLangDisplay;
    }
    const promiseLangDisplay: Promise<string> = LocaleAPI.getLang();
    dispatch(
      rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
        ...(state || {}),
        requestLangDisplayInProgress: true,
        requestLangDisplay: promiseLangDisplay,
      }))
    );
    try {
      dispatch(setLangDisplay(await promiseLangDisplay));
    } catch (error) {
      dispatch(
        rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
          ...(state || {}),
          requestLangDisplayInProgress: false,
          errorRequestLangDisplay: error,
        }))
      );
      throw error;
    }
    return promiseLangDisplay;
  };
}

/**
 * @returns A Redux action that sends a REST call for locale list data.
 */
export function loadLocaleList(): ThunkAction<Promise<LocaleList>, LocaleAPIState, void, RawAction<LocaleAPIState>> {
  return async (dispatch, getState) => {
    // TODO: Can we go without casts without making `LocaleAPI` types a hard-dependency?
    const language: string = await dispatch(loadLanguage() as any);
    const { requestsLocaleList = {} } = getState() ?? {};
    const { [language]: requestLocaleList } = requestsLocaleList;
    if (requestLocaleList) {
      return requestLocaleList;
    }
    const [primary, country] = language.split('-');
    const promiseLocaleList: Promise<LocaleList> = LocaleAPI.getList({
      cc: country.toLowerCase(),
      lc: primary.toLowerCase(),
    });
    dispatch(
      rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
        ...(state || {}),
        requestsLocaleListInProgress: {
          ...(state?.requestsLocaleListInProgress || {}),
          [language]: true,
        },
        requestsLocaleList: {
          ...(state?.requestsLocaleList || {}),
          [language]: promiseLocaleList,
        },
      }))
    );
    try {
      dispatch(setLocaleList(language, await promiseLocaleList));
    } catch (error) {
      dispatch(
        rawAction<LocaleAPIState>((state?: LocaleAPIState) => ({
          ...(state || {}),
          requestsLocaleListInProgress: {
            ...(state?.requestsLocaleListInProgress || {}),
            [language]: false,
          },
          errorsRequestLocaleList: {
            ...(state?.errorsRequestLocaleList || {}),
            [language]: error,
          },
        }))
      );
    }
    return promiseLocaleList;
  };
}
