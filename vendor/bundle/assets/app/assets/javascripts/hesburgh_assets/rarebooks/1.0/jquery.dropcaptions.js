
/*
 * jQuery Drop Captions plugin
 * @author admin@catchmyfame.com - http://www.catchmyfame.com
 * @version 1.0.0
 * @date October 23, 2009
 * @category jQuery plugin
 * @copyright (c) 2009 admin@catchmyfame.com (www.catchmyfame.com)
 * @license CC Attribution-Share Alike 3.0 - http://creativecommons.org/licenses/by-sa/3.0/
 */

(function($){
	$.fn.extend({
		dropCaptions: function(options)
		{
			var defaults =
			{
				showSpeed : 500,
				hideSpeed: 500,
				showOpacity : .85,
				hideOpacity : 0,
				showEasing: 'swing',
				hideEasing: 'swing',
				showDelay: 0,
				hideDelay: 0
			};
			var options = $.extend(defaults, options);

    		return this.each(function() {
				var o=options;
				var obj = $(this);

				var caption = $(obj).attr('title'); // Get the text of the caption from the image's title attribute
				$(obj).wrap('<div class="captainer"></div>').before('<div class="caption">'+caption+'</div>').attr('title',''); // Create a wrapping div, caption div, and remove the title from the image
				$(obj).parents('div.captainer').width($(obj).width()+parseInt($(obj).css('paddingLeft'))+parseInt($(obj).css('paddingRight'))+parseInt($(obj).css('borderLeftWidth'))+parseInt($(obj).css('borderRightWidth'))).css('float',$(obj).css('float')); // Copy the image's width (+ border) and float to the wrapper div

				$('.captainer').css({'position':'relative'}); // Set the wrapper div's position
				$('.caption').css({'position':'absolute','bottom':'0'}); // set the caption div's position
				$(obj).css({'position':'relative'});	// Set the image's position
				$(obj).parents('div.captainer').css({'margin':$(obj).css('margin-top')+' '+$(obj).css('margin-right')+' '+$(obj).css('margin-bottom')+' '+$(obj).css('margin-left')});	// Move the margin from the image to the wrapper div
				$(obj).css('margin','0');

				var moveAmount = parseInt($(obj).prev('div.caption').height()) + parseInt($(obj).prev('div.caption').css('paddingTop')) + parseInt($(obj).prev('div.caption').css('paddingBottom'));
				$(obj).bind('mouseover', function(){
					setTimeout(function(){$(obj).prev('div.caption').stop().animate({marginBottom:'-'+moveAmount +'px',opacity:o.showOpacity},o.showSpeed,o.showEasing)},o.showDelay);
				});
				$(obj).bind('mouseout', function(){
					setTimeout(function(){$(obj).prev('div.caption').animate({marginBottom:'0px',opacity:o.hideOpacity},o.hideSpeed,o.hideEasing)},o.hideDelay);
				});
				$('.caption').css({'opacity':o.hideOpacity});
  			});
    	}
	});
})(jQuery);
