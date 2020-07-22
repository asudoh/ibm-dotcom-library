/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { ServicesState } from './types';
import { RawAction } from './actions/raw';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const store = createStore<ServicesState, RawAction<ServicesState>, unknown, unknown>(
  (state?: ServicesState, { type }: RawAction<ServicesState> = {} as RawAction<ServicesState>) =>
    typeof type !== 'function' ? state : (type as any)(state),
  {},
  applyMiddleware(...middlewares)
);

export default store;
