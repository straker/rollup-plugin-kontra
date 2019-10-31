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
    kontra()
  ]
}
```

## Options

See [Kontra.js docs]() for a list of available options. All options default to `false`.