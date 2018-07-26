# clipbrd

[![NPM Package](https://img.shields.io/npm/v/clipbrd.svg?style=flat-square)](https://www.npmjs.org/package/clipbrd)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/shrpne/clipbrd/blob/master/LICENSE)

Lightweight module to copy text to the clipboard in modern browsers


## Install

```
npm install clipbrd
```


## Usage

```js
import * as clipboard from 'clipbrd';

if (clipboard.isSupported()) {
    button.addEventListener('click', () => {
        clipboard.copy('Custom text');
    });
}
```


## API

### copy(text)

Copy `text` to the clipboard.

Returns a `boolean` of whether it succeeded.

Must be called in response to a user gesture event, like `click` or `keyup`.

### isSupported()

Check if copy is supported, that way you can hide copy buttons from the UI.

Returns a `boolean`


## Reference

- [hackernoon.com/copying-text-to-clipboard-with-javascript](https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f) - Original Hackernoon article
- [copy-text-to-clipboard](https://github.com/sindresorhus/copy-text-to-clipboard) - Pulled fixes from battle tested realization
- [clipboard.js](https://github.com/zenorocha/clipboard.js/) - Pulled support method


## License

MIT License



