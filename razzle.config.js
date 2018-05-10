'use strict';
const path = require('path')
module.exports = {
  modify(baseConfig, { target, dev }, webpack) {
    const config = Object.assign({}, baseConfig);

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx',
    ]);

    // - Define alias absolute path
    config.resolve.alias.src = path.resolve(__dirname, './src/');
    config.resolve.alias.components = path.resolve(__dirname, './src/components/');
    config.resolve.alias.containers = path.resolve(__dirname, './src/containers/');
    config.resolve.alias.store = path.resolve(__dirname, './src/store/');
    config.resolve.alias.models = path.resolve(__dirname, './src/models/');
    config.resolve.alias.core = path.resolve(__dirname, './src/core/');
    config.resolve.alias.api = path.resolve(__dirname, './src/api/');
    config.resolve.alias.assets = path.resolve(__dirname, './src/assets/');
    config.resolve.alias.config = path.resolve(__dirname, './src/config/');
    config.resolve.alias.constants = path.resolve(__dirname, './src/constants/');
    config.resolve.alias.layouts = path.resolve(__dirname, './src/layouts/');
    config.resolve.alias.locale = path.resolve(__dirname, './src/locale/');
    config.resolve.alias.styles = path.resolve(__dirname, './src/styles/');
    config.resolve.alias.util = path.resolve(__dirname, './src/util/');

    config.devtool = 'cheap-module-source-map';

    // Locate eslint-loader and remove it (we're using tslint instead)
    config.module.rules = config.module.rules.filter(
      rule =>
        !(
          Array.isArray(rule.use) &&
          rule.use.length > 0 &&
          rule.use[0].options &&
          'useEslintrc' in rule.use[0].options
        )
    );

    // Safely locate Babel-Loader in Razzle's webpack internals
    const babelLoader = config.module.rules.findIndex(
      rule => rule.use[1].options && rule.use[1].options.babelrc
    );

    // Get the correct `include` option, since that hasn't changed.
    // This tells Razzle which directories to transform.
    const { include } = config.module.rules[babelLoader];

    // Declare our TypeScript loader configuration
    const tsLoader = {
      include,
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    };

    const tslintLoader = {
      include,
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'tslint-loader',
      options: {
        emitErrors: true,
        configFile: './tslint.json',
      },
    };

    config.module.rules.push(tslintLoader);

    // Fully replace babel-loader with ts-loader
    config.module.rules[babelLoader] = tsLoader;

    // If you want to use Babel & Typescript together (e.g. if you
    // are migrating incrementally and still need some Babel transforms)
    // then do the following:
    //
    // - COMMENT out line 59
    // - UNCOMMENT line 68
    //
    // config.module.rules.push(tsLoader)

    return config;
  },
};
