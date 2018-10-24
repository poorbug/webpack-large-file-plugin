const fs = require('fs');
const path = require('path');

class WebpackLargeFilePlugin {
    constructor(options) {
        this.options = options;
        if (!options.maxSize) {
            this.options.maxSize = 1024 * 1024;
        }
    }
    apply(compiler) {
        const afterEmit = (compilation, cb) => {
            const assets = Object.keys(compilation.assets);
            const overSize = [];
            assets.forEach(e => {
                const size = compilation.assets[e].size();
                if (size > this.options.maxSize) {
                    overSize.push({
                        name: e,
                        size: size
                    });
                }
            })

            if (overSize.length) {
                console.log();
                console.log('\x1b[31m%s\x1b[0m', '=================================');
                console.log(`以下文件大小超过警戒线(${(this.options.maxSize / 1024).toFixed(2)} KB)：`);
                console.log();
                overSize.forEach(e => console.log(`${e.name}                ${(e.size / 1024).toFixed(2)} KB`));
                console.log('\x1b[31m%s\x1b[0m', '=================================');
                console.log();
            }
            cb();
        };

        const plugin = { name: 'WebpackLargeFilePlugin' };

        compiler.hooks.afterEmit.tapAsync(plugin, afterEmit);
    }
}

module.exports = WebpackLargeFilePlugin;
