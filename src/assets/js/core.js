var App = (function () {

  var config = {//Basic Config
    animate: false,
    popover: true,
    assetsPath: 'assets',
    imgPath: 'img',
    jsPath: 'js',
    libsPath: 'lib'
  };

  //Core private functions

  return {
    conf: config,
    init: function (options) {
      //Extends basic config with options
      $.extend( config, options );

      //Core public function

    }
  };
 
})();