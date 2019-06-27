# This script controls the partner libraries checkbox on the ND Catalog homepage
# Checking the checkbox will select the partner libraries scope from the dropdown and automatically submit the form.
jQuery ($) ->
  partnerCheckbox = $('#partner-libraries-checkbox')
  if partnerCheckbox.length > 0
    scopeDiv = $("##{partnerCheckbox.attr('data-scope')}-Div")

    partnerCheckbox.attr('checked', scopeDiv.find('input').attr('checked'))

    # When the partner libraries
    scopeDiv.siblings().click ->
      partnerCheckbox.attr('checked', false)
    scopeDiv.click ->
      partnerCheckbox.attr('checked', true)

    partnerCheckbox.change ->
      if (partnerCheckbox.attr('checked'))
        scopeDiv.click()
       else
        scopeDiv.siblings(':first').click()
      partnerCheckbox.parents('form').submit()
