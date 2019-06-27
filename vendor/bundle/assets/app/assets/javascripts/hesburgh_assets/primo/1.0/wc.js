//Javascript to develop/test worldcat search link in primo
//Robin Schaaf, 1/9/2013


$(document).ready(function() {
	//advanced search
	if ($('#exlidAdvancedSearchRibbon').length){

		var searchString='';

		//loop through each advanced search row
		$('.EXLAdvancedSearchFormRow').each(function(index) {
			//as long as free text is entered
			if( ($('#input_freeText' + index).length) && ($('#input_freeText' + index).val() !== '')){
				//the dropdowns start with 1
				ddIndex = index + 1;
				//convert the search type from what's in the dropdown
				//to worldcat's term
				wcIndex = getWCIndex($('#exlidInput_scope_' + ddIndex).val());
	
				//for 'constains'search
				var operator = '%3A';
				//for 'exact' search
				if ($('#exlidInput_precisionOperator_' + ddIndex).val() == 'exact'){
					operator = '%3D';
				}
				
				//construct search string
				searchString += wcIndex + operator + $('#input_freeText' + index).val() + ' ';
			}
		});


		//also language search
		if ($('#exlidInput_language_').val() != 'all_items'){
			searchString += 'ln' + '%3A' + $('#exlidInput_language_').val() + ' ';
		}


		if (searchString !== ''){
			//replace space with +
			searchString = searchString.replace(/ /g, '+');
			
			//remove last "+"
			searchString = searchString.substring(0,searchString.length-1); 

			//escape quotes
			searchString = searchString.replace(/\"/g, '&quot;');
			searchString = searchString.replace(/\'/g, "\\'");
			
			//expand width of parent container
			$('.EXLSearchTabsContainer').css('width','100%');

			//add the worldcat link
			$('.EXLSearchTabsContainer').append('<div id="WorldCatAdvancedDiv"><a onclick="javascript:window.open(\'http://www.worldcat.org.proxy.library.nd.edu/search?q=' + searchString + '\');" href="javascript:void(0);"><img src="../images/worldcat.png" /></a></div>');
		}

	}else{ //basic search

		if ($('#search_field').val() != ''){
			var searchTerm = $('#search_field').val();

			//escape quotes
			searchTerm = searchTerm.replace(/\"/g, '&quot;');
			searchTerm = searchTerm.replace(/\'/g, "\\'");
			
			
			//expand width of parent container
			$('.EXLSearchTabsContainer').css('width','100%');

			//add the worldcat link
			$('.EXLSearchTabsContainer').append('<div id="WorldCatBasicDiv"><a onclick="javascript:window.open(\'http://www.worldcat.org.proxy.library.nd.edu/search?q=' + searchTerm + '\');" href="javascript:void(0);"><img src="../images/worldcat.png" /></a></div>');


		}

	}
});


function getWCIndex(exSearch){
  switch (exSearch){
	case 'any':
		return 'kw';
	case 'title':
		return 'ti';
	case 'creator':
		return 'au';
	case 'sub':
		return 'su';
	case 'isbn':
		return 'bn';
	case 'issn':
		return 'n2';
	case 'lsr03':
		return 'se';
	case 'lsr04':
		return 'ut';
	case 'lsr06':
		return 'pb';
	case 'lsr05':
		return 'lc';
	default:
		return 'kw';
  }

}




