$(document).ready(function(){
	/**
		current user informations
	*/

	console.log("Classement");

	var firstTrial = true;

	var currentUser = {
		name : null,
		email : null,
		url : null,
		date : null,
		serie : null,
		result : null,
	}
   
    var data = {},
    	stageWidth = 400, // 400
		stageHeight = 280, // 360
		colorOrder = [],
		points = [],
		order = [],
		$colorList = $("#list-normal"),
		$btnPrint = $(".btn-print"),
		colorListItems = "",
		result = {},
		sortable = false,
		key, choice,
		types = {
        	"succeed" : "Aucun",
        	"protan" : "Protane (Rouge - bleu vert)",
        	"deutan" : "Deutan (Vert - rouge pourpre)",
        	"tritan" : "Tritane (Violet - jaune vert)",
        },
    	buildTest = function(callback){
	    	$.getJSON("ui/data/data.json", function(result){

	    		data = result;

	    		console.log(data)

				colorOrder = data.colors; //shuffleArray(data.colors);

				drawDom();

				$('#choices .pick').shuffle();
				$('#choices .pick').each(function(i, k){
					$(this).find("a").text(i + 1);
				});

				commands();

				$(window).trigger('resize');
				if(callback) {
					callback();	
				}
			})
    	},


		updateOrder = function(){
			console.log("updateOrder")
			order = [];
			$colorList.find("li").each(function () {
				if($(this).data("item") !== undefined){
					order.push(parseInt($(this).data("item")))
				}
			})
			order[0] = "P";
			$(".currentOrder").html(order.join(" - "));

			order[0] = 0;
			colorOrder = orderArray(data.colors, order);

				console.log( sortable )
				
			if(sortable) {
				
				// http://ma.rkusa.st/touch-dnd/sortable.html
				$('#list-normal').addClass("sortable").sortable({ 
					disabled: false,
					cancel: '.ignore',
					unmove : '.ignore',
					constraint : 'x',
					updateHandler: function(item, index){
						return true;
					}
				})
				.on('sortable:start', function(el, ui) {
					ui.item.addClass("dragging");
				})
				.on('sortable:stop', function(el, ui) {
					ui.item.removeClass("dragging");
					updateOrder();
				})

				$(".color-item").first().addClass("pilot ignore"); 

			} else {
				$("#list-normal").removeClass("sortable").sortable({ disabled: true });
				$(".color-item").first().removeClass("pilot ignore");
			}

			$(window).trigger('resize');
			result = new MomentOfInertia(colorOrder);
		},


		drawDom = function(){
			console.log("drawDom")
			$colorList.empty();

			for(key = 0; key < colorOrder.length; key++){
				colorListItems = $("<li></li>")
					.data("item", colorOrder[key].id)
					.addClass("color-item")
					.css("background-color",colorOrder[key].color)
				$colorList.append(colorListItems);
			}
			
			$colorList.find("li").velocity("transition.slideDownIn", { duration: 400, stagger: 20 })

			updateOrder();
		},

		commands = function(){
			console.log("commands")
			$("html").addClass("testDeClassement");
			// $("body").addClass("no-scroll");

			$btnPrint.on("click", function(){
				window.print();
			})

			$("#show-final").on("click", function(e){
				e.preventDefault();
				if( $("#choices a.active").length ){
					checkResult();

					$("#list-normal").addClass("no-border");
					$("#test").velocity({ height: "140px"}, { duration : 1000, delay:500,  easing: "easeInBack" });
					$(".color-arrangement").velocity({ height: "5px"}, { duration : 1000, delay:500,  easing: "easeInBack" });
					$(".brienfing").velocity({ height: "100px"}, { duration : 1000, delay : 500,  easing : "easeInBack" });
					// $("body").removeClass("no-scroll");

					$("#result").removeClass("hide");

					// $("#list-normal").addClass("no-border");

					$("#choices").velocity("transition.slideDownOut");

					$(this).velocity("transition.slideDownOut", function(){
						$(".test-instruction").toggleClass("hide");
						$(".result-instruction").toggleClass("hide");
					});
				}

			})

			$("#choices").on("click", "label", function(e){
				//e.preventDefault();
				$("#choices .pick").removeClass("active");
				$("#show-final").removeClass("btn-disabled");

				$(this).parent().addClass("active");
				sortable = false;
				switch($(this).parent().attr("id")){ 
					case "pick-normal": colorOrder = orderArray(data.colors, data.normal.scheme); choice = "normal"; break;
					case "pick-protan": colorOrder = orderArray(data.colors, data.protan.scheme); choice = "protan"; break;
					case "pick-deutan": colorOrder = orderArray(data.colors, data.deutan.scheme); choice = "deutan"; break;
					case "pick-tritan": colorOrder = orderArray(data.colors, data.tritan.scheme); choice = "tritan"; break;
					case "pick-deuteranormal": colorOrder = orderArray(data.colors, data.presets.tritanCrossing); choice = "deutan"; break;
					case "pick-tritan-crossing": colorOrder = orderArray(data.colors, data.presets.deuteranomal); choice = "tritan"; break;
					case "pick-other": colorOrder = shuffleArray(data.colors); choice = "other"; sortable = true; console.log("yo"); break;
				}

				$colorList.find("li").velocity("transition.slideUpOut", { 
					duration: 400, 
					stagger: 20, 
					complete: function() {
						drawDom();
					}
				})
			})
		};


		buildTest(function(){
			console.log("START")
        	$("#test").removeClass("hide").velocity("transition.slideUpIn", { duration: 420 });
        });


})


	/*
	// check the url
    var testUrl = getUrlParameter('see');

    // check if new user
    if( testUrl ){
    	var email = decode(testUrl);
    	if( validateEmail(email) ){
    		$("#email").val( email )
    	}
    } 
    */
    /*else {
        // probably new user
        firstTrial = true;
        console.log("Normal url");
    }*/

    // $('.tooltip').tooltipster();
  	
  	/**
  		setup the form
  	*/
  	/*
    var $alert = $("#alert");

    $("form").on("submit", function(e){
    	e.preventDefault();
        $alert.empty().addClass("hide");
        var name = $("input[name='name']").val();
        var email = $("input[name='email']").val();
        var alerts = [];

        if( !validateEmail(email) ){
            alerts.push( $("<li></li>").html("Le champ email n'est pas valide") );
        } 

        if( !validateFullName(name) ){
            alerts.push( $("<li></li>").html("Le champ nom n'est pas valide") );
        } 

        if(alerts.length){
            $.each(alerts, function(key, element){
                $alert.append(element).removeClass("hide");
            })
        } else {
        	// update user informations
        	currentUser.name = name;
        	currentUser.email = email;
        	currentUser.url = encode(currentUser.email);
        	//AlphabeticID.encode(Math.round(Math.random() * new Date()));

	        // check if url exist
	        $.ajax({type: "POST",
	          url: "/test/userByUrl",
	          dataType: "json",
	          data : { url : currentUser.url },
	          success: function(result){
	          	console.log( result.data )
	          	// url invalid test already made
	            if(result.data.result){
	            	firstTrial = false;
	            	currentUser = result.data;
	            	currentUser.serie = currentUser.serie.split(",").map(Number);

	            	if( confirm("Vous avez déjà fait le test, voulez-vous le refaire ?")){
	            		transitionToTest();
	            	} else {
	            		window.location.href = '/'; 
	            	}
	            } 

	            if(!result.data){
	            	firstTrial = true;
	            	// url does not exist
	            	console.log( "url does not exist" );
	            	// show the test
	            	transitionToTest();
	            }
	          }
	        });
        }
    })

    // animation to test
    var transitionToTest = function(){
    	// change url
        window.history.pushState({}, '', '?see='+currentUser.url);
         // nice an smooth transition
    	$("#homeScreen").addClass("hide").velocity("transition.slideUpOut", { duration: 420 });
        // build the test design
        buildTest(function(){
        	$("#test").removeClass("hide").velocity("transition.slideUpIn", { duration: 420 });
        });
    }
    */

