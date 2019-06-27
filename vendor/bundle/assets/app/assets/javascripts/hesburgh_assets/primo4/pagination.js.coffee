jQuery ($) ->
  stringToInt = (value) ->
    parseInt value.replace(/[^\d]/g, "")
  queryParamsForPage = (page_number) ->
    indx = ((page_number - 1) * pageSize) + 1
    "&pag=nxt&indx=" + indx
  $pageElement = $(".EXLBriefResultsPaginationPageCount").first()
  if $pageElement.length > 0
    $paginationContainers = $('.EXLResultsNavigation')
    $paginationContainer = $paginationContainers.first()
    $totalElement = $pageElement.next()
    totalText = $totalElement.text().trim()
    total = stringToInt(totalText)
    pageMatch = $pageElement.text().match(/Results (.*) - (.*) of/)
    pageStart = stringToInt(pageMatch[1])
    pageEnd = stringToInt(pageMatch[2])
    if pageEnd < total
      pageSize = pageEnd - pageStart + 1
      $.cookie "page_size", pageSize
    else
      pageSize = stringToInt($.cookie("page_size"))
    totalPages = Math.floor(total / pageSize)
    currentPage = ((pageStart - 1) / pageSize) + 1
    $paginationLinks = $paginationContainer.children("a")
    $previousLink = $paginationLinks.first().children("img").parent()
    $nextLink = $paginationLinks.last().children("img").parent()
    baseLink = $paginationLinks.first().attr("href")
    baseLink = baseLink.replace(/(ct|pag|indx)=[^&]+&?/g, "")
    if $nextLink.length > 0
      lastLink = $paginationLinks.last().clone()
      lastLink.text "Last"
      lastLink.attr "href", baseLink + queryParamsForPage(totalPages)
      lastLink.attr "title", "Go to Last page"
      $paginationContainers.each ->
        $(this).append lastLink.clone()
    if $previousLink.length > 0
      firstLink = $paginationLinks.first().clone()
      firstLink.text "First"
      firstLink.attr "href", baseLink + queryParamsForPage(0)
      firstLink.attr "title", "Go to First page"
      $paginationContainers.each ->
        $(this).prepend firstLink.clone()
