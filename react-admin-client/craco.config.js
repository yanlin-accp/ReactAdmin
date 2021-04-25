const path = require('path')
const resolve = (dir) => path.join(__dirname, '.', dir)
const CracoAntDesignPlugin = require('craco-antd')


module.exports = {
  babel: {
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            sourceMap: false,
          },
        },
        customizeTheme: {
            '@primary-color': '#2393ca'
          },
        // cssLoaderOptions: {
        //   modules: {
        //     localIdentName: '[local]_[hash:base64:5]',
        //     // 回调必须返回 `local`，`global`，或者 `pure`
        //     mode: (resourcePath) => {
        //       if (/pure\.(less|css)$/i.test(resourcePath)) {
        //         return 'pure'
        //       }

        //       if (/(global)\.(less|css)$/i.test(resourcePath)) {
        //         return 'global'
        //       }

        //       if (/antd/i.test(resourcePath)) {
        //         return 'global'
        //       }

        //       return 'local'
        //     },
        //   },
        // },
        babelPluginImportOptions: {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, //为true 自动打包相关的样式,否则为"css"
        },
      },
    }
  
  ],
  webpack: {
    alias: {
      '@': resolve('src'),
    },
  },
//   devServer: (devServerConfig, { proxy }) => {
//     devServerConfig.proxy = {
//       ...proxy,
//       '/api': {
//       	// 访问 localhost:3000/api/* 相当于访问 localhost:3001/api/*
//         target: 'localhost:5000',
//         changeOrigin: true,
//       },
//     }
//     return devServerConfig
//   },
}
