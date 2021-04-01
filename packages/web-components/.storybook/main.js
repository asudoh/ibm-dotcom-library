/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const rtlcss = require('rtlcss');
const deepReplace = require('../../../tasks/deep-replace');

const { getPaths } = deepReplace;
const arrayify = value => (Array.isArray(value) ? value : value != null ? [value] : []); // eslint-disable-line no-nested-ternary
const testMatches = (test, s) => arrayify(test).some(item => item.test && item.test(s));

const useStyleSourceMap = process.env.STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_STYLE_SOURCEMAP === 'true';
const useRtl = process.env.STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_RTL === 'true';

module.exports = {
  stories: ['./bootstrap-story.ts', '../docs/**/*.stories.mdx', '../src/**/*.stories.{js,ts}'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@carbon/storybook-addon-theme',
    path.resolve(__dirname, 'addon-knobs-args'),
  ],
  managerWebpack(config) {
    // `@storybook/react` NPM installation seems to add `@babel/preset-react` automatically
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        IBMDOTCOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES: 'false',
      })
    );
    return config;
  },
  webpackFinal(config, mode) {
    config.devtool = useStyleSourceMap ? 'source-map' : '';

    // Prevents `file-loader` is used for `.svg` so we can use `svg-result-ibmdotcom-icon-loader`
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key) => key === 'test' && testMatches(value, 'styles/icons/svg/play-video.svg'),
      () => /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    );
    // Uses `@babel/plugin-proposal-decorators` configuration in our `.babelrc`
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.plugins' &&
        Array.isArray(value) &&
        /@babel\/plugin-proposal-decorators/i.test(value[0]),
      () => deepReplace.DELETE
    );
    // Normalizes several plugins with `loose: false` option
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.plugins' && Array.isArray(value) && value[1] && value[1].loose,
      value => [
        value[0],
        {
          ...value[1],
          loose: false,
        },
      ]
    );

    config.module.rules.push(
      {
        test: /[\\/]styles[\\/]icons[\\/]/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
                  },
                ],
              ],
            },
          },
          require.resolve('../tools/svg-result-ibmdotcom-icon-loader'),
        ],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          require.resolve('../tools/css-result-loader'),
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('../tools/postcss-fix-host-pseudo')(),
                require('autoprefixer')({
                  overrideBrowsersList: ['last 1 version', 'ie >= 11'],
                }),
                ...(useRtl ? [rtlcss] : []),
              ],
              sourceMap: useStyleSourceMap,
            },
          },
          {
            loader: 'fast-sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '..', 'node_modules'), path.resolve(__dirname, '../../..', 'node_modules')],
              data: `
                $feature-flags: (
                  enable-css-custom-properties: true,
                  grid-columns-16: true,
                );
              `,
              sourceMap: useStyleSourceMap,
            },
          },
        ],
      }
    );

    config.plugins.push(
      new webpack.EnvironmentPlugin({
        TRANSLATION_HOST: '',
      })
    );

    config.resolve.extensions.push('.ts', '.tsx', '.d.ts');

    return config;
  },
};
