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
import { SearchAPIActions } from '../../internal/vendor/@carbon/ibmdotcom-services-store/actions/searchAPI.d';
import ConnectMixin from '../../globals/mixins/connect';
import {
  mapStateToProps,
  mapDispatchToProps,
  MastheadSearchContainerState,
  MastheadSearchContainerStateProps,
  MastheadSearchContainerActions,
} from './masthead-search-connect';
import DDSMastheadSearchComposite from './masthead-search-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Container component for masthead search.
 *
 * @element dds-masthead-search-container
 */
@customElement(`${ddsPrefix}-masthead-search-container`)
class DDSMastheadSearchContainer extends ConnectMixin<
  MastheadSearchContainerState,
  SearchAPIActions,
  MastheadSearchContainerStateProps,
  ActionCreatorsMapObject<MastheadSearchContainerActions>
>(
  store as Store<MastheadSearchContainerState, SearchAPIActions>,
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadSearchComposite) {}

export default DDSMastheadSearchContainer;
