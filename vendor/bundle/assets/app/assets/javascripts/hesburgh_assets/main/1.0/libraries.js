jQuery(function($) {

  var gallery = $("#gallerycs");
  if (gallery.length > 0) {
    //gallery.after('<div id="chat"><div id="chat-head">Click to Chat with a Librarian <img src="//asset.library.nd.edu/assets/hesburgh_assets/main/1.0/white_arrow_horiz.png" /></div><div id="chat-widget"><div class="libraryh3lp" jid="nd-ask-a-lib@chat.libraryh3lp.com"><iframe src="http://libraryh3lp.com/chat/nd-ask-a-lib@chat.libraryh3lp.com?skin=10273&amp;theme=gota&amp;title=Ask%20a%20Librarian&amp;identity=asklib" frameborder="0" style="width: 257px; height: 300px; border: 0px inset #2a4480;"></iframe></div></div></div>');

    if (gallery.coinslider) {
      gallery.coinslider({ width: 263, height: 165, delay: 20000, effect: 'straight', sph:1,spw:1, });
    }
  }

  $("#search_box .legend").add(".header_search .legend").each(function() {
    var legend = $(this);
    var legendText = legend.text();
    var input = legend.siblings('.srch-box');
    input.data('placeholder',legendText);
    if (!input.val() && !input.is(":focus")) {
      input.val(input.data('placeholder'));
    }
    var clearPlaceholder = function() {
      if (input.val() == input.data('placeholder')) {
        input.val('');
      }
    };
    var form = input.parents('form');
    form.submit(clearPlaceholder);
    input.focus(clearPlaceholder);
    input.blur(function() {
      if (!input.val()) {
        input.val(input.data('placeholder'));
      }
    });
  });

  var headerSearch = $(".header_search #search_field");

  headerSearch.focus(function() {
    $(this).animate({
      width: "250px",
      opacity: 1
    }, 500);
  });
  headerSearch.focusout(function() {
    $(this).animate({
      width: "143px",
      opacity: 0.7
    }, 500);
  });

  //$('ul.sf-menu').superfish({
  //  delay:       0,
  //  speed:       'fast'
  //});
});
