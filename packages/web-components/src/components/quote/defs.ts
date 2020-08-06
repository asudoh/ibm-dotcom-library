/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum QUOTE_TYPES {
  /**
   * Default - doubleCurved
   */
  DEFAULT = 'doubleCurved',

  /**
   * singleCurved
   */
  SINGLE_CURVED = 'singleCurved',

  /**
   * singleAngle
   */
  SINGLE_ANGLE = 'singleAngle',

  /**
   * doubleAngle
   */
  DOUBLE_ANGLE = 'doubleAngle',

  /**
   * lowHighReversedDoubleCurved
   */
  LOW_HIGH_REVERSED_DOUBLE_CURVED = 'lowHighReversedDoubleCurved',

  /**
   * cornerBracket
   */
  CORNER_BRACKET = 'cornerBracket',
}
