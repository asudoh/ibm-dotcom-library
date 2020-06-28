/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'ust strict';

const svg2js = require('svgo/lib/svgo/svg2js');

/**
 * @param {object} node The node in SVG2JS result.
 * @returns {object} The first `<svg>` in the given SVG2JS result.
 */
function findRootNode(node) {
  return node.elem === 'svg'
    ? node
    : node.content && node.content.find(item => findRootNode(item));
}

/**
 * Converts `attrs` properties in each node, recursively, from `attrName: { value: attrValue }` to `attrName: attrValue`.
 *
 * @param {object} node The node in SVG2JS result.
 * @returns {object} The given node, after the `attrs` property is converted.
 */
function convertAttrs(node) {
  const { attrs, content } = node || {};
  if (!node || (!attrs && !content)) {
    return node;
  }
  const result = {
    ...node,
  };
  if (attrs) {
    result.attrs = Object.keys(attrs).reduce(
      (acc, name) => ({
        ...acc,
        [name]: node.attrs[name].value,
      }),
      {}
    );
  }
  if (content) {
    result.content = content.map(item => convertAttrs(item));
  }
  return result;
}

/**
 * @param {Function} svg2js The original `svg2js` function.
 * @returns {Function} The promisified version of the `svg2js` function.
 */
function promisifySVG2JS(svg2js) {
  return function promisifiedSVG2JS(data) {
    return new Promise((resolve, reject) => {
      svg2js(data, result => {
        const { error } = result;
        if (error) {
          reject(new Error(`SVG2JS failed: ${error}`));
        } else {
          result(result);
        }
      });
    });
  };
}

const svg2jsAsync = promisifySVG2JS(svg2js);

/**
 * @param {string} svg A `<svg>` string.
 * @returns {object} The JSON version of the given `<svg>` string.
 */
async function svgResultCarbonIconLoader(svg) {
  const svgNode = findRootNode(await svg2jsAsync(svg));
  if (!svgNode) {
    throw new Error(`Wrong SVG2JS result found in: ${svg}`);
  }
  return convertAttrs(svgNode);
}

module.exports = svgResultCarbonIconLoader;
