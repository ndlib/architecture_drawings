$(document).ready(function(){

function checkWindowSize() {

    if ( $(window).width() < 480 ) {
        $("#accordion").accordion({header: "h3", active: false,  collapsible: true});
    }
    else {
        var container = $('.sections');
      if(container.html() != null){
    	var html = container.html().split('</div>');
    	container.html("");
    	for(var i in html)
    	{
        if($.trim(html[i]))
            container.append("<div class='box'>"+html[i]+"</div>");
    	}
      }
    }

}
$(window).load(checkWindowSize);
			$('#nav').mobileMenu();
			//$("#accordion").accordion({header: "h3", active: false,  collapsible: true});


var pathnameArr = window.location.pathname.split('/');
	switch (pathnameArr[1]) {
    case 'collections':
        $('#body').addClass('collections');
		$('.submenu').load('/ssi/collections.shtml');
		break;
    case 'using':
        $('#body').addClass('using');
		$('.submenu').load('/ssi/using.shtml');
		break;
	case 'finding':
        $('#body').addClass('finding');
		$('.submenu').load('/ssi/finding.shtml');
		break;
	case 'digital':
        $('#body').addClass('digital');
		$('.submenu').load('/ssi/digital.shtml');
		break;
	case 'exhibits':
        $('#body').addClass('exhibits');
		$('.submenu').load('/ssi/exhibits.shtml');
		break;
	}


});
