$(document).ready(function(){
		
		// instantiate page scroller plugin		
		
		var navLabel = new Array('Inicio', 'Que hacemos', "Como Trabajamos", 'Postafo', 'Download Plugin');
		
		
		$('#main').pageScroller({
		    animationSpeed: 1000,
		    scrollOffset: 0,
		    navigation: navLabel		    
		});
		
		/*	AVAILABLE OPTIONS:
		 *	currentSection 				starting position
		 *	sectionClass				class of each section
		 *	navigationClass 			navigation element class
		 *	scrollOffset				offset target area from top of section
		 *	animationSpeed	 			change duration of animation in miliseconds
		 *	animationBefore 		 	callback: assign a function before animation
		 *	animationComplete 	 		callback: assign a function after animation
		 *	onChange					callback: assign a function for when section changes
		*/		
		
		// assigns "next" API function to button
		
		$('.next').click(function(e){
			e.preventDefault();
			pageScroller.next();
		});
		
		//assigns "prev" API function to button	
			
		$('.prev').click(function(e){
			e.preventDefault();
			pageScroller.prev();
		});
		
		$('.jumpTo').click(function(e){
			e.preventDefault();
			pageScroller.goTo(4);
		});
					
	});