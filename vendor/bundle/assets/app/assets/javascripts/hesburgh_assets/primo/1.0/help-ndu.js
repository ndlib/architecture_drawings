jQuery(function($) {
  $('.EXLMainMenuITEMhelp').click(function (event){

    var url = $(this).attr("href");
    var windowName = "Help";
    var windowSize = ['width=700,height=500,resizable=1,scrollbars=1'];

    window.open(url, windowName, windowSize);

    event.preventDefault();

  });
});
