jQuery ($) ->
  $searchAppliance = $('#tab_box').filter('.search-appliance')

  if $searchAppliance.length > 0
    $links = $searchAppliance.find('.tabs dd > a')
    $tabContents = $searchAppliance.find('.tabs-content > li')

    searchApplianceRedirect = (event) ->
      link = $(this)
      href = link.attr('href')
      if href && /^[^#]/.test(href) && !/[?]/.test(href)
        activeTabContent = $tabContents.filter('.active')
        searchField = activeTabContent.find('input[type=text]:first')
        qValue = searchField.val()
        legend = searchField.siblings('.legend')
        # Test to make sure we don't search for the database finder placeholder text
        if qValue == legend.text()
          qValue = ""
        qParam = $.param({q: qValue})
        qUrl = "#{href}?#{qParam}"
        if searchField.length > 0
          event.preventDefault()
          event.stopImmediatePropagation()
          event.stopPropagation()
          window.location.href = qUrl

    $links.click(searchApplianceRedirect)

  doc = document.documentElement
  doc.setAttribute "data-useragent", navigator.userAgent

