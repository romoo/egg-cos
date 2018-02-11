# egg-cos

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-cos.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-cos
[travis-image]: https://img.shields.io/travis/romoo/egg-cos.svg?style=flat-square
[travis-url]: https://travis-ci.org/romoo/egg-cos
[codecov-image]: https://img.shields.io/codecov/c/github/romoo/egg-cos.svg?style=flat-square
[codecov-url]: https://codecov.io/github/romoo/egg-cos?branch=master
[david-image]: https://img.shields.io/david/romoo/egg-cos.svg?style=flat-square
[david-url]: https://david-dm.org/romoo/egg-cos
[snyk-image]: https://snyk.io/test/npm/egg-cos/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-cos
[download-image]: https://img.shields.io/npm/dm/egg-cos.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-cos

<!--
Description here.
-->

## Install

```bash
$ npm i egg-cos --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.cos = {
  enable: true,
  package: 'egg-cos',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.cos = {
  client: {
    secretId: '',
    secretKey: '',
    bucket: '',
    region: '',
  }
};
```

Init in egg agent, default is `false`:

```js
exports.cos = {
  useAgent: true,
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/romoo/egg-cos/issues).

## License

[MIT](LICENSE)
