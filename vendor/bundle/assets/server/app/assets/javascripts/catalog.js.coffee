jQuery ($) ->
  searchBox = $('.search-box')
  if searchBox.length > 0
    tabs = $('.search-tabs li')
    tabs.click (event) ->
      event.preventDefault()
      tab = $(this)
      tabs.removeClass('selected')
      tab.addClass('selected')
