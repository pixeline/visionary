
	//data to convert to json
	var data = {
	    "protan" : {
	      "from" : { "x" : -4,    "y" :  35 },
	        "to" : { "x" : -13,   "y" : -35 },
	    "scheme" : [ 0, 15, 14, 1, 2, 13, 12, 3, 4, 11, 10, 5, 6, 9, 8, 7]
	    },
	    "deutan" : {
	      "from" : { "x" :-15.77, "y" :  35 },
	        "to" : { "x" : 0.4,   "y" : -35 },
	    "scheme" : [ 0, 1, 15, 2, 3, 14, 13, 4, 12, 5, 6, 11, 10, 7, 9, 8]
	    },
	    "tritan" : {
	      "from" : { "x" :-24.61, "y" :  11.2 },
	        "to" : { "x" : 35,    "y" :   4 },
	    "scheme" : [ 0, 1, 2, 3, 4, 5, 6, 7, 15, 8, 14, 9, 13, 10, 11, 12]
	    },
	    "presets" : {
	    	tritanCrossing : [0,1,2,3,4,5,6,7,15,14,13,12,11,10,9,8], // Normal-1 Tritan crossing
	    	deuteranomal : [0,1,14,2,3,4,5,6,7,11,8,9,10,12,13,15]  // Deuteranomal
	    },
	    "colors" : [
		    { "id" : 0,  "color" :"#3781C1", "u" : -21.54, "v" : -38.39 },
		    { "id" : 1,  "color" :"#3583B4", "u" : -23.26, "v" : -25.56 },
		    { "id" : 2,  "color" :"#3B84A7", "u" : -22.41, "v" : -15.53 },
		    { "id" : 3,  "color" :"#39859C", "u" : -23.11, "v" :  -7.45 },
		    { "id" : 4,  "color" :"#3B8690", "u" : -22.45, "v" :    1.1 },
		    { "id" : 5,  "color" :"#3F8782", "u" : -21.76, "v" :   7.35 },
		    { "id" : 6,  "color" :"#588473", "u" : -14.08, "v" :  18.74 },
		    { "id" : 7,  "color" :"#6C8164", "u" :  -2.72, "v" :  28.13 },
		    { "id" : 8,  "color" :"#837B5D", "u" :  14.84, "v" :  31.13 },
		    { "id" : 9,  "color" :"#907660", "u" :  23.87, "v" :  26.35 },
		    { "id" : 10, "color" :"#9E6E6F", "u" :  31.82, "v" :  14.76 },
		    { "id" : 11, "color" :"#9F6D7C", "u" :  31.42, "v" :   6.99 },
		    { "id" : 12, "color" :"#9C6D89", "u" :  29.79, "v" :    0.1 },
		    { "id" : 13, "color" :"#927099", "u" :  26.64, "v" :  -9.38 },
		    { "id" : 14, "color" :"#8F6FA4", "u" :  22.92, "v" : -18.65 },
		    { "id" : 15, "color" :"#8073B2", "u" :   11.2, "v" : -24.61 }
		]
	}

	$("#classement").on("click", function(){
		initialiseClassement(data);	
		$("#homeScreen").velocity("transition.slideUpOut", { 
			duration: 420,
			delay : 200,
			complete: function(){
				$("#test-1").removeClass("hide").velocity("transition.slideUpIn", { duration: 420 });
			}
		});
	})

	$("#reconaissance").on("click", function(){
		initialiseReconaissance(data);	
		$("#homeScreen").velocity("transition.slideUpOut", { 
			duration: 420,
			delay : 200,
			complete: function(){
				$("#test-2").removeClass("hide").velocity("transition.slideUpIn", { duration: 420 });
			}
		});
	})

	$(".btn-print").on("click", function(){
		window.print();
	})
	


/************** RECONAISSANCE *******************/

