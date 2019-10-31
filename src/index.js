const pp = require('preprocess');

/**
 * Flatten a nested object into a flat { "KEY_NESTEDKEY": value } structure
 * @param {object} obj - The object to flatten
 * @param {string} [prefix=''] - Parent key to add as a prefix
 */
function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, prop) => {
    const pre = prefix.length ? prefix + '_' : prefix;
    if (typeof obj[prop] === 'object') {
      Object.assign(acc, flatten(obj[prop], pre + prop.toUpperCase()));
    }
    else {
      acc[pre + prop.toUpperCase()] = obj[prop];
    }

    return acc;
  }, {});
}

module.exports = function kontra(context = {}) {
  return {
    name: 'kontra',
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach(name => {
        let output = pp.preprocess(bundle[name].code, flatten(context), {type: 'js'});
        bundle[name].code = output;
      });
    }
  };
}

module.exports.flatten = flatten;