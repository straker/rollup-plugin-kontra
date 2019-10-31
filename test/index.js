const expect = require('chai').expect;
const proxyquire =  require('proxyquire');

let ppText =[]
let ppContext, ppOptions;
const kontra = proxyquire('../src', {
  'preprocess': {
    preprocess(text, context, options) {
      ppText.push(text);
      ppContext = context;
      ppOptions = options;

      return 'Preprocess text';
    }
  }
});
const { flatten } = kontra;

describe('rollup-plugin-kontra', () => {
  describe('flatten', () => {
    it('should uppercase each key of a flat structure', () => {
      const obj = {
        for: 'bar',
        thing1: 'thing2',
        truthy: true
      };

      expect(flatten(obj)).to.deep.equal({FOR: 'bar', THING1: 'thing2', TRUTHY: true});
    });

    it('should flatten and uppercase each key of a nested structure', () => {
      const obj = {
        for: 'bar',
        thing1: 'thing2',
        truthy: true,
        sprite: {
          velocity: true,
          nested: {
            finalKey: true
          }
        }
      };

      expect(flatten(obj)).to.deep.equal({FOR: 'bar', THING1: 'thing2', TRUTHY: true, 'SPRITE_VELOCITY': true, 'SPRITE_NESTED_FINALKEY': true});
    });
  });

  describe('plugin', () => {
    beforeEach(() => {
      ppText = [];
    });

    it('should call preprocess for each bundle', () => {
      kontra().generateBundle(null, {
        bundle1: {
         code: 'my code'
        },
        bundle2: {
          code: 'another code'
        }
      });

      expect(ppText[0]).to.equal('my code');
      expect(ppText[1]).to.equal('another code');
    });

    it('should pass the flatten context', () => {
      const context = {
        sprite: {
          velocity: true
        }
      };

      kontra(context).generateBundle(null, {
        bundle1: {
         code: 'my code'
        },
        bundle2: {
          code: 'another code'
        }
      });

      expect(ppContext).to.deep.equal(flatten(context));
    });

    it('should set type as js', () => {
      kontra().generateBundle(null, {
        bundle1: {
         code: 'my code'
        },
        bundle2: {
          code: 'another code'
        }
      });

      expect(ppOptions).to.deep.equal({type: 'js'});
    });

    it('should set the bundle code to the output of preprocess', () => {
      const bundles = {
        bundle1: {
         code: 'my code'
        },
        bundle2: {
          code: 'another code'
        }
      };

      kontra().generateBundle(null, bundles);
      expect(bundles).to.deep.equal({
        bundle1: {
          code: 'Preprocess text'
        },
        bundle2: {
          code: 'Preprocess text'
        }
      });
    });
  });
});