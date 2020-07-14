const path = require('path');
// const {CheckerPlugin} = require('awesome-typescript-loader');
var nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/server.ts',
  target:'node',
  externals: [nodeExternals(), { knex: 'commonjs knex' }],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ ".mjs",'.js', '.ts','.(graphql|gql)'],
    modules: [
        '/src',
    ]
},
  module:{
      rules:[
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use:
             [ {loader: 'ts-loader',
              options: {
                transpileOnly: true
              }}
            ]
        }
      ]
  },
  plugins:[
    // new CheckerPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
  
};