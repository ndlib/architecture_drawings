$('.EXLSummary').live('mouseover',function(){

	var resultNum = $(this).parents('.EXLResult').attr("id");
	$('#' + resultNum + ' .EXLTabsRibbon li').css('background-color','#eeeeee');
	})

$('.EXLSummary').live('mouseout',function(){

        var resultNum = $(this).parents('.EXLResult').attr("id");
        $('#' + resultNum + ' .EXLTabsRibbon li').css('background-color','');
        })


/*
$('#exlidReviewFormSubmit').live('mousedown',function(){
	if ( $(this).parent().parent().parent().children('.EXLReviewEditRatingSelect').val() == 0 ) {
		alert ('Please select a rating');
		return false ;
	}
});
*/


/* added 20110126 A. Bales */
*/ on clicking submit on advanced search, if filter is selected but input is blank, will supply 'alldocuments' as input */

$('#exlidAdvancedSearchRibbon .submit').live('click',function(){
	var input = false ;
	$('.EXLSearchFieldRibbonFormFieldsGroup1 input').each(function(){
		if ( $(this).val() ) { input = true }
	})

	var filters = false ;
	$('.EXLSearchFieldRibbonFormFieldsGroup2 select').each(function(){
		if ( $(this).children('option:eq(0)').val() != $(this).children('option:selected').val() ) {
			filters = true ;
		}
	})

	if ( filters && !input ) { $('.EXLSearchFieldRibbonFormFieldsGroup1 input:eq(0)').val('alldocuments'); }

})

