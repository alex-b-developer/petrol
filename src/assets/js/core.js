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
  function my_sidebar_func(){

    $(".my-sidebar-elements-class > li > a").click(function( e ){//When we make click on main level item

      var main_item = $(this).parent();
      var sub_menu = $(this).next();//We get the sub menu UL element

      //Part 1: We close all the open sub menus
      $(".my-sidebar-elements-class > li.open").find(".sub-menu").slideUp(function(){
        $(this).parent().removeClass("open");
      });

      //Part 2: We open the current clicked sub-menu 
      sub_menu.slideDown(function(){//Execute when animation is completed
        main_item.addClass("open");
      });

      e.preventDefault();//We stop the default href link action
    });

  }

  var my_private_var = "Hell yeah";

  //Public statements
  return {
    conf: config,
    init: function (options) {
      //Extends basic config with options

      $.extend( config, options );

      my_sidebar_func( config );

    }
  };
 
})();
