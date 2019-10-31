import pp from 'preprocess';

export default function kontra(defs) {
  // ensure defs are uppercase
  Object.keys(defs).forEach(def => {
    defs[def.toUpperCase()] = defs[def]
  });

  return {
    name: 'kontra',
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach(name => {
        let output = pp.preprocess(bundle[name].code, defs, {type: 'js'});
        bundle[name].code = output;
      });
    }
  };
}