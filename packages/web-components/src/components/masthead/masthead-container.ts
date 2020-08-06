/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ActionCreatorsMapObject, Store } from 'redux';
import { customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import store from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';
import { LocaleAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/localeAPI.d';
import { TranslateAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/translateAPI.d';
import { ProfileAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/profileAPI.d';
import { SearchAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
import ConnectMixin from '../../globals/mixins/connect';
import {
  mapStateToProps,
  mapDispatchToProps,
  MastheadContainerState,
  MastheadContainerStateProps,
  MastheadContainerActions,
} from './masthead-connect';
import DDSMastheadComposite from './masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for masthead.
 *
 * @element dds-masthead-container
 */
@customElement(`${ddsPrefix}-masthead-container`)
class DDSMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadContainerActions>
>(
  store as Store<MastheadContainerState, LocaleAPIActions | TranslateAPIActions | ProfileAPIActions | SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadComposite) {}

export default DDSMastheadContainer;
