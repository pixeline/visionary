$(document).ready(function(){
	/**
		current user informations
	*/

	console.log("Classement");

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
		sortable = true,
		sortableIsActive = false,
		key, choice,
		types = {
        	"succeed" : "Aucun",
        	"protan" : "Protane (Rouge - bleu vert)",
        	"deutan" : "Deutan (Vert - rouge pourpre)",
        	"tritan" : "Tritane (Violet - jaune vert)",
        },
    	buildTest = function(callback){
	    	$.getJSON("/assets/js/data/data.json", function(result){

	    		data = result;

	    		console.log(data)

				colorOrder = shuffleArray(data.colors); // data.colors; //

				drawDom();

				$('#choices .pick').shuffle();
				$('#choices .pick').each(function(i, k){
					$(this).find("a").text(i + 1);
				});

				$("html").addClass("testDeClassement");

				//commands(); //

				$(window).trigger('resize');
				if(callback) {
					callback();	
				}
			})
    	},
		updateOrder = function(){

			console.log("updateOrder");

			order = [];
			$colorList.find("li").each(function () {
				if($(this).data("item") !== undefined){
					order.push(parseInt($(this).data("item")))
				}
			})
			$("#diag_serie").val(order.join(","));
			//order[0] = "P";
			//$(".currentOrder").html(order.join(" - "));

			//order[0] = 0;
			colorOrder = orderArray(data.colors, order);
				
			if(sortable) {
				
				if(!sortableIsActive){
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

					sortableIsActive = true;
				}

			} else {
				$("#list-normal").removeClass("sortable").sortable({ disabled: true });
				$(".color-item").first().removeClass("pilot ignore");
			}

			$(window).trigger('resize');
			result = new MomentOfInertia(colorOrder);
			checkResult();
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

		checkResult = function() {

			console.log("checkResult")


	        var cvd_type = "fail";
	        // CVD Type Criterions:
	        // C-index: 1.6 (for cvd vs. normal)
	        // Protan > +0.7 > Deutan > -65.0 > Tritan
	        if (result.c_index <= 1.6) {
	          $('.cvd_type').html("n'êtes pas daltonien"); //not colorblind
	          cvd_type = "succeed";
	        } else if (result.majorAngle >= +0.7) {
	          $('.cvd_type').html('êtes daltonien de type protanope'); //protan color vision
	           cvd_type = "protan";
	        } else if (result.majorAngle < -65) {
	          $('.cvd_type').html('êtes daltonien de type tritanope');
	          cvd_type = "tritan";
	        } else {
	          $('.cvd_type').html('êtes daltonien de type deuteranope');
	          cvd_type = "deutan";
	        }
	        // Severity Criterions
	        // C-index range: 1.6 - 4.2
	        var adjusted_c = result.c_index;
	        if (adjusted_c < 1.6) { adjusted_c = 1.6 };
	        if (adjusted_c > 4.2) { adjusted_c = 4.2 };
	        
	        // add some properties
	        result.serie = order;
	        result.result = cvd_type;
	        result.ratio = Math.round((adjusted_c - 1.6) * 100 / (4.2 - 1.6)) + "%";

	        // update de the form
	        for(var item in result){
	        	var value, float = parseFloat(result[item]);
	        	switch(item){
	        		case "angle": value = float.toFixed(1); break;
					case "c_index": value = float.toFixed(2); break;
					case "majorAngle": value = float.toFixed(1); break;
					case "majorRadius": value = float.toFixed(1); break;
					case "minorRadius": value = float.toFixed(1); break;
					case "s_index": value = float.toFixed(2); break;
					case "tes": value = float.toFixed(1); break;
					case "serie": value = result[item].join(","); break;
					case "result": value = result[item]; break; 
					case "ratio": value = result[item]; break; 
	        	}
	        	$("#"+item).val(value);
	        }
	        
	    };


		buildTest(function(){
			console.log("START")
        	$("#test").removeClass("hide").velocity("transition.slideUpIn", { duration: 420 });
        });


})
/*

 <!-- no not remove futur functionalities -->
                <!--

                <div id="choices" class="list-inline">
                    <div class="pick"  id="pick-normal">
                        <label for="normal">normal</label>
                        <input type="radio" id="normal" name="gradient">
                    </div>
                    <div class="pick" id="pick-protan">
                        <label for="protan" >protan</label>
                        <input type="radio" id="protan" name="gradient">
                    </div>
                    <div class="pick"  id="pick-deutan">
                        <label for="deutan">deutan</label>
                        <input type="radio" id="deutan" name="gradient">
                    </div>
                    <div class="pick" id="pick-tritan">
                        <label for="tritan" >tritan</label>
                        <input type="radio" id="tritan" name="gradient">
                    </div>
                    <div class="pick" id="pick-deuteranormal">
                        <label for="deuteranormal" >deuteranormal</label>
                        <input type="radio" id="deuteranormal" name="gradient">
                    </div>
                    <div class="pick" id="pick-tritan-crossing">
                        <label for="tritan-crossing" >protan</label>
                        <input type="radio" id="tritan-crossing" name="gradient">
                    </div>
                   
                    <div class="pick-other" id="pick-other">
                        <label for="other">other</label>
                        <input type="radio" id="other" name="gradient">
                    </div>
                </div>
                -->

*/



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

