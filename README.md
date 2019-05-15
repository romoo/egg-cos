# egg-cos

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@shuang6/egg-cos.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@shuang6/egg-cos
[codecov-image]: https://img.shields.io/codecov/c/github/shuang6/egg-cos.svg?style=flat-square
[codecov-url]: https://codecov.io/github/shuang6/egg-cos?branch=master
[david-image]: https://img.shields.io/david/shuang6/egg-cos.svg?style=flat-square
[david-url]: https://david-dm.org/shuang6/egg-cos
[snyk-image]: https://snyk.io/test/npm/@shuang6/egg-cos/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@shuang6/egg-cos
[download-image]: https://img.shields.io/npm/dm/@shuang6/egg-cos.svg?style=flat-square
[download-url]: https://npmjs.org/package/@shuang6/egg-cos

<!--
Description here.
-->

## Install

```bash
$ npm i @shuang6/egg-cos --save
```

## Configuration

```js
// {app_root}/config/plugin.js
exports.cos = {
  enable: true,
  package: '@shuang6/egg-cos'
};
```

```js
// {app_root}/config/config.default.js
exports.cos = {
  client: {
    SecretId: '',
    SecretKey: '',
    Bucket: '',
    Region: ''
  }
};
```

Init in egg agent, default is `false`:

```js
exports.cos = {
  useAgent: true
};
```

## Usage

You can aquire tencent cloud cos instance on `app` or `ctx`.

```js
const path = require('path');
const Controller = require('egg').Controller;

// upload a file in controller
module.exports = class extends Controller {
  async upload() {
    const ctx = this.ctx;
    // please enable `file` mode of `egg-multipart`.
    const file = ctx.request.files[0];
    const name = 'egg-cos/' + path.basename(file.filename);
    let result;
    try {
      result = await ctx.cos.put(name, file.filepath);
    } finally {
      // need to remove the tmp files
      await ctx.cleanupRequestFiles();
    }

    if (result) {
      ctx.logger.info('cos response:\n', result);
      ctx.body = {
        url: `https://${result.Location}`
      };
    } else {
      ctx.body = 'please select a file to upload！';
    }
  }
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/shuang6/egg-cos/issues).

## License

[MIT](LICENSE)
