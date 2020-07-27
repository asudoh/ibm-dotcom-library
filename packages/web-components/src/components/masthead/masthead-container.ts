/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ConnectMixin from '../../globals/mixins/connect';
import store from '../../globals/services-store/store';
import { LocaleAPIState } from '../../globals/services-store/types/localeAPI';
import { MastheadLink, TranslateAPIState } from '../../globals/services-store/types/translateAPI';
import { loadLanguage, setLanguage } from '../../globals/services-store/actions/localeAPI';
import { loadTranslation } from '../../globals/services-store/actions/translateAPI';
import DDSMastheadComposite from './masthead-composite';

export { store };
export { default as reducers } from '../../globals/services-store/reducers';

const { stablePrefix: ddsPrefix } = ddsSettings;

type MastheadActions = ReturnType<typeof loadLanguage> | ReturnType<typeof setLanguage> | ReturnType<typeof loadTranslation>;

/**
 * The Redux state used for `<dds-masthead-container>`.
 */
export interface MastheadContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;

  /**
   * The Redux state for `TranslateAPI`.
   */
  translateAPI?: TranslateAPIState;
}

/**
 * The properties for `<dds-masthead-container>` from Redux state.
 */
interface MastheadContainerStateProps {
  /**
   * The nav links.
   */
  navLinks?: MastheadLink[];
}

/**
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
export function mapStateToProps(state: MastheadContainerState): MastheadContainerStateProps {
  const { localeAPI, translateAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  return {
    navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
 */
export function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators<MastheadActions, ActionCreatorsMapObject<MastheadActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
    },
    dispatch
  );
}

/**
 * Container component for masthead.
 *
 * @element dds-masthead-container
 */
@customElement(`${ddsPrefix}-masthead-container`)
class DDSMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadActions>
>(
  store as Store<MastheadContainerState>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadComposite) {}

export default DDSMastheadContainer;
