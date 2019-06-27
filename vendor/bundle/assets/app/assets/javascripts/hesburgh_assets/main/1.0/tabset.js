jQuery(function($) {

  $('.default a').tooltip({
    showURL: false,
    track: false,
    delay: 0,
    left: -10,
    top: -36
  });

  $("a.setTabDefault").live("click", function(){
    //  alert("click");
    var url = $(this).attr("href");
    if ( $(this).hasClass("act") ) {
      clearTabCookie();
      $(this).removeClass("act");
      $.gritter.add({
        // (string | mandatory) the heading of the notification
        title: 'Default Search Cleared',
        // (string | mandatory) the text inside the notification
        text: '&nbsp;',
        time: 1000,
        before_open: function() {
          if($('.gritter-item-wrapper').length == 1) {
            // Returning false prevents a new gritter from opening
            return false;
          }
        }
      });
    } else {
      $.gritter.add({
        // (string | mandatory) the heading of the notification
        title: 'Default Search Saved',
        // (string | mandatory) the text inside the notification
        text: '&nbsp;',
        time: 1000,
        before_open: function(){
          if($('.gritter-item-wrapper').length == 1) {
            // Returning false prevents a new gritter from opening
            return false;
          }
        }
      });

      setTabCookie(url);
      activateTab($('a[href="' + url + '"]'));
      $(".default a.act").removeClass("act");
      $(this).addClass("act");

    }

    return false;

  });

  //Set the user's Default Search tab
  var defaultTab = getCookie('DEFAULT_TAB');

  if (defaultTab && !window.location.hash ) {
    $tab = $('a[href="' + defaultTab + '"]');
    if ($tab.length > 0) {
      window.location.hash = defaultTab;
      if (window.location.hash) {
        activateTab($tab);
      }
    }
  }

  function setTabCookie(url) {
    d = new Date();
    d.setFullYear(2050,12,31) ;
    document.cookie = "DEFAULT_TAB = " + url + "; path = /; expires = " + d ;
  }

  function clearTabCookie() {
    var d = new Date() ;
    d.setDate(d.getDate()-1) ;
    document.cookie = "DEFAULT_TAB = '' ; path = /; expires =" + d ;
  }



  function getCookie(c_name) {
    if (document.cookie.length>0) {
      c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1) {
        c_start=c_start + c_name.length+1;
        c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
      }
    }
    return "";
  }

  function activateTab($tab) {
    var $activeTab = $tab.closest('dl').find('a.active'),
        contentLocation = $tab.attr("href") + 'Tab';

    // Strip off the current url that IE adds
    contentLocation = contentLocation.replace(/^.+#/, '#');

    //Make Tab Active
    $activeTab.removeClass('active');
    $tab.addClass('active');
    $tab.parent().addClass('activet');
    $('.activet .default a').removeClass('active');
    $('.activet .default a').addClass('act');
    //$('div.default a').addClass('act');

     //Show Tab Content
    $(contentLocation).closest('.tabs-content').children('li').hide();
    $(contentLocation).css('display', 'block');
    $(contentLocation).addClass('defaulted');
  }

});



