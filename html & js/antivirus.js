$(document).ready(function () {
	//Reduce navbar size and add sidemenu on scroll
  $(window).scroll(function(){

    if ($(document).scrollTop() > 50){
      $(".navbar").addClass("smallNavbar");
      $("#sideMenu").fadeIn();
    }
    else {
      $(".navbar").removeClass("smallNavbar");
      $("#sideMenu").fadeOut();
    }});


  //Set up anchor smooth scroll
  $('#sideMenu a[href^="#"]').on('click', function(event){

  	//get target location 
    var target = $(this.getAttribute('href'));

    //prevent insta relocation, and add animation
    if( target.length ) {
        event.preventDefault();
        
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 60
        }, 1000);
    }});


  //Add highlight class on sidemenu items when you scroll in their area
  function sideHighlight(){
  	let scrollPosition = $(document).scrollTop();

  	$("#sideMenu a").each(function(){

  		let currElement = $(this),
  		 		currTarget = $(currElement.attr("href")),
  		 		targetTopDistance = currTarget.position().top,
  		 		targetHeight = currTarget.height(),
  		 		navbarHeight = $(".navbar-fixed-top").height();
  		
  		//If the current position is within this element, activate it else remove the active class from it
  		if(targetTopDistance - navbarHeight - 1<= scrollPosition && (targetTopDistance + targetHeight - navbarHeight) > scrollPosition){
  			$("#sideMenu a").removeClass("highlight");
  			currElement.addClass("highlight");
  		}
  		else{
  			currElement.removeClass("highlight");
  		}
  	});
  }


  //Set fixed height for the slider(equal to the height of it's tallest element)
  function sliderHeight(){
	  let heightArray = [];

	  $("#slider .item").each(function(){
	  	heightArray.push($(this).height());
	  });
	  
	  let highest = Math.max(...heightArray);

	  //set every element's height to "highest"
	  $("#slider .item").each(function(){
	  	$(this).css("height",highest + "px");
	  });
  }


  //Increase brightness when a button is hovered
	function colorChange(direction,button){
		
	  let currentColor = ($(button).css("background-color"));
		let findColorValue = new RegExp(/\d+/,'g');
		let colors = currentColor.match(findColorValue);
		
		colors.forEach((element,index,arr) => {
	    if(direction === "enter"){
	      arr[index] = arr[index] <= 205 ? parseInt(arr[index]) + 50 : 255;
	    }
	    else{
	      arr[index] = arr[index] >= 50 ? parseInt(arr[index]) - 50 : 0;
	    }
	  });
			
		var someClass = {"background-color" : `rgb(${colors[0]},${colors[1]},${colors[2]})`};
	    
		$(button).css(someClass);
	}

	
  //Set all functions
  sliderHeight();
	$(document).on('scroll',sideHighlight);
	$("button").on("mouseover",function(){colorChange("enter",this);});
	$("button").on("mouseleave",function(){colorChange("leave",this);});
});