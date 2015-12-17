jQuery(document).ready(function(){
	jQuery('.content .col3').each(function()
	{
			var img = jQuery(this).find('.imgHover') ,
				anc = jQuery(this).find('.button a');
			jQuery(anc).hover(function(){
				img.stop().animate({
					marginTop : '-20px'
				} , {duration: 50});
			} , function(){
				img.stop().animate({
					marginTop : '0px'
				} , {duration: 50});
			});		
	});
});
