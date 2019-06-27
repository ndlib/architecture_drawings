jQuery ($) ->
  sidenav = $('.bs-docs-sidenav')
  if sidenav.length > 0
    win = $(window)
    sidebar = sidenav.parent()
    column = sidebar.parent()
    sidenav.width(sidebar.width())
    win.resize ->
      sidenav.width(sidebar.width())

    $('body').scrollspy({target: '.bs-docs-sidebar', offset: (column.offset().top * -1) + 1})
