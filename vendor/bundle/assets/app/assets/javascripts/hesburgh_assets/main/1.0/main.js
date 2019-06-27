//Scripts related to the interface of the entire site
jQuery(function($) {
  /* Creates the dropdown menu navigation */

  /* handles colorbox */
  //$("p.about-tab>a").colorbox({iframe:false, innerWidth:525, innerHeight:344, speed:250});
  $("p#acceptable-use-note>a").colorbox({iframe:true, innerWidth:525, innerHeight:424, speed:250});

  /* general */

  /* handles all tab behavior */

  /* get tab name from url if exists */
  var re = /#[\w]+[\W]?$/;   // This will match the anchor tag in the URL i.e. http://here.com/page#anchor
  var doc_loc = document.location.toString();
  var tab_match = re.exec(doc_loc);


  // tab styling

  $(".menu-tabs").addClass('ui-tabs ');
  $(".menu-tabs .tabs").addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix');

  // for each tab, hide the corresponding div with same class as the href
  var tab_links = $(".menu-tabs .tabs div.menu_center a");
  tab_links.each( function(){
    var tabcs = $(this).attr('href');
    tabcs = tabcs.replace("#", ".");
    $( tabcs).addClass('ui-tabs-hide ui-tabs-panel');
  });

  // these two functions manage tab behavior for hover and click

  var cl = false;
  var tb_state = 'tbi';

  tab_links.click(function(){
    var currUrl = location.href;
    currUrl = currUrl.substr(currUrl.lastIndexOf("/")+ 1);

    var anc = $(this);
    var tbid = $(this).attr('href');
    var tbexist = $(anc).attr('href');
    tbexist = tbexist.substr(tbexist.indexOf("#"))+ "_l";
    // check to see if tab stays on same page

    var smpg = true;
    if(tbid.indexOf("/")>= 0){ smpg = false;  }

    // if there is no # in url or if the class defined by # doesn't exist or if we leave the page, don't do tab processing
    if(tbid.indexOf("#") == 0 && $(tbexist).length > 0 && smpg){
      var tbids = tbid.substr(tbid.indexOf("#")+1);
      var optb = $('.tba div.menu_center a').attr('href');

      if(optb != undefined){
        optb = optb.replace("#", ".");
        $(optb).addClass('ui-tabs-hide');
      }

      $("." + tbids).removeClass('ui-tabs-hide');

      $('.tba').attr('class', 'tbi');
      $("#" + tbids + "_l").parents('li').attr('class', 'tba');
      if($(anc).parents('div').attr('class') == 'menu_center'){
        cl = true;
      }

    } else if(tbid.indexOf("#") != 0 ){
      // if we leave the url, reset the hover to inactive
      $('.tb').attr('class', 'tbi');
    }

  });

  $('.tbi, .tba').hover(
    function() {
      tb_state = $(this).attr('class').substr(0 , 3); if(tb_state != 'tba'){ $(this).attr('class', 'tb'); }
    },
    function() {
      if(!cl){
        $(this).attr('class', tb_state);
      } else {
        cl = false;
      }
    }
  );


  // for deep linking and default setting

  if(tab_match){
    $('.tba').attr('class', 'tbi');
    $(tab_match +'_l').parents('div').parents('li').attr('class', 'tba');

    var tma = tab_match.toString();
    tma = tma.replace("#", ".");
    $(tma).removeClass('ui-tabs-hide');
  }else{

    var at = $('.tba div.menu_center a').attr('href');

    if(at != undefined && at.indexOf("#") == 0){
      at = at.replace("#", ".");
      $(at).removeClass('ui-tabs-hide');
    }
  }


  // toggle image

  $('.toggle-click').click(function() {
    $('.toggle-view', this).slideToggle(250);
    if($(this).children('img').attr('src') == '//asset.library.nd.edu/assets/hesburgh_assets/main/1.0/plus.gif'){
      $(this).children('img').attr('src', '//asset.library.nd.edu/assets/hesburgh_assets/main/1.0/minus.gif');
    }else{
      $(this).children('img').attr('src', '//asset.library.nd.edu/assets/hesburgh_assets/main/1.0/plus.gif');
    };
  });

  // manages chat flyout
  $('#chat-head').click(function(){
    $('#chat-widget').slideToggle();
    if($('#chat-head img').attr('src') == '/assets/hesburgh_assets/main/1.0/white_arrow_horiz.png'){
      $('#chat-head img').attr('src', '/assets/hesburgh_assets/main/1.0/white_arrow_vert.png');
    }else{
      $('#chat-head img').attr('src', '/assets/hesburgh_assets/main/1.0/white_arrow_horiz.png');
    };

  });



});