function initialiseReconaissance(data){
	(function($){
	 
	    $.fn.shuffle = function() {
	 
	        var allElems = this.get(),
	            getRandom = function(max) {
	                return Math.floor(Math.random() * max);
	            },
	            shuffled = $.map(allElems, function(){
	                var random = getRandom(allElems.length),
	                    randEl = $(allElems[random]).clone(true)[0];
	                allElems.splice(random, 1);
	                return randEl;
	           });
	 
	        this.each(function(i){
	            $(this).replaceWith($(shuffled[i]));
	        });
	 
	        return $(shuffled);
	 
	    };
	 
	})(jQuery);

	var stageWidth = 400, // 400
		stageHeight = 280, // 360
		normalScheme = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		colorOrder = [],
		points = [],
		order = [],
		$colorList = $("#list-normal"),
		colorListItems = "",
		result = {},
		data, key, choice,
		scaleCoords = function(){
			var n = data.colors.length;
			var factor = stageWidth / 130;
			
			while(n--){
				//spots.push(data.colors[n])
				//data.colors[n] = _s(data.colors[n]);
				data.colors[n].x = (data.colors[n].v * factor) + stageWidth/2;
				data.colors[n].y = (data.colors[n].u * factor) + stageHeight/2;
			}

			function _s(coord){
				return {
					x : (coord.x * factor) + stageWidth/2,
					y : (coord.y * factor) + stageHeight/2
				}
			}

			data.protan.from = _s(data.protan.from);
			data.protan.to = _s(data.protan.to);

			data.deutan.from = _s(data.deutan.from);
			data.deutan.to = _s(data.deutan.to);

			data.tritan.from = _s(data.tritan.from);
			data.tritan.to = _s(data.tritan.to);
		},
		updateOrder = function(){
			order = [];
			$colorList.find("li").each(function (argument) {
				if($(this).data("item") !== undefined){
					order.push(parseInt($(this).data("item")))
				}
			})
			order[0] = "P";
			$(".currentOrder").html(order.join(" - "));

			order[0] = 0;
			colorOrder = orderArray(data.colors, order);

			result = new MomentOfInertia(colorOrder);
		},
		checkResult = function() {
	        $('.angle').html( result.majorAngle.toFixed(1) );
	        $('.major_radius').html( result.majorRadius.toFixed(1) );
	        $('.minor_radius').html( result.minorRadius.toFixed(1) );
	        $('.tes').html( result.tes.toFixed(1) );
	        $('.s_index').html( result.s_index.toFixed(2) );
	        $('.c_index').html( result.c_index.toFixed(2) );
	        var cvd_type = "fail";
	        // CVD Type Criterions:
	        // C-index: 1.6 (for cvd vs. normal)
	        // Protan > +0.7 > Deutan > -65.0 > Tritan
	        if (result.c_index <= 1.6) {
	          $('.cvd_type').html("n'êtes pas daltonien"); //not colorblind
	          cvd_type = "succeed";
	        } else if (result.majorAngle >= +0.7) {
	          $('.cvd_type').html('daltonien de type protanope'); //protan color vision
	           cvd_type = "protan";
	        } else if (result.majorAngle < -65) {
	          $('.cvd_type').html('daltonien de type tritanope');
	          cvd_type = "tritan";
	        } else {
	          $('.cvd_type').html('daltonien de type deuteranope');
	          cvd_type = "deutan";
	        }
	        // Severity Criterions
	        // C-index range: 1.6 - 4.2
	        var adjusted_c = result.c_index;
	        if (adjusted_c < 1.6) { adjusted_c = 1.6 };
	        if (adjusted_c > 4.2) { adjusted_c = 4.2 };

	        $("[type=checkbox]").removeAttr("checked").prop("disabled",true).parent().removeClass("result-radio");
	        console.log( $("#test-2").find("input[value='"+cvd_type+"']") )
	        if(cvd_type == "succeed"){
	        	$("#test-2").find("input[value='succeed']").removeAttr("disabled").prop("checked",true).parent().addClass("result-radio");
	        } else {
	        	$("#test-2").find("input[value='"+cvd_type+"']").removeAttr("disabled").prop("checked",true).parent().addClass("result-radio");
	        	$("#test-2").find("input[value='fail']").removeAttr("disabled").prop("checked",true).parent().addClass("result-radio");
	        }

	        $('.severity_range').html( Math.round((adjusted_c - 1.6) * 100 / (4.2 - 1.6)) + "%" );  
	    },
		checkAnwser = function(evt){
			if(_.isEqual(order, data.protan.scheme)){
				result = "protanope";
			} else if(_.isEqual(order, data.deutan.scheme)) {
				result = "deuteranope";
			} else if(_.isEqual(order, data.tritan.scheme)){
				result = "tritanope";
			} else if(_.isEqual(order, normalScheme)){
				result = "normal";
			} else {
				result = "unknow";
			}
		},
		drawDom = function(){
			$colorList.empty();

			colorListItems = "";
			colorListItems += "<li data-item='"+data.colors[0].id+"' class='color-item' style='background-color:"+data.colors[0].color+";'></li>";
			for(key = 1; key < colorOrder.length; key++){
				colorListItems += "<li data-item='"+colorOrder[key].id+"' class='color-item' style='background-color:"+colorOrder[key].color+";'></li>"; //"+colorOrder[key].id+"
			}

			$colorList.append(colorListItems);
			$colorList.find("li").velocity("transition.slideDownIn", { duration: 400, stagger: 20 })

			updateOrder();
		},
		commands = function(){
			$("html").addClass("testDeClassement");
			$("body").addClass("no-scroll");


			$("#show-final").on("click", function(){
				if( $("#choices a.active").length ){
					checkResult();

					$("#list-normal").addClass("no-border");
					$(".color-arrangement").velocity({ height: "5px"}, { duration : 1000, delay:500,  easing: "easeInBack" });
					$(".brienfing").velocity({ height: "100px"}, { duration : 1000, delay:500,  easing: "easeInBack" });
					$("body").removeClass("no-scroll");

					$("#choices").velocity("transition.slideDownOut");

					$(this).velocity("transition.slideDownOut", function(){
						$(".test-instruction").toggleClass("hide");
						$(".result-instruction").toggleClass("hide");
					});
				}

			})

			$("#choices").on("click", "a", function(e){
				e.preventDefault();
				$("#choices a").removeClass("active");
				$("#show-final").removeClass("btn-disabled")
				$(this).addClass("active");
				switch($(this).attr("id")){ 
					case "pick-normal": colorOrder = orderArray(data.colors, normalScheme); choice = "normal"; break;
					case "pick-protan": colorOrder = orderArray(data.colors, data.protan.scheme); choice = "protan"; break;
					case "pick-deutan": colorOrder = orderArray(data.colors, data.deutan.scheme); choice = "deutan"; break;
					case "pick-tritan": colorOrder = orderArray(data.colors, data.tritan.scheme); choice = "tritan"; break;
					case "pick-deuteranormal": colorOrder = orderArray(data.colors, data.presets.tritanCrossing); choice = "deutan"; break;
					case "pick-tritan-crossing": colorOrder = orderArray(data.colors, data.presets.deuteranomal);choice = "tritan"; break;
				}

				$colorList.find("li").velocity("transition.slideUpOut", { 
					duration: 400, 
					stagger: 20, 
					complete: function() {
						drawDom();
					}
				})
				checkResult();
			})
		},
		drawGraph = function(){

			// GRAPH
			// http://pixijs.github.io/examples/index.html
			// http://pixijs.github.io/docs/
			// create an new instance of a pixi stage
			var stage = new PIXI.Stage(0x66FF99);

			/*var s = Snap("#svg");
			// Lets create big circle in the middle:
			var bigCircle = s.circle(150, 150, 100);
				bigCircle.attr({
				    fill: "#bada55",
				    stroke: "#000",
				    strokeWidth: 5
				});*/


			var stage = new PIXI.Container(0x66FF99);

			// create a renderer instance.
			var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight, {antialias: true}); // arguments: width, height, view, transparent, antialias

			// add the renderer view element to the DOM
			var graphContainer = document.getElementById("graph-2");
			graphContainer.appendChild(renderer.view);

			var bg = new PIXI.Graphics();
				bg.beginFill(0xFFFFFF, 1);
				bg.drawRect(0, 0, stageWidth, stageHeight);
				bg.endFill();

			stage.addChild(bg);
			//stage.addChild(bunny);

			var lineThick = 2;

			for(key = 0; key < data.colors.length; key++) {
				var colorContainer = new PIXI.Container();
				var num = key == 0 ? 'P' : key;
				var style = { font : '12px Arial', fill : '#666666' };
					//stroke : '#4a1850',strokeThickness : 5,

				var textNum = new PIXI.Text(num, style);
				    textNum.x = -4;
				    textNum.y = key < 7 ? -28 : 15;

				var color = (data.colors[key].color).slice(1);

				var circle = new PIXI.Graphics();
					circle.beginFill("0x"+color, 1);
					circle.drawCircle(0, 0, 10);
					circle.endFill();

				colorContainer.addChild(circle);
				colorContainer.addChild(textNum);

				colorContainer.x = data.colors[key].x; //v
				colorContainer.y = data.colors[key].y; //u

				stage.addChild(colorContainer);
			}

			// plot protan, deutan, tritan confusion lines

			var lineProtane = new PIXI.Graphics();
				lineProtane.lineStyle(lineThick, 0xffaaaa);
				lineProtane.moveTo( data.protan.from.x , data.protan.from.y );
				lineProtane.lineTo( data.protan.to.x , data.protan.to.y );

			var textProtan = new PIXI.Text("Protan", { font : '16px Arial', fill : '#ff0000' });
				textProtan.x = stageWidth - 80;
				textProtan.y = stageHeight - 100;

			var lineDeutane = new PIXI.Graphics();
				lineDeutane.lineStyle(lineThick, 0xaaffaa);
				lineDeutane.moveTo( data.deutan.from.x , data.deutan.from.y );
				lineDeutane.lineTo( data.deutan.to.x , data.deutan.to.y );

			var textDeutane = new PIXI.Text("Deutane", { font : '16px Arial', fill : '#007f00' });
				textDeutane.x = stageWidth - 80;
				textDeutane.y = stageHeight - 80;

			var lineTritane = new PIXI.Graphics();
				lineTritane.lineStyle(lineThick, 0xaaaaff);
				lineTritane.moveTo( data.tritan.from.x , data.tritan.from.y );
				lineTritane.lineTo( data.tritan.to.x , data.tritan.to.y );

			var textTritane = new PIXI.Text("Tritane", { font : '16px Arial', fill : '#0000ff' });
				textTritane.x = stageWidth - 80;
				textTritane.y = stageHeight - 60;

			var lineOrder = new PIXI.Graphics();
			/*	lineOrder.lineStyle(lineThick, 0xaaaaaa);
				lineOrder.moveTo( data.tritan.from.x , data.tritan.from.y );
			for(key = 0; key < order.length; key++){
				var color = data.colors[parseInt(order[key])];
				lineOrder.lineTo( color.v, color.u );
			}
			*/

			stage.addChild(lineProtane);
			stage.addChild(textProtan);
			stage.addChild(lineDeutane);
			stage.addChild(textDeutane);
			stage.addChild(lineTritane);
			stage.addChild(textTritane);
			stage.addChild(lineOrder);

			requestAnimFrame( animate );


			function animate() {

			    setTimeout(function(){ 
					animate();
				}, 500);
			    
			    lineOrder.clear();
				lineOrder.lineStyle(3, 0x666666);
				lineOrder.moveTo( data.colors[0].x , data.colors[0].y );
				for(key = 1; key < order.length; key++){
					var color = data.colors[parseInt(order[key])];
					lineOrder.lineTo( color.x, color.y );
				}

			    // render the stage   
			    renderer.render(stage);
			}
		};
	
	colorOrder = shuffleArray(data.colors);

	scaleCoords();
	drawDom();
	$('ul#choices li').shuffle();
	$('ul#choices li').each(function(i, k){
		$(this).find("a").text(i + 1);
	});

	commands();
	drawGraph();
	$(window).trigger('resize');


}

