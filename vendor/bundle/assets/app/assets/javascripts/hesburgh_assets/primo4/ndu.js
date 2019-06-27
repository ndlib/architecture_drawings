
$(document).ready(function(){

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
            rt.after('<li id="docDelUrl" class="EXLResultTab">' + data + '</li>');
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
        if (!fd) {
          var eud = 'pnxId='+ dn;
          var eui = '/primo_library/libweb/tiles/local/export.jsp';
          $.ajax({type: "get", url: eui, dataType: "html", data: eud,  success: function(data){
            var summaryContainer = rt.parents('.EXLSummary').children('.EXLSummaryContainer');
            summaryContainer.append(data);
          }});
        }


      }


    });



});


function EXLTA_recordId(element){
  return $(element).parents('.EXLResult').find('.EXLResultRecordId').attr('id');
}
