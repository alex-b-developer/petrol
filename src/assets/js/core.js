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

  function my_close_open_items(active_sub_menu){

    // Part 1: We close all the open sub menus
    $(".my-sidebar-elements-class > li.open").find(".sub-menu").not(active_sub_menu).slideUp(function(){
      $(this).parent().removeClass("open");
    });

  }

  function my_open_menu_item(sub_menu){

    // Part 2: We open the current clicked sub-menu 
    var main_item = sub_menu.parent();

    sub_menu.slideDown(function(){ //Execute when animation is completed
      main_item.addClass("open");
    });

  }


  function my_sidebar_func(){

    $(".my-sidebar-elements-class > li > a").click(function( e ){//When we make click on main level item

      var main_item = $(this).parent(); // We get the LI element
      var sub_menu = $(this).next(); //We get the sub menu UL element

      // Verify if the current item has a submenu
      if(sub_menu.length > 0){
        if(main_item.hasClass("open")){ // Don't open submenu if current main item is already closed
          my_close_open_items();        
        }else{
          my_close_open_items(sub_menu);
          my_open_menu_item(sub_menu);
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
