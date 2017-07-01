const fs = require('fs-extra');
const stss = require('stss');
const BasePlugin = require('./BasePlugin');

class TransformStssPlugin extends BasePlugin {
  constructor() {
    super();
    this.validExtensions = new Set(['.stss']);
    this.dstExtension = '.tss';
  }

  transformFile(srcPath, dstPath) {
    this.log(`Transforming STSS file ${srcPath} -> ${dstPath}`);
    return new Promise((resolve, reject) => stss.render({
      file: srcPath,
      success: resolve,
      error: reject
    }))
      .then(tss => fs.outputFile(dstPath, tss))
      .then(() => [dstPath]);
  }
}

module.exports = TransformStssPlugin;