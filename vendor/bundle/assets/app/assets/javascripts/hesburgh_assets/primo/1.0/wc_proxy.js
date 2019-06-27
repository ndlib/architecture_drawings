//Javascript to perform metadata lookups
//Robin Schaaf, 1/9/2013


$(document).ready(function() {

       $('.EXLSummary').each(function(){
           var summary = $(this);
           var dn = EXLTA_recordId($(this));
	   var lookupPNX = "";
		
           if((dn) && (dn.substring(0, 2) == 'TN')){
		var sdn = dn.substring(3);

                var rud = 'recordId=' + sdn + '&issn=&isbn=&year=&institution=ndu01pub';
                var rui = '/primo_library/libweb/tiles/local/wc_proxy.jsp';

                $.ajax({type: "get", url: rui, dataType: "text", data: rud,  success: function(data){
			var pnxResult = data.replace(/\n/g,"");

			if (pnxResult.indexOf(":") >=0){
        			pnxArray = pnxResult.split(":");
				lookupPNX = pnxArray[0];
			}else{
				lookupPNX = pnxResult;
			}

			if (lookupPNX != ''){

        			EXLTA_addTab_TN(summary, 'Locations','NewTNLocationTab',location.href,'EXLDetailsTab','detailsTab','newLocationsTab',true);

        			
      				if (EXLTA_isFullDisplay()){
					summary.parents('.EXLResultsList').find('.EXLResultRecordId').attr('lookup-id', lookupPNX);
				}else{
        				summary.parents('.EXLResult').find('.EXLResultRecordId').attr('lookup-id', lookupPNX);
				}

				//Add request tab after locations tab
                                var rrud = 'pnxId=' + lookupPNX + '&institution=NDU';
                                var rrui = '/primo_library/libweb/tiles/local/request.jsp';
                                $.ajax({type: "get", url: rrui, dataType: "html", data: rrud,  success: function(req){
                                        var dre = /<div id="requestable">yes<\/div>/;
                                        if(req.match(dre)){
						//add this tab!
        					EXLTA_addTab_TN(summary, 'Request','NewTNRequestTab',location.href,'EXLDetailsTab','detailsTab','requestTab',false,'NewTNLocationTab');
                                        }else{ //not requestable so we add a docdel link if also not available online
						var re = new RegExp("FindText");
                				var ft = re.test($(summary).find('.EXLViewOnlineTab').html());
						
						//make sure there's a findtext link
						if(ft){
							var dd_href = $(summary).find('.EXLViewOnlineTab a').attr('href');
                       					var dd_params = dd_href.substring( dd_href.indexOf('?') + 1 );
							var ddui = '/primo_library/libweb/tiles/local/docdel_openurl.jsp';
                					$.ajax({type: "get", url: ddui, dataType: "html", data: dd_params,  success: function(data){
                	          				var dre = /http/;
                 	         				if(data.match(dre)){
                  		              				$(summary).find('.EXLResultTabs').parents('.EXLResult').find('.EXLReviewsTab').after('<li id="docDelUrl" class="EXLResultTab">' + data + '</li>');
                 	         				}
                					}}); 

						}

					}

                                }});
			}


                
			//For Doc Delivery/ILL tab
			var re = new RegExp("FindText");
                	var ft = re.test($(summary).find('.EXLViewOnlineTab').html());

			var lt = $(summary).find('.EXLResultTabs').find('.NewTNLocationTab');

			//if there's a findtext menu (not available online)
			// If there's no location tab or pnx it means we don't have it in print
			if ((ft) && (lt.length == "0") && (lookupPNX == "")){
				var dd_href = $(summary).find('.EXLViewOnlineTab a').attr('href');
                       		var dd_params = dd_href.substring( dd_href.indexOf('?') + 1 );
               			var ddui = '/primo_library/libweb/tiles/local/ill_request.jsp';
	
                		$.ajax({type: "get", url: ddui, dataType: "html", data: dd_params,  success: function(data){
                	          var dre = /http/;
                 	         	if(data.match(dre)){
                  		              	$(summary).find('.EXLResultTabs').parents('.EXLResult').find('.EXLReviewsTab').after('<li id="docDelUrl" class="EXLResultTab">' + data + '</li>');
                 	         	}
                		}}); 
			}
                 }});
           }





       });

       $('.NewTNLocationTab a').live("click", function(e){
       		msTabHandler(e, this, 'NewTNLocationTab', '<div id="ndLocation" class="EXLTabLoading"></div>',getTNLocations,location.href, $(this).parents('.EXLResultTab').hasClass('EXLResultSelectedTab'), 'true');
       });

       $('.NewTNRequestTab a').live("click", function(e){
       		msTabHandler(e, this, 'NewTNRequestTab', '<div id="ndRequest" class="EXLTabLoading"></div>',getTNRequest,location.href, $(this).parents('.EXLResultTab').hasClass('EXLResultSelectedTab'), 'false');
       });
});


function msTabHandler(e,element,tabType,content,contentHandler,url,isSelected, showHeader){
                e.preventDefault();
                if (isSelected){
                        EXLTA_closeTab(element);
                }else{
                        //EXLTA_openTab(element,tabType, EXLTA_wrapResultsInNativeTab(element, content, url,'', false),true);
                        EXLTA_openTab(element,tabType, EXLTA_wrapResultsInNativeTab(element, content, url,'', false, showHeader),true);
                       contentHandler(element, tabType, url);
                }
}


