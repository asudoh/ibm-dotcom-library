/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'ust strict';

const { readFile } = require('fs');
const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const header = require('gulp-header');
const prettier = require('gulp-prettier');
const through2 = require('through2');
const descriptorFromSVG = require('../../tasks/descriptor-from-svg');
const createSVGResultFromCarbonIcon = require('../../tasks/svg-result-icon-descriptor');

const config = require('../config');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

/**
 * The gulp task implementation to generate `lit-html` version of `@carbon/ibmdotcom-styles` icons.
 */
async function icons() {
  const banner = await readFileAsync(
    path.resolve(__dirname, '../../../../tools/license.js'),
    'utf8'
  );
  await promisifyStream(() =>
    gulp
      .src([`${config.iconsFiles}/**/*.js`])
      .pipe(
        through2.obj(async (file, enc, done) => {
          const descriptor = await descriptorFromSVG(String(file.contents));
          file.contents = Buffer.from(`
            import { svg } from 'lit-html';
            import spread from 'carbon-custom-elements/es/globals/directives/spread';
            const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(
              descriptor
            )};
            export default svgResultCarbonIcon;
          `);
          done(null, file);
        })
      )
      .pipe(prettier())
      .pipe(header(banner))
      .pipe(gulp.dest(path.resolve(config.jsDestDir, 'icons')))
  );
}

/**
 * Gulp task export
 *
 * @module icons-lit
 */
module.exports = gulp.task('icons-lit', icons);
