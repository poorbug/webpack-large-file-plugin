# webpack-large-file-plugin

打包完后文件大小超过限制大小时发出提示

## 用法
```
    plugins: [
        new WebpackLargeFilePlugin({
            maxSize: 1024 * 1024 //默认大小为 1024 * 1024 (1M)
        })
    ]
```
