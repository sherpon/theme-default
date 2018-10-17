const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const fileName = 'theme-default'
const fileVersion = '1.2.2'

module.exports = (env) => {
  //console.log(`env.NODE_ENV ===> ${env.NODE_ENV}`)
  let productionMode = false
  if (env.NODE_ENV==='production') {
    productionMode = true
  }
  const fullFileName = (productionMode) ? (`${fileName}-${fileVersion}.min`) : (`${fileName}`)

  return {
    output: {
      filename: `${fullFileName}.js`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: false }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: './images/store/[name].[ext]',
                limit: 25000
              }
            },
            {
              loader: 'img-loader'
            }
          ]
        },
        {
          test: /\.svg$/,
          use: "file-loader",
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: `${fullFileName}.css`,
        chunkFilename: '[id].css'
      })
    ],
    devServer: {
      proxy: {
        '**': {
          target: 'http://localhost:8080',
          pathRewrite: {
            '^/fashionpet/category/categoria_1' : '',
            '^/fashionpet/products' : '',
            //'^/fashionpet/^' : '',
            '^/fashionpet' : ''

          }
        }
      }
    }
  }
}
