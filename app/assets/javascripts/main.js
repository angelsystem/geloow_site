jQuery.each(jQuery.browser, function(i, val) {
	if(i=="msie" && jQuery.browser.version.substr(0,1)=="6"){
		jQuery('body').html('This site has not been tested for Internet Explorer yet. Please download <a href="http://firefox.com">Mozilla Firefox</a> or <a href="http://google.com/chrome">Google Chrome</a>');
	}
});

$(document).ready(function(){

	$('.switch a').click(function(e){
		e.preventDefault();
	});

	if($('.switch').is(':animated')){
			return false;
		}
		if($('.topNav').length){
			fadeInSide('left', 1);
		}else{
			if($('.left-nav .switch').hasClass('off')){
				fadeInTop('right', 1);
			}else{
				fadeInTop('left', 1);
			}
		}


	$('.left-nav .switch, .right-nav .switch').click(function(e){
		if($('.switch li').is(':animated')){
			return false;
		}
		var pageNav = $('.pageScroll');
		var thisButton;
		if($(this).parent().attr('class').indexOf('left') == 0){
			thisButton = 'left'
		}else{
			thisButton = 'right'
		}
		if($('.topNav').length){
			if(thisButton == 'left'){
				fadeInSide('left');
			}else{
				fadeInSide('right');
			}
		}else{
			if(thisButton == 'left'){
				toggleSwitch($('.left-nav .switch'));
				toggleSwitch($('.right-nav .switch'), 200);
			}else{
				toggleSwitch($('.left-nav .switch'), 200);
				toggleSwitch($('.right-nav .switch'));
			}
		}
		if(pageNav.hasClass('left')){
			pageNav.fadeOut(200, function(){
				pageNav.removeClass('left');
				pageNav.addClass('right');
				pageNav.fadeIn(200);
			});
		}else{
			pageNav.fadeOut(200, function(){
				pageNav.removeClass('right');
				pageNav.addClass('left');
				pageNav.fadeIn(200);
			});
		}			
	});

	$('.next-prev .switch').click(function(e){
		if($('.switch').is(':animated')){
			return false;
		}
		var nextPrev = $('#controls');
		if(nextPrev.css('display') != 'none'){
			nextPrev.fadeOut(200, function(){
				toggleSwitch($('.next-prev .switch'));
			});
		}else{
			nextPrev.fadeIn(200, function(){
				toggleSwitch($('.next-prev .switch'));
			});
		}
	});

	$('.top-nav .switch').click(function(e){
		if($('.switch').is(':animated')){
			return false;
		}
		if($('.topNav').length){
			fadeInSide('left', 1);
		}else{
			if($('.left-nav .switch').hasClass('off')){
				fadeInTop('right', 1);
			}else{
				fadeInTop('left', 1);
			}
		}
	});
	
	if($(window).width() < 1300){
		setTimeout(function(){ $(".switch:eq(2)").trigger('click'); }, 200);
	}
	
	$('.downloadToggle li').hide();
	
	$('.downloadToggle li.download').fadeIn(800);
	
	$('.get-feedback, .get-download').click(function(e){
		if($('.downloadToggle li').is(':animated')){
			return false;
		}
		var myButton = $(this);
		myButton.fadeOut(200);
		e.preventDefault();
		var secs = $('.downloadToggle li');
		if(secs.eq(0).css('display') != 'none'){
			secs.eq(0).animate({
				paddingTop: '600px'
			}, 200, function(){
				secs.eq(1).fadeIn(1500);
				secs.eq(0).hide();
				secs.eq(0).css('padding-top', '85px');
				myButton.show();
			});
		}else{
			secs.eq(1).animate({
				paddingTop: '600px'
			}, 200, function(){
				secs.eq(0).fadeIn(1500);
				secs.eq(1).hide();
				secs.eq(1).css('padding-top', '0');
				myButton.show();
			});
		}
	});
	
	$('.tabs li.tab').eq(0).show();
	$('.tabLinks li').eq(0).addClass('active');
	
	$('.tabLinks li a').each(function(index){
		var myAnchor = $(this);
		myAnchor.click(function(e){
			e.preventDefault();
			var tabs = $('.tabs li.tab');
			var myTab = tabs.eq(index);
			$('.tabLinks li').removeClass('active');
			tabs.hide();
			setTimeout(function(){ myTab.fadeIn(200) }, 200);
			myAnchor.parent('li').addClass('active');
		});
	});
	
	$.fn.cleardefault = function() {
		return this.focus(function() {
		   if( this.value == this.defaultValue ) {
		       this.value = "";
		   }
		}).blur(function() {
		   if( !this.value.length ) {
		       this.value = this.defaultValue;
		   }
		});
	}
	
	$("input[type=text], textarea").cleardefault();
	
		$('#feedbackForm').live('submit', function(){
		
			var action = $(this).attr('action');
			
			$.post(action, { 
				fname: $('#fname').val(),
				femail: $('#femail').val(),
				ffeedback: $('#ffeedback').val(),
				subject2: $('#subject2').val()
			},
				function(data){
					$('li.feedback h2').html(data); 
					if(data.match('Success! Feedback sent.') != null) {
						$('#fname, #femail, #ffeedback').removeAttr('value');
						$('#feedbackForm').unbind('submit').removeAttr('action').removeAttr('method');
						$('#feedbackForm input[type=image]').click(function(e){
							e.preventDefault();
							return false;
						});
					}
				}
			);
			
			return false; 
		
		});
		
			$('#downloadForm').live('submit', function(){

				var action = $(this).attr('action');

				$.post(action, { 
					email: $('#email').val(),
					subject: $('#subject').val()
				},
					function(data){
						$('li.download h2').html(data); 
						if(data.match('Check Your Email For The Plugin') != null) {
							$('#email').removeAttr('value');
							$('#downloadForm').unbind('submit').removeAttr('action').removeAttr('method');
							$('#downloadForm input[type=image]').click(function(e){
								e.preventDefault();
								return false;
							});
						}
					}
				);

				return false; 

			});
			
			$('#wordpressForm').live('submit', function(){

				var action = $(this).attr('action');

				$.post(action, { 
					email: $('#emailWordpress').val(),
					subject: $('#address').val()
				},
					function(data){
						$('#wordpressForm h4').html(data); 
						if(data.match('Thank You For Subscribing!') != null) {
							$('#emailWordpress').removeAttr('value');
							$('#wordpressForm').unbind('submit').removeAttr('action').removeAttr('method');
							$('#wordpressForm input[type=submit]').click(function(e){
								e.preventDefault();
								return false;
							});
						}
					}
				);

				return false; 

			});
			
			$('#html5 a').click(function(e){
				e.preventDefault();
				$('.tab.html4').fadeOut(600, function(){
					$('.tab.html5').fadeIn(600);
				});
			});

			$('#html4 a').click(function(e){
				e.preventDefault();
				$('.tab.html5').fadeOut(600, function(){
					$('.tab.html4').fadeIn(600);
				});
			});
			
			$("pre.js").snippet("javascript",{style:"ide-codewarrior",showNum:false});			

});

