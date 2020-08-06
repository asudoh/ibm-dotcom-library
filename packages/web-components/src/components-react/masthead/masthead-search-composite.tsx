/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect, FunctionComponent } from 'react';
import { useThrottleCallback } from '@react-hook/throttle';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSMastheadSearch from './masthead-search';
// @ts-ignore
import DDSMastheadSearchItem from './masthead-search-item';

export interface DDSMastheadSearchCompositeProps {
  /**
   * `true` to activate the search box.
   */
  active?: boolean;

  /**
   * The search results to show in the UI.
   */
  currentSearchResults?: string[];

  /**
   * The throttle timeout to run query upon user input.
   */
  inputTimeout?: number;

  /**
   * The language used for query.
   */
  language?: string;

  /**
   * `true` to open the search dropdown.
   */
  open?: boolean;

  /**
   * Value to display when the input has an empty `value`.
   */
  placeholder?: string;

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults?: (searchQueryString: string) => Promise<string[]>;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;
}

/**
 * Component that rendres masthead search from search results, etc. data.
 */
const DDSMastheadSearchComposite: FunctionComponent<DDSMastheadSearchCompositeProps> = ({
  active,
  currentSearchResults,
  inputTimeout,
  language,
  open,
  placeholder,
  _loadSearchResults: loadSearchResults,
  _setLanguage: setLanguage,
}) => {
  const handleInput = useThrottleCallback((event: CustomEvent) => {
    // The error is logged in the Redux store
    loadSearchResults?.((event.target as DDSMastheadSearch).searchQueryString).catch(() => {});
  }, 1000 / inputTimeout!);

  useEffect(() => {
    if (language) {
      setLanguage?.(language);
    }
  }, [language, setLanguage]);

  return (
    <DDSMastheadSearch active={active} open={open} placeholder={placeholder} onInput={handleInput}>
      {currentSearchResults?.map(item => (
        <DDSMastheadSearchItem text={item} />
      ))}
    </DDSMastheadSearch>
  );
};

DDSMastheadSearchComposite.propTypes = {
  /**
   * `true` to activate the search box.
   */
  active: PropTypes.bool,

  /**
   * The search results to show in the UI.
   */
  currentSearchResults: PropTypes.arrayOf(PropTypes.string.isRequired),

  /**
   * The throttle timeout to run query upon user input.
   */
  inputTimeout: PropTypes.number,

  /**
   * The language used for query.
   */
  language: PropTypes.string,

  /**
   * `true` to open the search dropdown.
   */
  open: PropTypes.bool,

  /**
   * Value to display when the input has an empty `value`.
   */
  placeholder: PropTypes.string,

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults: PropTypes.func,

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage: PropTypes.func,
};

DDSMastheadSearchComposite.defaultProps = {
  inputTimeout: 200,
};

export default DDSMastheadSearchComposite;
