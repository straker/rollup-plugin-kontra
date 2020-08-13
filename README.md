# Rollup plugin kontra

## Installation

```bash
npm install --save-dev rollup-plugin-kontra 
```

## Usage

```js
// rollup.config.js
import kontra from 'rollup-plugin-kontra'

export default {
  entry: 'entry.js',
  dest: 'bundle.js',
  plugins: [
    kontra({
      gameObject: {
        // enable only velocity and rotation functionality
        velocity: true,
        rotation: true
      },
      vector: {
        // enable vector length functionality
        length: true
      },
      // turn on debugging
      debug: true
    })
  ]
}
```

## Options

See [Kontra.js docs](https://straker.github.io/kontra/custom-builds#rollup-plugin-kontra) for a list of available options. All options default to `false`.
