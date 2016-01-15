var App = (function () {

  var config = {//Basic Config
    animate: false,
    popover: true,
    assetsPath: 'assets',
    imgPath: 'img',
    jsPath: 'js',
    libsPath: 'lib'
  };

  // Core private functions

  function my_close_open_items(sub_menu){

    // Part 1: We close all the open sub menus
    var opened_submenus = $(".pe-sidebar-elements-class > li.open").find(".sub-menu").not(sub_menu);
    
    var a = opened_submenus.prev();//Get the a element
    var icon_plus = $("> span.icon.icon-arrows_plus", a);
    var icon_minus = $("> span.icon.icon-arrows_minus", a);
    
    icon_plus.removeClass("rotate");
    icon_minus.removeClass("rotate");

    opened_submenus.slideUp(function(){//After the animation ends
      $(this).parent().removeClass("open");
    });
  }

  function my_open_menu_item(sub_menu){

    // Part 2: We open the current clicked sub-menu 
    var main_item = sub_menu.parent();//Get the li element
    var icon_plus = $("> a > span.icon.icon-arrows_plus", main_item);
    var icon_minus = $("> a > span.icon.icon-arrows_minus", main_item);

    icon_plus.addClass("rotate");
    icon_minus.addClass("rotate");

    sub_menu.slideDown(function(){ //Execute when animation is completed
      main_item.addClass("open");
    });

  }


  function my_sidebar_func(){

    $(".pe-sidebar-elements-class > li > a").click(function( e ){//When we make click on main level item

      var main_item = $(this).parent(); // We get the LI element
      var sub_menu = $(this).next(); //We get the sub menu UL element

      // Verify if the current item has a submenu
      if( sub_menu.length > 0 ){
        if( main_item.hasClass("open") ){ // Don't open submenu if current main item is already closed
          my_close_open_items();        
        }else{
          my_close_open_items( sub_menu );
          my_open_menu_item( sub_menu );
        }
        e.preventDefault();//We stop the default href link action
      }

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
