/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StoryContext } from '@storybook/addons';

/**
 * The list of knobs factories set in story parameters.
 */
type KnobParameters = {
  [componentName: string]: ({ groupId }?: { groupId?: string }) => { [propName: string]: any };
};

export const decorators = [
  /**
   * A Storybook decorator that takes list of knobs factories set in story parameters,
   * generates knob values from those, and sets them to story args.
   * @param story The original story factory.
   * @param context The story context.
   */
  function decoratorKnobs(story, { args, parameters: { knobs } }: StoryContext) {
    if (Object(knobs) === knobs) {
      args.parameters = args.parameters ?? {};
      args.parameters.props = args.parameters.props ?? {};
      Object.keys(knobs).forEach(name => {
        const { [name]: knobsForComponent } = knobs as KnobParameters;
        if (typeof knobsForComponent === 'function') {
          // Storybook "args" feature is exactly for `props` here:
          // https://storybook.js.org/docs/react/writing-stories/args
          // However, we are not putting `props` to `args` for now b/c we need to convert all stories to do that
          args.parameters.props[name] = knobsForComponent({ groupId: name });
        }
      });
    }
    return story();
  },
];
