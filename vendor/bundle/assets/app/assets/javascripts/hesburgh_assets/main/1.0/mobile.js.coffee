jQuery ($) ->
  $(".search-toggle").click ->
    $(".header_search").toggleClass("closed")
    $(".header").toggleClass("open")

  $('#nav').mobileMenu({combine:false, prependTo:'.menu'})
