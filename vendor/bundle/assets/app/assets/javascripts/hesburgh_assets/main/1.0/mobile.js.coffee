jQuery ($) ->
  $(".search-toggle").click (e) ->
    e.preventDefault()
    $(".header").toggleClass("open-search")

  $('#nav').mobileMenu({combine:false, prependTo:'.menu', switchWidth: 481})
