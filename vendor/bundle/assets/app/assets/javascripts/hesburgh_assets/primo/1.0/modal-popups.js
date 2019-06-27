$(document).ready(function(){

  $('.cbox').live('click', function(event){
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

});

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
  };

  if(m == 'POST'){
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(dat);
  }else{
    xmlhttp.open("GET",url + "&t=" + Math.random(),true);
    xmlhttp.send();
  }
}