$(document).ready(function(){

// Check browser for worldcat tab

	var vid = $(location).attr('href').match(/vid=\w*/)   ;
	if ( vid == "vid=NDUWC" ) {
		var wcTab = $(location).attr('search').match(/(tab.worldcat)\w*/)
		var guest = $('#exlidUserAreaRibbon').hasClass('EXLEShelfTileGuest');
		if ( wcTab && guest) {
			var signIn = $('#exlidSignOut a').attr('href');
			$(location).attr('href',signIn)
		}
	}


//End worldcat stuff
//Login alerts for primo central
	var tab = $(location).attr('href').match(/tab=(\w*)/);
	if ( vid == "vid=NDU"  ) {
		jQuery.getJSON('/primo_library/libweb/current_session.jsp', function(data){
			var on_campus = data.on_campus ;
			var logged_in = data.logged_in ;
			var logURL = $('.EXLSignOut a').attr('href');
		if( !on_campus && !logged_in && (!tab[1] || tab[1] == "onesearch" )      ) {
				$('.EXLResultsTable').before(
					'<h1 class="sign_in_alert">Please <a href="' + logURL + '">sign in</a> to see all search results when off-campus.</h1>'
				)
			}
		});

	}

//Alert message for availability facet
	if ( vid == "vid=NDU" ) {
		//var onshelf_sel = $('.EXLSearchRefinementRemovefacet_tlevel').html().match(/On Shelf/);
		var top_facet_selected = $('.EXLSearchRefinementRemovefacet_tlevel strong').html();
		if ( ( top_facet_selected == 'On Shelf' )&& (!tab[1] || tab[1] == "onesearch" ) ) {
			$('.EXLResultsTable').before('<div class="sign_in_alert">Note: On Shelf results do not include articles or book chapters, even when the relevant journals or books are available in the library.</div>')
		}
	}




	$('.EXLSummary').each(function(){
		var t = $(this).children('.EXLSummaryContainer').children('.EXLSummaryFields').children('.EXLResultAvailability');
		var tt = t.html();
		var l = $(this).children('.EXLTabsRibbon').children('div').children('.EXLResultTabs').children('.EXLLocationsTab').html();
		var lt = false;
		if(l != null){
			lt = true;
		}
		var re = new RegExp("Online access available");
		var tm = re.test(tt);
		if(tm && lt){
			t.append(" <span class=\"inprint\">(also in print, see locations for details)</span>");
		}
		});

	if(EXLTA_isFullDisplay()){
		var pnxIdHtml = "<li><strong>Record Id:</strong> " + $('.EXLResultRecordId').attr('id') + "</li>";
		$('.EXLDetailsContent ul').append(pnxIdHtml);
	}


	// get sigin url and place it in the request tab content box
	$('.EXLRequestTab a').click(
		function(){
			setTimeout("getRSI()", 300);
		});

	var err = $('.EXLRefinementRibbon').clone();
	$('.EXLRefinementRibbon').remove();
	$('.EXLFacetTile').prepend(err);

	$('#search_field').trigger('focus');



	EXLTA_addTab('Locations','NewLocationTab',location.href,'EXLDetailsTab','detailsTab','newLocationsTab',true,checkTabPresence,'.EXLLocationsTab');

	$('.NewLocationTab a').click(
        	function(e){
			msTabHandler(e, this, 'NewLocationTab', '<div id="ndLocation" class="EXLTabLoading"></div>',getLocations,location.href, $(this).parents('.EXLResultTab').hasClass('EXLResultSelectedTab'));
        	});


	$('.EXLResultAvailability').hover(function(){
			$(this).addClass('underline');
		},
		function(){
			$(this).removeClass('underline');
		});

	$('.EXLResultAvailability').live('click', function(event){
		if(event.type == 'click'){
			var thisERA = $(this);
        		var resultNum = $(this).parents('.EXLResult').attr("id");
			var availText = $(this).children('em').html();
			var online = availText.match(/Online/g);
			var fulltxt = availText.match(/Full text available/g);
			//var nofulltxt = availText.match(/No full text online/g);
			var nofulltxt = availText.match(/Not available online/g);
			var findtext = availText.match(/See FindText/g);
			if (!online && !fulltxt && !nofulltxt && !findtext) {
				var taera = thisERA.parents().parents().parents().children('.EXLTabsRibbon').children('div').children('.EXLResultTabs').children('.NewLocationTab').children('a');
				taera.trigger('click');
				msTabHandler(e, taera, 'NewLocationTab', '<div id="ndLocation" class="EXLTabLoading"></div>',getLocations,location.href, $(this).parents('.EXLResultTab').hasClass('EXLResultSelectedTab'));
			}
			if (online || fulltxt || nofulltxt || findtext) {
				//$('#' + resultNum + '-ViewOnlineTab').css('font-size','200%');

				//this triggers the online tab clicked
				var ont = $(this).parent().parent().parent().find('.EXLViewOnlineTab');
				var ontu = ont.children('a').attr('href');
				var ontc = ont.attr('class');
				var ontp = new RegExp("EXLResultTabIconPopout");
				if(ontp.test(ontc) && ontu){
					window.open(ontu, '_catalogplus_url');
				}else{
					$(this).parent().parent().parent().find('.EXLViewOnlineTab a').trigger('click');
				}
			}
		}
        });

        $('.inprint').live('click', function(event){
                if(event.type == 'click'){
                        var thisERA = $(this).parents().parents();
                        var resultNum = $(this).parents('.EXLResult').attr("id");

                        var taera = thisERA.parents().parents().parents().children('.EXLTabsRibbon').children('div').children('.EXLResultTabs').children('.NewLocationTab').children('a');
                        taera.trigger('click');
                        msTabHandler(e, taera, 'NewLocationTab', '<div id="ndLocation" class="EXLTabLoading"></div>',getLocations,location.href, $(this).parents('.EXLResultTab').hasClass('EXLResultSelectedTab'));
                }
        });

        $('.mrecall').live("click", function(event){
		event.preventDefault();
                if(event.type == 'click'){
                        var thisERA = $(this).parents().parents();
                        var resultNum = $(this).parents('.EXLResult').attr("id");
                        var taera = thisERA.parents().parents().parents().children('.EXLTabsRibbon').children('div').children('.EXLResultTabs').children('.EXLRequestTab').children('a');
                        taera.trigger('click');
		}

	});




// Facet Open

$(".EXLFacetContainer h4").each(function(){
    var facet = $(this).text();
    var word = facet.substr(0, facet.indexOf(" "));
    $(this).parent().addClass(facet.toLowerCase());
});

if ($('.EXLSearchRefinementRemovefacet_creationdate strong').attr('class') == 'EXLSearchRefinementfacet_creationdate') {
  	$(".publication ol").children('.EXLAdditionalFacet').show();
  	$(".publication ol").children('.EXLFacetsDisplayMore').hide();
	$(".publication ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_lang strong').attr('class') == 'EXLSearchRefinementfacet_lang') {
  	$(".language ol").children('.EXLAdditionalFacet').show();
  	$(".language ol").children('.EXLFacetsDisplayMore').hide();
	$(".language ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_topic strong').attr('class') == 'EXLSearchRefinementfacet_topic') {
  	$(".topic ol").children('.EXLAdditionalFacet').show();
  	$(".topic ol").children('.EXLFacetsDisplayMore').hide();
	$(".topic ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_creator strong').attr('class') == 'EXLSearchRefinementfacet_creator') {
  	$(".author ol").children('.EXLAdditionalFacet').show();
  	$(".author ol").children('.EXLFacetsDisplayMore').hide();
	$(".author ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_library strong').attr('class') == 'EXLSearchRefinementfacet_library') {
  	$(".library ol").children('.EXLAdditionalFacet').show();
  	$(".library ol").children('.EXLFacetsDisplayMore').hide();
	$(".library ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_lcc strong').attr('class') == 'EXLSearchRefinementfacet_lcc') {
  	$(".call ol").children('.EXLAdditionalFacet').show();
  	$(".call ol").children('.EXLFacetsDisplayMore').hide();
	$(".call ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_domain strong').attr('class') == 'EXLSearchRefinementfacet_domain') {
  	$(".collection ol").children('.EXLAdditionalFacet').show();
  	$(".collection ol").children('.EXLFacetsDisplayMore').hide();
	$(".collection ol").children('.EXLFacetsDisplayLess').show();
};

if ($('.EXLSearchRefinementRemovefacet_rtype strong').attr('class') == 'EXLSearchRefinementfacet_rtype') {
  	$(".resource ol").children('.EXLAdditionalFacet').show();
  	$(".resource ol").children('.EXLFacetsDisplayMore').hide();
	$(".resource ol").children('.EXLFacetsDisplayLess').show();
};


// Facet Open Close






//	if($('#exlidAdvancedSearchRibbon fieldset div.EXLSearchFieldRibbonFormSubmitSearch').attr('class')){
//		var sbut = $('#exlidAdvancedSearchRibbon fieldset div.EXLSearchFieldRibbonFormSubmitSearch');
//		sbut.appendTo($('#exlidAdvancedSearchRibbon fieldset div.EXLSearchFieldRibbon'));
//	}


//showHideDetails();



	// RELINK DESIGNATED TABS TO EXTERNAL SERVICES

	$('a.EXLSearchTabLABELArticles').attr("href","http://xerxes.library.nd.edu/quicksearch/");
	$('a.EXLSearchTabLABELe-Journals').attr("href","http://www.library.nd.edu/eresources/find_journals/ejournals.php");
	$('a.EXLSearchTabLABELDatabases').attr("href","http://www.library.nd.edu/eresources/dbf/search.cgi?");















});
/*----------END OF DOCUMENT READY----------*/


$(window).ajaxComplete(function() {

	$("span.EXLButtonSendToLabel:contains('del.icio.us')").parent().parent().hide();
	$("span.EXLButtonSendToLabel:contains('Delicious')").parent().parent().hide();
	$("span.EXLButtonSendToLabel:contains('Connotea')").parent().parent().hide();
	fixReviews();
});





function getRSI(){
        // get the sign in url
        var u = $('.EXLSignOut a').attr('href');

	var reqmes = $('.EXLRequestSystemFeedback span').html();
	if(reqmes && u){
		// reqmes = reqmes.replace('sign-in', '<a href="' + u + '">sign-in</a>');
		// $('.EXLRequestSystemFeedback span').html(reqmes);
	}
        if(EXLTA_isFullDisplay()){
                var mess = '<b>We are currently experiencing problems with recall in the full view.  Please go back to the results screen to use recall for any specific record. <br /><br />We hope to have this problem resolved in a couple of weeks.  We appreciate your patience.</b>';
                $('.EXLRequestSystemFeedback span').replaceWith(mess);
        }

}

function checkTabPresence(rts, tabName){

	var det = false;

	if(rts.children(tabName).attr('class')){
		det = true;
	}

	return det;

}


function EXLTA_addTab(tabName,tabType,url,tabSelectorCopy,tabUrlReplace,tabUrlReplaceValue,firstTab,evaluator,evaluatorVar){
                $('.EXLResultTabs').each(function(){
                        var customTab = $('<li class="EXLResultTab '+tabType+'"><a href="'+url+'">'+tabName+'</a></li>');
                        var customTabContainer = $('<div class="EXLResultTabContainer '+tabType+'-Container"></div>');
                        if(!evaluator || (evaluator && evaluator($(this), evaluatorVar) == true)){
	                        var scu = $(this).parents('.EXLResult').find('.' + tabSelectorCopy + ' a').attr('href');
       		                if(scu){
                                	url = scu;
                                	url = url.replace('tabs='+tabUrlReplace, 'tabs='+tabUrlReplaceValue);
                       		}

		                if (firstTab){
                                                $(this).find('li').removeClass('EXLResultFirstTab');
                                                $(customTab).addClass('EXLResultFirstTab');
                                                $(this).prepend(customTab);
                                }else{
                                                $(this).find('li').removeClass('EXLResultLastTab');
                                                $(customTab).addClass('EXLResultLastTab');
                                                $(this).append(customTab);
               			 }

				//	$(this).parents('.EXLResult').find('.EXLSummary').append(customTabContainer);
				var result = $(this).parents('.EXLResult');

				if (!isFullDisplay()){//Solves full display bug where container isn't added to page.
					result = result.find('.EXLSummary');
				}
				result.append(customTabContainer);
                        }
                });
        $('.EXLSummary .'+tabType+'-Container').hide();
}


function msTabHandler(e,element,tabType,content,contentHandler,url,isSelected){
                e.preventDefault();
                if (isSelected){
                        EXLTA_closeTab(element);
                }else{
                        EXLTA_openTab(element,tabType, EXLTA_wrapResultsInNativeTab(element, content, url,'', false),true);
			contentHandler(element, tabType);
                }
}


function EXLTA_wrapResultsInNativeTab(element, content,url, headerContent, po){
        var popOut = '<div class="EXLTabHeaderContent">'+headerContent+'</div><div class="EXLTabHeaderButtons"><ul><li class="EXLTabHeaderButtonPopout"><span></span><a href="'+url+'" target="_blank"><img src="../images/icon_popout_tab.png" /></a></li><li></li><li class="EXLTabHeaderButtonCloseTabs"><a href="#" title="hide tabs"><img src="../images/icon_close_tabs.png" alt="hide tabs"></a></li></ul></div>';

        var popOut2 = '<div class="EXLTabHeaderContent">'+headerContent+'</div><div class="EXLTabHeaderButtons"><ul><li class="EXLTabHeaderButtonPopout"><span></span></li><li></li><li class="EXLTabHeaderButtonCloseTabs"><a href="#" title="hide tabs"><img src="../images/icon_close_tabs.png" alt="hide tabs"></a></li></ul></div>';
	if(!po){
		popOut = popOut2;
	}
        var header = '<div class="EXLTabHeader">'+ popOut +'</div>';
        var htmlcontent = '';
        if (typeof(content)=='function'){
                log('trying function');
                htmlcontent = content(element);
        }else{
                htmlcontent = content;
        }
        var body = '<div class="EXLTabContent">'+htmlcontent+'</div>';
        return header + body;
}

function EXLTA_closeTab(element){
        if(!EXLTA_isFullDisplay()){
                $(element).parents('.EXLResultTab').removeClass('EXLResultSelectedTab');
                $(element).parents('.EXLTabsRibbon').addClass('EXLTabsRibbonClosed');
                $(element).parents('.EXLResult').find('.EXLResultTabContainer').hide();
        }
}

function EXLTA_openTab(element,tabType, content, reentrant){
        $(element).parents('.EXLTabsRibbon').removeClass('EXLTabsRibbonClosed');
        $(element).parents('.EXLResultTab').siblings().removeClass('EXLResultSelectedTab').end().addClass('EXLResultSelectedTab');
        var container = $(element).parents('.EXLResult').find('.EXLResultTabContainer').hide().end().find('.'+tabType+'-Container').show();
        if (content && !(reentrant && $(container).attr('loaded'))){
                $(container).html(content);
                if(reentrant){
                        $(container).attr('loaded','true');
                }
        }
        return container;
}

function EXLTA_isFullDisplay(){
	return $('.EXLFullView').size() > 0;
}

function getLocations(element, tabType){
      var dn = EXLTA_recordId(element);
      var resp = '';
      var ddud = 'pnxId=' + dn + '&primary=ndu_aleph';
      var ddui = '/primo_library/libweb/tiles/local/location.jsp';
      $.ajax({type: "get", url: ddui, dataType: "html", data: ddud,  success: function(data){
		        var p = $(element).parents('.EXLResult').find('.'+tabType+'-Container').children('.EXLTabContent').children('#ndLocation');
			$(p).removeClass();
			$(p).html(data);
		}



	});


}

function EXLTA_recordId(element){
        return $(element).parents('.EXLResult').find('.EXLResultRecordId').attr('id');
}


function fixReviews(){
	$('a[title="Post Your Review"]').each(function(){
		var reviewHtml = $(this).parent().html();
		reviewHtml = reviewHtml.replace(/new_review/,'new_malc_review');
		$(this).parent().html(reviewHtml);
	})
	$('.EXLReviewEditRatingSelect option[value=1]').before('<option value="0">&nbsp;</option>');
	$('.EXLReviewEditRatingSelect option[value=0]').attr("selected","selected");
	$('#displayReviewWriter').hide();
	//$('#displayReviewWriter).attr("checked","checked");
}


function new_malc_review(id)
        {
                var parentWrite = $('#tagsReviews'+id).find('.EXLReviewsContent');
                //var writeForm = $(parentWrite).find('#writeRev'+id).get(0);
                //$(writeForm).css("display","none");
                $(parentWrite).css("display","none");
                var tagParent = $('#tagsReviews'+id).find('.EXLTagsContainer');
                $(tagParent ).css("display","none");
                var revForm = $('#tagsReviews'+id).find('#review_form'+id).get(0);
                $(revForm).css("display","block");
                $('#tagsReviews'+id).find('#review_text'+id).val('');
                $('#tagsReviews'+id).find('#executeMode').val('1');
                $('#tagsReviews'+id).find('#rateReview'+id).val('0');
                $('#tagsReviews'+id).find('#displayReviewWriter').attr('checked', true);
                $('#tagsReviews'+id).find('#agree04'+id).attr('checked', false);

		$('#tagsReviews'+id).find('#exlidReviewFormSubmit').removeAttr('onclick');
		$('#tagsReviews'+id).find('#exlidReviewFormSubmit').click(function(){
			if ( $(this).parent().parent().parent().find('select option:selected').val() == 0 ) {
				alert ('Please select a rating.');
				return false;
			}
			else {
				return edit_save(id);
			}
        	});
        }





/* Show/Hide function for long fields in full display */
function showHideDetails(){
	if($('.EXLDetailsContent').html()){
		alert('worked');
	}
    // Set variables to identify the fields
        var contrib = $('div.EXLDetailsContent ul li strong:contains("Contributor")').parent()
		//alert (contrib);
        var subjects = $('div.EXLDetailsContent ul li strong:contains("Subjects")').parent()
		//alert (subjects);
        var desc = $('div.EXLDetailsContent ul li strong:contains("Description")').parent()
		//alert (desc);

   // Set variables for show-hide links
        var authLink = '<li class="showHide toggleAuth" id="showAuth"><a href=#><span class="showOp">+</span> Show all contributors</a><li class="showHide toggleAuth" id="hideAuth" style="display:none"><a href=#><span class="showOp">-</span> Show fewer contributors</a>';

        var subLink = '<li class="showHide toggleSubj" id="showSub"><a href=#><span class="showOp">+</span> Show all subjects</a><li class="showHide toggleSubj" id="hideSub" style="display:none"><a href=#><span class="showOp">-</span>Show fewer subjects</a>';

        var descLink = '<li href=# class="showHide toggleDesc showDesc"><a href=#><span class="showOp">+</span> Show more</a><li href=# class="showHide toggleDesc hideDesc" style="display:none"><a href=#><span class="showOp">-</span> Show less</a>';


    // Process Contributors, if they exist

    if ( contrib.html() ) {
		//alert ('contributor');
        // Remove Semicolons between lines for contributors
                var contribHtml = contrib.html() ;
                contribHtml = contribHtml.replace(/;/g,'');
                contrib.html(contribHtml) ;

        // Check field size
                var numContrib = contrib.children('a').length;
		alert(numContrib);
	// Check for existing Show
		var showContrib = contrib.match(/Show/);
		alert(showContrib);
        // Hide excess contributors
                if ( numContrib > 3 ) {
                        contrib.children('a:gt(2)').hide();
                        contrib.children('br:gt(2)').hide();
                        contrib.after( authLink );
        }

        //Bind Contributor toggles
                $('#showAuth').live( "click",function(){
                        contrib.children('a:gt(2)').show() ;
                        contrib.children('br:gt(2)').show() ;
                        $('.toggleAuth').toggle();
                        return false
                } ) ;
                $('#hideAuth').live( "click",function(){
                        contrib.children('a:gt(2)').hide() ;
                        contrib.children('br:gt(2)').hide();
                        $('.toggleAuth').toggle();
                        return false
                });
    }  // End of Contributors

    // Process Subjects, if they exist

    if ( subjects.html() ) {
		//alert ('subjects');

        // Remove Semicolons between lines for subjects
                var subjHtml = subjects.html() ;
                subjHtml = subjHtml.replace(/;/g,'');
                subjects.html(subjHtml) ;

        // Check field size
                var numSubjects = subjects.children('a').length;

        // Hide Excess Subjects
                if (numSubjects > 3) {
                        subjects.children('a:gt(2)').hide();
                        subjects.children('br:gt(2)').hide();
                        subjects.after( subLink );
                }

        // Bind Subject Toggles
                $('#showSub').live( "click",function(){
                        subjects.children('a:gt(2)').show();
                        subjects.children('br:gt(2)').show();
                        $('.toggleSubj').toggle();
                        return false
                } ) ;
                $('#hideSub').live( "click",function(){
                        subjects.children('a:gt(2)').hide();
                        subjects.children('br:gt(2)').hide();
                        $('.toggleSubj').toggle();
                        return false
                } ) ;

    }   // End of Subjects

    // Process description, if it exists

    if (desc) {

        // Check Field Size
        var descLength = desc.html.length;
	var descCount = desc.children('br').length;
	//alert (descCount);

        // Hide excess Description

        if (descCount > 1) {
                descHtml = desc.html();
                descHtml = descHtml.replace(/<br>/,'<span id="descMore"><br>');
                descHtml = descHtml + '</span>'

                desc.html(descHtml);
                $('#descMore').hide();
                desc.after( descLink );
        }

        // Bind description toggles
                $('.showDesc').live( "click",function(){
                        $('#descMore').show();
                        $('.toggleDesc').toggle();
                        return false
                } ) ;
                $('.hideDesc').live( "click",function(){
                        $('#descMore').hide();
                        $('.toggleDesc').toggle();
                        return false
                } ) ;

    }   // End of description

} //END of Show/Hide function