function toggleSwitch(toggler, delayTime){
	var toggleButton = $('li', toggler);
	if(!delayTime){
		delayTime = 0;
	}
	if(toggler.hasClass('off')){
		toggleButton.delay(delayTime).animate({
			left: '50px'
		}, 200)
		toggler.removeClass('off');
	}else{
		toggleButton.delay(delayTime).animate({
			left: 0	
		}, 200)
		toggler.addClass('off');
	}	
}

function fadeInSide(direction, top){
	var topNav = $('.topNav');
	var nav = $('ul', topNav);
	$('.colors', topNav).remove();
	topNav.fadeOut(200, function(){
		nav.unwrap();
		var newClass = 'pageScroll '+direction;
		nav.addClass(newClass);
		var navis = $('li', nav);
		for(i=0;i<navis.length;i++){
			var naviClass = 'scrollNav scrollNav_'+(i+1);
			navis.eq(i).attr('class', naviClass);
		}
		$('#main').animate({ marginTop: '0'}, 200);
		pageScroller.options.scrollOffset = 0;
		nav.fadeIn(200);
	});
	if(top){
		toggleSwitch($('.top-nav .switch'));
		if(direction == 'left'){
			toggleSwitch($('.left-nav .switch'), 200);
		}else{	
			toggleSwitch($('.right-nav .switch'), 200);
		}
	}else{
		toggleSwitch($('.top-nav .switch'), 200);
		if(direction == 'left'){
			toggleSwitch($('.left-nav .switch'));
		}else{	
			toggleSwitch($('.right-nav .switch'));
		}
	}
	setTimeout(function(){ $('li', nav).eq(0).addClass('active') }, 250);
}

function fadeInTop(direction, top){
	var nav = $('.pageScroll');
	var navis = $('li', nav);
	nav.fadeOut(200, function(){
		nav.removeAttr('class').wrap('<div class="topNav"></div>');
		for(i=0;i<navis.length;i++){
			var naviClass = 'topNavLink topNavLink_'+(i+1);
			navis.eq(i).attr('class', naviClass)
		}
		$('#main').animate({ marginTop: '65px'}, 200);
		pageScroller.goTo(1);
		if(!$('.colors', nav).length){			
			var myColor = $('.colors');
			var mySpans = $('span', myColor);
			var topNav = $('.topNav');
			mySpans.click(function(){
				if(myColor.hasClass('white')){
					topNav.removeClass('white').addClass('dark');
					myColor.removeClass('white').addClass('dark');
				}else{
					topNav.removeClass('dark').addClass('white');
					myColor.removeClass('dark').addClass('white');
				}
			});
		}
		pageScroller.options.scrollOffset = 50;
		nav.fadeIn(200);
	});
	if(top){
		toggleSwitch($('.top-nav .switch'));
		if(direction == 'left'){
			toggleSwitch($('.left-nav .switch'), 200);
		}else{
			toggleSwitch($('.right-nav .switch'), 200);
		}
	}else{
		toggleSwitch($('.top-nav .switch'));
		if(direction == 'left'){
			toggleSwitch($('.left-nav .switch'), 200);
		}else{
			toggleSwitch($('.right-nav .switch'), 200);
		}
	}
	navis.eq(0).addClass('active');
	setTimeout(function(){ $('li', nav).eq(0).addClass('active') }, 250);
}