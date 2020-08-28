/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Video data from `VideoPlayerAPI.api()`.
 */
interface VideoData {
  /**
   * The video description.
   */
  description: string;

  /**
   * The video duration.
   */
  duration: string;

  /**
   * The video name.
   */
  name: string;
}

// Seems that ESLint has a problem is using `interface` as a default export
// eslint-disable-next-line no-undef
export default VideoData;
