/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The translation data for locale modal.
 */
export interface LocaleModalI18N {
  availabilityText: string;
  headerTitle: string;
  modalClose: string;
  searchClearText: string;
  searchLabel: string;
  searchPlaceholder: string;
  unavailabilityText: string;
}

/**
 * The locale item data in locale modal, which is a tuple of the locale and the language.
 */
export type LocaleModalLocale = [string, string];

/**
 * The country item data in locale modal.
 */
export interface Country {
  /**
   * The country name.
   */
  name: string;

  /**
   * The list of locale items.
   */
  locale: LocaleModalLocale[];
}

/**
 * The region item data in locale modal.
 */
export interface Region {
  /**
   * The abbreviated region name.
   */
  key: string;

  /**
   * The region name.
   */
  name: string;

  /**
   * The list of country items.
   */
  countryList: Country[];
}

/**
 * The data available from `LocaleAPI.getList()`.
 */
export interface LocaleList {
  /**
   * The translation data for locale modal.
   */
  localeModal: LocaleModalI18N;

  /**
   * The list of region items.
   */
  regionList: Region[];
}

/**
 * A Redux substate for `LocaleAPI`.
 */
export interface LocaleAPIState {
  /**
   * The language data.
   */
  language?: string;

  /**
   * The request for the language data.
   */
  requestLanguage?: Promise<string>;

  /**
   * `true` if the request for the language data is in progress.
   */
  requestLanguageInProgress?: boolean;

  /**
   * The error from the request for the language data.
   */
  errorRequestLanguage?: Error;

  /**
   * The display language data.
   */
  langDisplay?: string;

  /**
   * The request for the display language data.
   */
  requestLangDisplay?: Promise<string>;

  /**
   * `true` if the request for the display language data is in progress.
   */
  requestLangDisplayInProgress?: boolean;

  /**
   * The error from the request for the display language data.
   */
  errorRequestLangDisplay?: Error;

  /**
   * The locale list data, keyed by the language.
   */
  localeLists?: { [language: string]: LocaleList };

  /**
   * The requests for the locale list data, keyed by the language.
   */
  requestsLocaleList?: { [language: string]: Promise<LocaleList> };

  /**
   * The status of whether requests for the locale list data are in progress, keyed by the language.
   */
  requestsLocaleListInProgress?: { [language: string]: boolean };

  /**
   * The errors from the requests for the locale list data, keyed by the language.
   */
  errorsRequestLocaleList?: { [language: string]: Error };
}
