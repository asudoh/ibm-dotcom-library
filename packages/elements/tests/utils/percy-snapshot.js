/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PercyAgent from '@percy/agent';

const currentSpec = [];
let currentSeq;

jasmine.getEnv().addReporter({
  suiteStarted({ description }) {
    currentSpec.push(description);
  },
  specStarted({ description }) {
    currentSpec.push(description);
    currentSeq = 0;
  },
  specDone() {
    currentSeq = undefined;
    currentSpec.pop();
  },
  suiteDone() {
    currentSpec.pop();
  },
});

beforeEach(function() {
  jasmine.addMatchers({
    toSendPercySnapshot() {
      return {
        /**
         * A Jasmine test matcher to send Percy snapshot of the page.
         *
         * @param {object} [options] The options for the Percy agent.
         * @returns {object} The test result.
         */
        compare(options) {
          const percyAgent = new PercyAgent();
          try {
            percyAgent.snapshot(`${currentSpec.join('|')} - ${currentSeq++}`, options);
            return {
              pass: true,
            };
          } catch (error) {
            const { message } = error;
            return {
              pass: false,
              message,
            };
          }
        },
      };
    },
  });
});
