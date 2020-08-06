/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import {
  mapStateToProps,
  mapDispatchToProps,
  MastheadSearchContainerState,
  MastheadSearchContainerStateProps,
  // @ts-ignore
} from './masthead-search-connect';
import DDSMastheadSearchComposite, { DDSMastheadSearchCompositeProps } from './masthead-search-composite';

export { default as store, createStore } from '../../internal/vendor/@carbon/ibmdotcom-services-store/store';

// TODO: Type dispatch props
export default connect<MastheadSearchContainerStateProps, {}, DDSMastheadSearchCompositeProps, MastheadSearchContainerState>(
  mapStateToProps,
  mapDispatchToProps
)(DDSMastheadSearchComposite);