/************** CLASSEMENT *******************/

function initialiseClassement(data){

	var stageWidth = 400, // 400
		stageHeight = 280, // 360
		normalScheme = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
		colorOrder = [],
		points = [],
		order = [],
		$colorList = $("#list-sortable"),
		colorListItems = "",
		result = {},
		data, key,
		scaleCoords = function(){
			var n = data.colors.length;
			var factor = stageWidth / 130;
			
			while(n--){
				//spots.push(data.colors[n])
				//data.colors[n] = _s(data.colors[n]);
				data.colors[n].x = (data.colors[n].v * factor) + stageWidth/2;
				data.colors[n].y = (data.colors[n].u * factor) + stageHeight/2;
			}

			function _s(coord){
				return {
					x : (coord.x * factor) + stageWidth/2,
					y : (coord.y * factor) + stageHeight/2
				}
			}

			data.protan.from = _s(data.protan.from);
			data.protan.to = _s(data.protan.to);

			data.deutan.from = _s(data.deutan.from);
			data.deutan.to = _s(data.deutan.to);

			data.tritan.from = _s(data.tritan.from);
			data.tritan.to = _s(data.tritan.to);
		},
		updateOrder = function(){
			order = [];
			$colorList.find("li").each(function (argument) {
				if($(this).data("item") !== undefined){
					order.push(parseInt($(this).data("item")))
				}
			})
			order[0] = "P";
			$(".currentOrder").html(order.join(" - "));

			order[0] = 0;
			colorOrder = orderArray(data.colors, order);

			result = new MomentOfInertia(colorOrder);

			checkResult();
		},
		checkResult = function() {
	        $('.angle').html( result.majorAngle.toFixed(1) );
	        $('.major_radius').html( result.majorRadius.toFixed(1) );
	        $('.minor_radius').html( result.minorRadius.toFixed(1) );
	        $('.tes').html( result.tes.toFixed(1) );
	        $('.s_index').html( result.s_index.toFixed(2) );
	        $('.c_index').html( result.c_index.toFixed(2) );
	        var cvd_type = "fail";
	        // CVD Type Criterions:
	        // C-index: 1.6 (for cvd vs. normal)
	        // Protan > +0.7 > Deutan > -65.0 > Tritan
	        if (result.c_index <= 1.6) {
	          $('.cvd_type').html("n'êtes pas daltonien"); //not colorblind
	          cvd_type = "succeed";
	        } else if (result.majorAngle >= +0.7) {
	          $('.cvd_type').html('daltonien de type protanope'); //protan color vision
	           cvd_type = "protan";
	        } else if (result.majorAngle < -65) {
	          $('.cvd_type').html('daltonien de type tritanope');
	          cvd_type = "tritan";
	        } else {
	          $('.cvd_type').html('daltonien de type deuteranope');
	          cvd_type = "deutan";
	        }
	        // Severity Criterions
	        // C-index range: 1.6 - 4.2
	        var adjusted_c = result.c_index;
	        if (adjusted_c < 1.6) { adjusted_c = 1.6 };
	        if (adjusted_c > 4.2) { adjusted_c = 4.2 };

	        $("[type=checkbox]")
	        	.removeAttr("checked")
	        	.prop("disabled",true)
	        	.parent()
	        	.removeClass("result-radio");

	        if(cvd_type == "succeed"){
	        	$("#test-1").find("input[value='succeed']")
	        		.prop("checked",true)
	        		.parent()
	        		.addClass("result-radio");
	        } else {
	        	$("#test-1")
	        		.find("input[value='"+cvd_type+"']")
	        		.prop("checked",true)
	        		.parent()
	        		.addClass("result-radio");

	        	$("#test-1")
	        		.find("input[value='fail']")
	        		.prop("checked",true)
	        		.parent()
	        		.addClass("result-radio");
	        }

	        $('.severity_range').html( Math.round((adjusted_c - 1.6) * 100 / (4.2 - 1.6)) + "%" );  
	    },
		drawDom = function(){
			$colorList.empty();

			colorListItems = "";
			colorListItems += "<li data-item='"+data.colors[0].id+"' class='color-item pilot ignore' style='background-color:"+data.colors[0].color+";'></li>";
			for(key = 1; key < colorOrder.length; key++){
				colorListItems += "<li data-item='"+colorOrder[key].id+"' class='color-item' style='background-color:"+colorOrder[key].color+";'></li>"; //"+colorOrder[key].id+"
			}

			$colorList.append(colorListItems);
			$colorList.find("li").velocity("transition.slideDownIn", { stagger: 60 })

			updateOrder();
		},
		sortable = function(){
			//http://ma.rkusa.st/touch-dnd/sortable.html
			$('#list-sortable').sortable({ 
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
		},
		commands = function(){

			$("html").addClass("testDeClassement");
			$("body").addClass("no-scroll");

			$("#toggle-cheat").on("click", function(){
				$("#cheat").toggleClass("hide");

				if( $("#pop-up").hasClass("hide") ){
					$("#pop-up").velocity("transition.slideUpIn", function(){
						$(this).removeClass("hide");
					});
				} else {
					$("#pop-up").velocity("transition.slideDownOut", function(){
						$(this).addClass("hide");
					});
				}
			})

			$("#show-result").on("click", function(){

				$("#list-sortable").addClass("no-border");
				$(".color-arrangement").velocity({ height: "5px"}, { duration : 1000, delay:500,  easing: "easeInBack" });
				$(".brienfing").velocity({ height: "190px"}, { duration : 1000, delay:500,  easing: "easeInBack" });
				$("body").removeClass("no-scroll");

				$(this).velocity("transition.slideDownOut", function(){
					$(".test-instruction").toggleClass("hide");
					$(".result-instruction").toggleClass("hide");
				});

				
				  /*$(".section-bottom").velocity("scroll", { 
				  	delay: 1400,
				    duration: 420,
				    easing: "easeInBack"
				  });
				  */
				//$(".screen-result").removeClass("screen-inactive")
				/*$("#pop-up").velocity("transition.slideLeftIn", function(){
					$(this).removeClass("hide");
				});*/

			})

			//$("#graph").toggleClass("hide");

			$("#commands").on("click", "button", function(){
				switch($(this).attr("id")){ 
					case "set-normal": colorOrder = orderArray(data.colors, normalScheme); break;
					case "set-protan": colorOrder = orderArray(data.colors, data.protan.scheme); break;
					case "set-deutan": colorOrder = orderArray(data.colors, data.deutan.scheme); break;
					case "set-tritan": colorOrder = orderArray(data.colors, data.tritan.scheme); break;
					case "set-random": colorOrder = shuffleArray(data.colors); break;
				}
				$colorList.find("li").velocity("transition.slideUpOut", { 
					stagger: 20, 
					complete: function() {
						drawDom();
					}
				})
			})
		},
		drawGraph = function(){

			// GRAPH
			// http://pixijs.github.io/examples/index.html
			// http://pixijs.github.io/docs/
			// create an new instance of a pixi stage
			var stage = new PIXI.Stage(0x66FF99);

			/*var s = Snap("#svg");
			// Lets create big circle in the middle:
			var bigCircle = s.circle(150, 150, 100);
				bigCircle.attr({
				    fill: "#bada55",
				    stroke: "#000",
				    strokeWidth: 5
				});*/


			var stage = new PIXI.Container(0x66FF99);

			// create a renderer instance.
			var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight, {antialias: true}); // arguments: width, height, view, transparent, antialias

			// add the renderer view element to the DOM
			var graphContainer = document.getElementById("graph-1");
			graphContainer.appendChild(renderer.view);

			var bg = new PIXI.Graphics();
				bg.beginFill(0xFFFFFF, 1);
				bg.drawRect(0, 0, stageWidth, stageHeight);
				bg.endFill();

			stage.addChild(bg);
			//stage.addChild(bunny);

			var lineThick = 2;

			for(key = 0; key < data.colors.length; key++) {
				var colorContainer = new PIXI.Container();
				var num = key == 0 ? 'P' : key;
				var style = { font : '12px Arial', fill : '#666666' };
					//stroke : '#4a1850',strokeThickness : 5,

				var textNum = new PIXI.Text(num, style);
				    textNum.x = -4;
				    textNum.y = key < 7 ? -28 : 15;

				var color = (data.colors[key].color).slice(1);

				var circle = new PIXI.Graphics();
					circle.beginFill("0x"+color, 1);
					circle.drawCircle(0, 0, 10);
					circle.endFill();

				colorContainer.addChild(circle);
				colorContainer.addChild(textNum);

				colorContainer.x = data.colors[key].x; //v
				colorContainer.y = data.colors[key].y; //u

				stage.addChild(colorContainer);
			}

			// plot protan, deutan, tritan confusion lines

			var lineProtane = new PIXI.Graphics();
				lineProtane.lineStyle(lineThick, 0xffaaaa);
				lineProtane.moveTo( data.protan.from.x , data.protan.from.y );
				lineProtane.lineTo( data.protan.to.x , data.protan.to.y );

			var textProtan = new PIXI.Text("Protan", { font : '16px Arial', fill : '#ff0000' });
				textProtan.x = stageWidth - 80;
				textProtan.y = stageHeight - 100;

			var lineDeutane = new PIXI.Graphics();
				lineDeutane.lineStyle(lineThick, 0xaaffaa);
				lineDeutane.moveTo( data.deutan.from.x , data.deutan.from.y );
				lineDeutane.lineTo( data.deutan.to.x , data.deutan.to.y );

			var textDeutane = new PIXI.Text("Deutane", { font : '16px Arial', fill : '#007f00' });
				textDeutane.x = stageWidth - 80;
				textDeutane.y = stageHeight - 80;

			var lineTritane = new PIXI.Graphics();
				lineTritane.lineStyle(lineThick, 0xaaaaff);
				lineTritane.moveTo( data.tritan.from.x , data.tritan.from.y );
				lineTritane.lineTo( data.tritan.to.x , data.tritan.to.y );

			var textTritane = new PIXI.Text("Tritane", { font : '16px Arial', fill : '#0000ff' });
				textTritane.x = stageWidth - 80;
				textTritane.y = stageHeight - 60;

			var lineOrder = new PIXI.Graphics();
			/*	lineOrder.lineStyle(lineThick, 0xaaaaaa);
				lineOrder.moveTo( data.tritan.from.x , data.tritan.from.y );
			for(key = 0; key < order.length; key++){
				var color = data.colors[parseInt(order[key])];
				lineOrder.lineTo( color.v, color.u );
			}
			*/

			stage.addChild(lineProtane);
			stage.addChild(textProtan);
			stage.addChild(lineDeutane);
			stage.addChild(textDeutane);
			stage.addChild(lineTritane);
			stage.addChild(textTritane);
			stage.addChild(lineOrder);


			requestAnimFrame( animate );

			function animate() {
			    //requestAnimFrame( animate );
			    setTimeout(function(){ 
					animate();
				}, 500);

			    lineOrder.clear();
				lineOrder.lineStyle(3, 0x666666);
				lineOrder.moveTo( data.colors[0].x , data.colors[0].y );
				for(key = 1; key < order.length; key++){
					var color = data.colors[parseInt(order[key])];
					lineOrder.lineTo( color.x, color.y );
				}

			    // render the stage   
			    renderer.render(stage);
			}
		};
	
	colorOrder = shuffleArray(data.colors);
	scaleCoords();

	//$(".screen-result").velocity("transition.slideRightOut", { duration: 0 });

	drawDom();
	sortable();
	commands();
	drawGraph();
	$(window).trigger('resize');

	//testDeClassement
	console.log("initialiseDeClassement")

}

/************** UTILS *******************/

var shuffleArray = function (arr) {
  var array = arr.slice(0);
  //keep the first
  var item = array.shift();
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  array.unshift(item);
  return array;
}

var orderArray = function (arr, order){
  var newOrder = [];
  for(var i = 0; i < order.length; i++){
    newOrder.push(arr[order[i]]);
  }
  return newOrder;
}

var Vector = function(spot0, spot1) {
      this.u = spot1.u - spot0.u;
      this.v = spot1.v - spot0.v;
}

/************** MOI *******************/

var MomentOfInertia = function(spots) {
	this.spots = spots;
	this.vectors = this.vectors();
	this.angle = this.angle();
	this.moments = this.moments();
	this.c_index = this.c_index();
	this.s_index = this.s_index();
	this.tes = this.tes();
};

MomentOfInertia.prototype.vectors = function() {
    vecs = [];
    for(i = 1; i < this.spots.length; i++) {
      vecs.push(new Vector(this.spots[i-1], this.spots[i]));
    }
    return vecs;
}
    
MomentOfInertia.prototype.angle = function() {
    var sum1 = 0;
    var sum2 = 0;
    for (i = 0; i < this.vectors.length; i++) {
      sum1 = sum1 + 2 * this.vectors[i].u * this.vectors[i].v;
      sum2 = sum2 + (Math.pow(this.vectors[i].u, 2) - Math.pow(this.vectors[i].v, 2));
    }
    var piAngle = Math.atan(sum1/sum2) / 2;
    return piAngle;
}
    
MomentOfInertia.prototype.moments = function() {
    moms = [];
    moms[0] = 0;
    moms[1] = 0;
    var angle1 = this.angle;
    var angle2;
    if (angle1 < 0) {
      angle2 = angle1 + (Math.PI / 2);
    } else {
      angle2 = angle1 - (Math.PI / 2);
    }
    for (i = 0; i < this.vectors.length; i++) {
      moms[0] = moms[0] + Math.pow(this.vectors[i].v * Math.cos(angle1) - this.vectors[i].u * Math.sin(angle1), 2);
      moms[1] = moms[1] + Math.pow(this.vectors[i].v * Math.cos(angle2) - this.vectors[i].u * Math.sin(angle2), 2);
    }
    moms[0] = Math.sqrt(moms[0] / this.vectors.length);
    moms[1] = Math.sqrt(moms[1] / this.vectors.length);
    if (moms[0] > moms[1] ) {
      this.majorRadius = moms[0];
      this.minorRadius = moms[1];
      this.majorAngle = (180 * angle2 / Math.PI);
    } else {
      this.majorRadius = moms[1];
      this.minorRadius = moms[0];
      this.majorAngle = (180 * angle1 / Math.PI);
    }
    return moms;
}
    
MomentOfInertia.prototype.c_index = function() {
	return (this.majorRadius / 9.23705);
}
    
MomentOfInertia.prototype.s_index = function() {
	return (this.majorRadius / this.minorRadius);
}

MomentOfInertia.prototype.tes = function() {
	return (Math.sqrt(Math.pow(this.majorRadius, 2) + Math.pow(this.minorRadius, 2)));
}