function EXLTA_wrapResultsInNativeTab(element, content,url, headerContent, po, showHeader){
        var popOut = '<div class="EXLTabHeaderContent">'+headerContent+'</div><div class="EXLTabHeaderButtons"><ul><li class="EXLTabHeaderButtonPopout"><span></span><a href="'+url+'" target="_blank"><img src="../images/icon_popout_tab.png" /></a></li><li></li><li class="EXLTabHeaderButtonCloseTabs"><a href="#" title="hide tabs"><img src="../images/icon_close_tabs.png" alt="hide tabs"></a></li></ul></div>';

        var popOut2 = '<div class="EXLTabHeaderContent">'+headerContent+'</div><div class="EXLTabHeaderButtons"><ul><li class="EXLTabHeaderButtonPopout"><span></span></li><li></li><li class="EXLTabHeaderButtonCloseTabs"><a href="#" title="hide tabs"><img src="../images/icon_close_tabs.png" alt="hide tabs"></a></li></ul></div>';
        if(!po){
                popOut = popOut2;
        }


        var header = '<div class="EXLTabHeader">'+ popOut +'</div>';
        var htmlcontent = '';
        if (typeof(content)=='function'){
                console.log('trying function');
                htmlcontent = content(element);
        }else{
                htmlcontent = content;
        }

        var body = '<div class="EXLTabContent">'+htmlcontent+'</div>';

	if(showHeader=='false'){
		return body;
	}else{
        	return header + body;
	}
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



function getTNLocations(element, tabType, url){
      var pnxId = EXLTA_lookupRecordId(element);
      var tn_pnxId = EXLTA_recordId(element);
      var resp = '';
      var ddud = 'pnxId=' + pnxId + '&tn_pnxId=' + tn_pnxId + '&primary=ndu_aleph';
      var ddui = '/primo_library/libweb/tiles/local/location.jsp';
      $.ajax({type: "get", url: ddui, dataType: "html", data: ddud,  success: function(data){

           var p = $(element).parents('.EXLResult').find('.'+tabType+'-Container').children('.EXLTabContent').children('#ndLocation');
           $(p).removeClass();
           $(p).html(data);
	   }
        });
}

function getTNRequest(element, tabType){

      var dn = EXLTA_lookupRecordId(element);
      var pnx = EXLTA_recordId(element);

      pnx = pnx.replace(/\//g,'%2f');

      var re = new RegExp(pnx,"g");

      var url = $(element).parents('.EXLSummary').find('.EXLTabsRibbon').find('.EXLResultTabs').find('.EXLDetailsTab').find('a').attr('href');

      if (!EXLTA_isFullDisplay()){
           var rui = url.replace(re,dn).replace('detailsTab','requestTab').replace('poppedOut','prefetchXml').replace('full','brief');
      }else{
           var rui = url.replace(re,dn).replace('display.do','expand.do').replace('detailsTab','requestTab').replace('poppedOut','prefetchXml').replace('indx=1','indx=2').replace('recIdxs=0','recIdxs=1').replace('dscnt=1','dscnt=0');
      rui = rui + '&gathStatTab=true';

      }

      $.ajax({type: "get", url: rui, dataType: "html",  success: function(data){

           var p = $(element).parents('.EXLResult').find('.'+tabType+'-Container').children('.EXLTabContent').children('#ndRequest');
           $(p).removeClass();
           $(p).html(data);
	   }
        });

}


function EXLTA_recordId(element){
	var rid = $(element).parents('.EXLResult').find('.EXLResultRecordId').attr('id');

	if (rid){
       		return rid; 
	}else{
		return $(element).parents('.EXLResultsList').find('.EXLResultRecordId').attr('id');
	}
}

function EXLTA_lookupRecordId(element){
	var pnxResult;
	var lookup=$(element).parents('.EXLResult').find('.EXLResultRecordId').attr('lookup-id');

	if (lookup === undefined){
		lookup=$(element).parents('.EXLResultsList').find('.EXLResultRecordId').attr('lookup-id');
	}

	if (lookup.indexOf(":") >=0){
        	pnxResult = lookup.split(":");
	}else{
		pnxResult = lookup;
	}

        return pnxResult;
}


function EXLTA_addTab_TN(summaryElement, tabName,tabType,url,tabSelectorCopy,tabUrlReplace,tabUrlReplaceValue,firstTab,appendAfter,evaluator,evaluatorVar){
	var element=summaryElement.find('.EXLResultTabs');
        var customTab = $('<li class="EXLResultTab '+tabType+'"><a href="'+url+'">'+tabName+'</a></li>');
        var customTabContainer = $('<div class="EXLResultTabContainer '+tabType+'-Container"></div>');
        if(!evaluator || (evaluator && evaluator(element, evaluatorVar) == true)){
                 var scu = $(element).parents('.EXLResult').find('.' + tabSelectorCopy + ' a').attr('href');
                 if(scu){
                         url = scu;
                         url = url.replace('tabs='+tabUrlReplace, 'tabs='+tabUrlReplaceValue);
                 }
                 if (firstTab){
                                 $(element).find('li').removeClass('EXLResultFirstTab');
                                 $(element).addClass('EXLResultFirstTab');
                                 $(element).prepend(customTab);
                 }else{
                                 $(element).parents('.EXLResult').find('.' + appendAfter).after(customTab);
                  }

                 var result = $(element).parents('.EXLResult');

                 if (!EXLTA_isFullDisplay()){//Solves full display bug where container isn't added to page.
                         result = result.find('.EXLSummary');
                 }
                 result.append(customTabContainer);
         }

        $('.EXLSummary .'+tabType+'-Container').hide();
}


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




