
$(document).ready(function(){


      $('.cbox').live('click', function(event){
		var xh;
                event.preventDefault();
                var ur = $(this).attr('href');
		var ht = '<div id="itoutter" style="width: 300px; height: 200px;"><img style="display: block; margin: auto; padding-top: 70px;" src="../images/local/loading_alt.gif" /></div>';
		var xh = ajHandle();
		$.colorbox({html:ht, onClosed:function(){ xh.abort(); }});
		performAj(xh, ur, "GET", "", "colorbox");

        });

       $('.mbox').live('click', function(event){
		event.preventDefault();
              	var dat = $(this).attr('value');
              	var it = $(this).attr('item');
              	var ur = $(this).attr('href');
              	var ht = '<div id="mps" style="width: 300px; height: 200px;"><img style="display: block; margin: auto; padding-top: 70px;" src="../images/local/loading_alt.gif" /></div>';
		var pdat = "xml=" + dat + "&item=" + it;
		var xh = ajHandle();
              	$.colorbox({html:ht, onClosed:function(){ xh.abort(); } });
		performAj(xh, ur, "POST", pdat, "colorbox");
 
                });


	var fd = EXLTA_isFullDisplay();

	$('.EXLResultTabs').each(
		function(){
			if(!$(this).children('.EXLLocationsTab').attr('class') && !$(this).children('.EXLViewOnlineTab').attr('class')){
			$(this).parent().parent().parent().children('.EXLSummaryContainer').children('.EXLSummaryFields').children('.EXLResultAvailability').html('');	

			}
		}	
	);

	$('.EXLReviewsTab').each(
		function(){
			var rt = $(this);
			var dn = EXLTA_recordId($(this));
			if(dn){
				var ddud = 'pnxId=' + dn;
				var ddui = '/primo_library/libweb/tiles/local/docdel.jsp';
				$.ajax({type: "get", url: ddui, dataType: "html", data: ddud,  success: function(data){
					var dre = /http/;
					if(data.match(dre)){
						rt.after('<li id="docDelUrl" class="EXLReviewsTab EXLResultTab">' + data + '</li>');
					}
					}});
                                var rud = 'pnxId=' + dn + '&institution=NDU';
                                var rui = '/primo_library/libweb/tiles/local/request.jsp';
                                $.ajax({type: "get", url: rui, dataType: "html", data: rud,  success: function(data){
					var dre = /<div id="requestable">yes<\/div>/;
                                        if(data.match(dre)){
						rt.siblings('.EXLRequestTab').show().css('list-style-type', 'none');	
                                       } 
	
                                        }});
                                var eud = 'pnxId='+ dn;
                                var eui = '/primo_library/libweb/tiles/local/export.jsp';
                                $.ajax({type: "get", url: eui, dataType: "html", data: eud,  success: function(data){
					if(!fd){
						if(rt.parents().parents().parents().siblings('.EXLSummaryContainer').children('.EXLResultFRBR').attr('class') == 'EXLResultFRBR'){
							rt.parents().parents().parents().siblings('.EXLSummaryContainer').children('.EXLResultFRBR').after(data);
						}else{	
							rt.parents().parents().parents().siblings('.EXLSummaryContainer').children('.EXLSummaryFields').after(data);
						}	
					}
					$('.NDExportList').css('float', 'right');
                                        }});


			}


		});
	

});

function EXLTA_recordId(element){
        return $(element).parents('.EXLResult').find('.EXLResultRecordId').attr('id');
}

function ajHandle(){

	var xmlhttp;

	if (window.XMLHttpRequest){
  		// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}else{
  		// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}

	return xmlhttp;

}

function performAj(xmlhttp, url, m, dat, type){

        xmlhttp.onreadystatechange=function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var dt = xmlhttp.responseText;
                        if(type == "colorbox"){
                                $.colorbox({html:dt, scrolling:false}); 
                        }
                }else if(xmlhttp.readyState==4 && xmlhttp.status != 200){
                        if(type == "colorbox"){
                               // setTimeout($.colorbox({html:xmlhttp.responseText}), 1000);
                        }
                }
        }
 
        if(m == 'POST'){
                xmlhttp.open("POST",url,true);
                xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlhttp.send(dat);
        }else{
                xmlhttp.open("GET",url + "&t=" + Math.random(),true);
		xmlhttp.send();
        }

}


