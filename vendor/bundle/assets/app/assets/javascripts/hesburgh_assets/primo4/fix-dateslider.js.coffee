jQuery ($) ->
  $sliderURL = $("#sliderURL")
  if $sliderURL.length > 0
    originalURL = $sliderURL.val()
    modifiedURL = originalURL
    nameMatches = originalURL.match(/fctN=[^&]+&?/g)
    valueMatches = originalURL.match(/fctV=[^&]+&?/g)
    $.each nameMatches, (index, nameMatch) ->
      if nameMatch.match(RegExp("=facet_creationdate"))
        valueMatch = valueMatches[index]
        modifiedURL = modifiedURL.replace(nameMatch, "")
        modifiedURL = modifiedURL.replace(valueMatch, "")
      return

    $sliderURL.val modifiedURL
