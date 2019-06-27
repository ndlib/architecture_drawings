 jQuery(function($) {
    $(function() {
        $(document).ready(function() {
                $(".site").val($(".site").siblings('.legend').text());
                $(".catalog").val($(".catalog").siblings('.legend').text());
                $(".header_search .srch-box").focus(function() {
                    $(this).animate({
                         //width: "250px",
                         opacity: 1

                    }, 500);
                    this.value = '';
                });
                $(".header_search .srch-box").focusout(function() {
                            $(this).animate({
                                // width: "143px",
                                 opacity: 0.7

                            }, 500);
                            $(".site").val($(".site").siblings('.legend').text());
                            $(".catalog").val($(".catalog").siblings('.legend').text());
                });


         });


    });
 });

