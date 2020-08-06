/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const sass = require('node-sass');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // `autoprefixer` is a requirement for Carbon core Sass code
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                includePaths: ['node_modules'],
                // `enable-css-custom-properties` and `grid-columns-16` feature flags
                // are requirements for Carbon for IBM.com styles
                data: `
                  $feature-flags: (
                    enable-css-custom-properties: true,
                    grid-columns-16: true,
                  );
                `,
              },
            },
          },
        ],
      },
    ],
  },
};
