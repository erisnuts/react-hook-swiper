module.exports = function (webpack) {
  return {
    plugins: [
      require('postcss-partial-import')({ addDependencyTo: webpack }),
      require('postcss-nested')({}),
      require('iconfont-webpack-plugin')({
        resolve: webpack.webpack.resolve
      }),
      require('postcss-custom-media')({
        extensions: {
          '--min-tiny-phone': '(min-width: 320px)',
          '--min-small-phone': '(min-width: 469px)',
          '--min-phone': '(min-width: 571px)',
          '--min-tablet': '(min-width: 769px)',
          '--min-desktop': '(min-width: 997px)',
          '--min-large-desktop': '(min-width: 1280px)',
          '--min-big-desktop': '(min-width: 1440px)',
          '--min-huge-desktop': '(min-width: 1540px)',
          '--max-small-phone': '(max-width: 468px)',
          '--max-phone': '(max-width: 570px)',
          '--max-tablet': '(max-width: 769px)',
          '--max-desktop': '(max-width: 996px)',
          '--max-large-desktop': '(max-width: 1279px)',
          '--max-big-desktop': '(max-width: 1440px)',
          '--max-huge-desktop': '(max-width: 1540px)',
          '--desktop-to-tablet': '(min-width: 769px) and (max-width: 996px)',
          '--large-desktop-to-desktop':
            '(min-width: 996px) and (max-width: 1200px)'
        }
      }),
      require('lost')({}),
      require('postcss-flexbugs-fixes'),
      require('postcss-css-variables')({
        variables: {
          '--gradientMain':
            'linear-gradient(-163deg, #9EBEFF 0%, #BF9951 100%)',

          '--white': '#ffffff',
          '--whiteBlue': '#E2E7F2',

          '--blueBright': '#2F7DE1',
          '--blue': '#4E89FF',
          '--blueLight': '#73A1FF',
          '--lightBlue': '#0d8bcd',
          '--blueGradient':
            'linear-gradient(-163deg, #73A1FF 0%, #808AFF 100%)',
          '--blueGradientLight':
            'linear-gradient(-17deg, #739FFF 0%, #9CC5FF 100%)',

          '--blueOpacity': 'rgba(78, 137, 255, .06)',
          '--blueOpacity5': 'rgba(78, 137, 255, .6)',
          '--blueOpacityLight': 'rgba(115, 161, 255, .2)',

          '--black': '#333333',

          '--purpleLight': 'rgba(72, 93, 200, .08)',
          '--purpleGradient':
            'linear-gradient(310deg, #C2A4FC 30%, #8C9AFF 100%)',

          '--grey': '#DDDFE0',
          '--greyLight': '#F0F0F2',
          '--greyBold': '#757575',
          '--greyDark': '#9B9EAA',
          '--greyDarkLight': '#AEB1BF',
          '--greyBackground': '#F8F8FC',
          '--greyGradient':
            'linear-gradient(#E9E9ED 30%, #F0F0F2 15%, #FFFFFF)',

          '--pink': '#ED4D74',
          '--pinkLight': '#F2839F',
          '--pinkHover':
            'linear-gradient(162.86deg, #DE62A0 0%, #F2839F 100%)',

          '--pinkHoverGradientDark':
            'linear-gradient(163.07deg, #F16A9D 0%, #FA708C 100%)',

          /**Shadow**/

          '--Shadow5blur15': '0 5px 15px 0 rgba(72,93,200,0.20)',
          '--Shadow5blur40': '0 5px 40px rgba(72, 93, 200, 0.2)',
          '--Shadow10blur35': '4px 10px 35px rgba(239, 106, 160, 0.7)',
          '--Shadow5blur24': '0 5px 24px rgba(238, 105, 162, 0.3)',
          '--Shadow3blue10': '0 3px 10px 0 rgba(107,111,130,0.13)',

          '--tonerForCard':
            'linear-gradient(310deg, #214a66 30%, #434d95 100%);',
          '--tonerBrand':
            'linear-gradient(290deg, #3e6ecc 30%, #3e84cc 100%);'
        }
      }),
      require('postcss-custom-properties')({}),
      require('postcss-calc')({}),
      require('autoprefixer')()
      // require('cssnano')({ zindex: false }),
    ]
  };
};
