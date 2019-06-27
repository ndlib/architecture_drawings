jQuery ($) ->
  cloneTabClass = "EXLDetailsTab"
  detailsPath = "/primo_library/libweb/tiles/local/discover-details.jsp"
  onlineAccessPath = "/primo_library/libweb/tiles/local/discover-online-access.jsp"
  detailsTabClass = 'ndl-details-tab'
  onlineAccessTabClass = 'ndl-online-access'

  hoverIn = ->
    li = $(this)
    li.prevAll().add(li).addClass('ndl-hover')

  hoverOut = ->
    li = $(this)
    li.prevAll().add(li).removeClass('ndl-hover')

  attachEvents = (container) ->
    container.find('.ndl-hierarchical-search li').hover(hoverIn, hoverOut)
    container.find('.ndl-detail-content > ul').each ->
      ul = $(this)
      lis = ul.children('li')
      if lis.length > 8
        fifth = $(lis[4])
        collapsibleLinks = fifth.nextAll()
        collapsibleLinks.addClass('ndl-hidden')
        expandLi = $('<li></li>').addClass('ndl-expand')
        expandA = $('<a></a>').attr('href','#').text('Show More')
        expandLi.append(expandA)
        ul.append(expandLi)
        expandLi.click (event) ->
          event.preventDefault()
          if expandLi.hasClass('ndl-expand')
            expandLi.removeClass('ndl-expand')
            expandA.text('Show Less')
            collapsibleLinks.removeClass('ndl-hidden')
          else
            expandLi.addClass('ndl-expand')
            expandA.text('Show More')
            collapsibleLinks.addClass('ndl-hidden')
      return


  getOtherDetails = (element, tabType) ->
    link = $(element)
    recordID = EXLTA_recordId(element)
    if !link.data('loaded')
      success = (data) ->
        container = link.parents(".EXLResult").find("." + tabType + "-Container").children(".EXLTabContent").children(".#{tabType}-content")
        container.removeClass('EXLTabLoading')
        container.html data
        link.data('loaded', true)
        attachEvents(container)
        return
      $.get detailsPath, {id: recordID, primary: 'ndu_aleph'}, success, "html"
    return

  getOnlineAccess = (element, tabType) ->
    link = $(element)
    recordID = EXLTA_recordId(element)
    if !link.data('loaded')
      success = (data) ->
        container = link.parents(".EXLResult").find(".#{tabType}-Container").children(".EXLTabContent").children(".#{tabType}-content")
        container.removeClass('EXLTabLoading')
        container.html data
        link.data('loaded', true)
        return
      $.get onlineAccessPath, {id: recordID, primary: 'ndu_aleph'}, success, "html"
    return

  ready = ->
    replaceTab = $(".#{cloneTabClass}")
    if replaceTab.length > 0
      EXLTA_addTab "New Details", detailsTabClass, location.href, cloneTabClass, "detailsTab", detailsTabClass, false, checkTabPresence, ".#{cloneTabClass}"
      $(".#{detailsTabClass}").click (e) ->
        tab = $(this)
        link = tab.find('a').get(0)
        msTabHandler e, link, detailsTabClass, "<div id=\"#{detailsTabClass}-content\" class=\"EXLTabLoading #{detailsTabClass}-content\"></div>", getOtherDetails, location.href, tab.hasClass("EXLResultSelectedTab")
        return
      EXLTA_addTab "New Online Access", onlineAccessTabClass, location.href, cloneTabClass, "detailsTab", onlineAccessTabClass, false, checkTabPresence, ".#{cloneTabClass}"
      $(".#{onlineAccessTabClass}").click (e) ->
        tab = $(this)
        link = tab.find('a').get(0)
        msTabHandler e, link, onlineAccessTabClass, "<div id=\"#{onlineAccessTabClass}-content\" class=\"EXLTabLoading #{onlineAccessTabClass}-content\"></div>", getOnlineAccess, location.href, tab.hasClass("EXLResultSelectedTab")
        return

    $('.ndl-details').each ->
      attachEvents($(this))

  $(document).ready(ready)
