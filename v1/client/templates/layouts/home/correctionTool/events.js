/* true if a picture has been daltonized */
var daltonize = false;
//canvas of pictures for glfx
var canvas, canvas2;
//current page display
var pageNumber = 0;
//number of picture in picSet
var nbrImgMax;
//id of current image chosen
var imgChoice = -1;
//current filter to apply to current picture
var currentFilter;
//every filters of every pictures
var tabFilters = {};
var texture, texture2;
/* all the pictures in mongo DB */
var picSet;
/* current picture to show and render */
var imageToRender;
/* his src */
var srcImg;
/* current type of color blindness chosen */
var type = "undefined";
/* stage and sprite used for pixi js */
var stage, sprite;
//if errorSexe = false, display error if there is one
var errorSexe;
//list of the current user's answers
var answersList = [];
//true if current pictured in mode zoom
var zoomIn;
//true if answer given by user for current page
var rep;


/* Events */
Template.CorrectionTool.events({
  
	/* Submit form for each page and final form */
	'submit #formFilter, submit .user_information': function(event){
		event.preventDefault();
	},

	/* Validation : append error message for label sexe if error */
	'click .user_information input[type=submit], click .user_information input[type=radio]': function(event){
		if(($(".user_information input[name=Sexe]:checked").length != 1) && !errorSexe) {
			errorSexe = true;
			msgError = document.createElement("span");
			msgError.id = "errorSexe";
			msgError.appendChild(document.createTextNode("Veuillez indiquer votre genre."));
			$(".user_information #genreGroup").append(msgError).show();
			$(".user_information").submit(false);
		} else if (($(".user_information input[name=Sexe]:checked").length == 1) && errorSexe) {
			errorSexe = false
			$(".user_information #errorSexe").hide();
		}
	},

	/* solution to pick something in a picture */
	'click #imgContent #image14' : function (event) { 
        var posX = $("#imgContent").position().left,
            posY = $("#imgContent").position().top,
        	tailleX = $("#imgContent canvas").width(),
            tailleY = $("#imgContent canvas").height(),
            x = (event.pageX - posX)/tailleX,
            y = (event.pageY - posY)/tailleY;
    	if(x < 0.28 && y < 0.36) {
    		$('#answer_select option[value="En haut à gauche"]').prop('selected', true);
    	} else if (x < 0.83 && y < 0.36) {
    		$('#answer_select option[value="En haut au milieu"]').prop('selected', true);
    	} else if (y < 0.36) {
    		$('#answer_select option[value="En haut à droite"]').prop('selected', true);
    	} else if (x < 0.28 && y < 0.70) {
    		$('#answer_select option[value="Au centre à gauche"]').prop('selected', true);
    	} else if (x < 0.83 && y < 0.70) {
    		$('#answer_select option[value="Au centre"]').prop('selected', true);
    	} else if (y < 0.70) {
    		$('#answer_select option[value="Au centre à droite"]').prop('selected', true);
    	} else if (x < 0.28) {
    		$('#answer_select option[value="En bas à gauche"]').prop('selected', true);
    	} else if (x < 0.83) {
    		$('#answer_select option[value="En bas au milieu"]').prop('selected', true);
    	} else {
    		$('#answer_select option[value="En bas à droite"]').prop('selected', true);
    	}
	},

	/* click img => inner zoom TODO */
	'click #imgContent' : function(event) {
		if(event.target.id != "image14") {
			if (!zoomIn) {

				$("#QAcontainer").hide();
				$("#filters").hide();

				if(pageNumber >= nbrImgMax) {
					// replace image content
					fillImg(pageNumber - nbrImgMax);
				} else {
					// replace image content
					fillImg(pageNumber);
				}

				// init canvas and realise effect
				imageToRender.onload = function() {
					texture = initCanvas("image"+pageNumber);

					applyFilters(pageNumber, false);
				}

				$("#imgContent").css({
					"width" : "100%",
					"cursor" : "zoom-out"
				})
				zoomIn = true;

			} else {

				$("#QAcontainer").show();
				if (rep) {
					$("#filters").show();
				}

				if(pageNumber >= nbrImgMax) {
					$("#filters").show();
					// replace image content
					fillImg(pageNumber - nbrImgMax);
				} else {
					// replace image content
					fillImg(pageNumber);
				}

				// init canvas and realise effect
				imageToRender.onload = function() {
					texture = initCanvas("image"+pageNumber);

					applyFilters(pageNumber, false);
				}

				$("#imgContent").css({
					"width" : "50%",
					"cursor" : "zoom-in"
				})
				zoomIn = false;

			}
		}
	},

	/* click button less */
	'mousedown .filter .less' : function(event) {
		var parent = $(event.target.parentElement);
		update(1, parent);
	},

	/* click button more */
	'mousedown .filter .more' : function(event) {
		var parent = $(event.target.parentElement);
		update(2, parent);
	},

	/* User validate his answer, store it and
		if it's correct, show next,
		else show correction
	*/
	'submit #formQA' : function() {
		event.preventDefault();
		var currentQA = picSet[pageNumber].QA.fetch()[0];

		//case of Ishihara
		if(currentQA.answerArray == null) {
			currentQA.answerUser = parseInt($("#formQA #answer_number").val());
			if(isNaN(currentQA.answerUser)) {
				currentQA.answerUser = 0;
			}
			//reset form
			$("#formQA #answer_number").val("");
		//case of most of Technical Pictures
		} else {
			currentQA.answerUser = $( "#answer_select option:selected" ).val();
			//reset form
  			$( "#answer_select").empty();  
		}

		//store in a list of user's answers
		answersList[pageNumber] = currentQA.answerUser;
		Session.set('answersList', answersList);

		//next or give answer and correct picture
		if(currentQA.answerUser == currentQA.answerCorrect) {
			$("#next").click();
		} else {
			rep = true;
			$("#formQA").hide();
			giveAnswer(pageNumber);
			$("#filters").slideDown();
			$("#Contraste, #Vibrance, #CorrectifRouge, #CorrectifVert, #CorrectifBleu, \
				#AffinementRouge, #AffinementVert, #AffinementBleu").hide();
		}
	},

	/* reset slider value and image render */
	'click #resetbtn' : function() {
		reset();
		if(pageNumber >= nbrImgMax && pageNumber < nbrImgMax*2 && daltonize ) { // RGB temp
			$("#image"+pageNumber).show();
			var img = document.getElementById("image"+pageNumber);
			var parent = img.parentNode;
			parent.removeChild(parent.children[0]);
		}
		daltonize = false;
	},

	/* display filters block rgb when type chosen */
	'click .typeChosen' : function(event) {
		$('#resetbtn').click(); //RGB TEMP
		type = event.target.id;
		$(".filter").hide();
		if (type == "protanope") {
			$("#filters #CorrectifRouge").slideDown();
			$("#filters #AffinementRouge").slideDown();
		} else if (type == "deuteranope") {
			$("#filters #CorrectifVert").slideDown();
			$("#filters #AffinementVert").slideDown();
		} else {
			$("#filters #CorrectifBleu").slideDown();
			$("#filters #AffinementBleu").slideDown();
		}
	},

	/* change css for selecting picture */
	'click .contentCheck' : function(event) {
		//if not click on check
		if(event.target.id != '') {
			//disable css of each picture
			$('.contentCheck .check').css({ 
				"display": "none"
			});
			//display a check
			$(event.target).next().css ({
				"display": "block"
			});
			//register the id of the selected one
			var idImg = $(event.target).attr('id').split("image")[1];
			//if not original image selected, selected one is the best
			if(idImg.search('Origin')) {
				imgChoice = idImg;
			} else {
				imgChoice = -2; //original image
			}
		}
	},

	/* Next page, pictures to show and to render */
	'click #next' : function(event) {
		pageNumber++; //next page

		//show next picture to render
		if(pageNumber < nbrImgMax*2) { 

			var picNumber = pageNumber;
			zoomIn = false;
			rep = false

			//new filter to change
			currentFilter = tabFilters[pageNumber].valueFilter;

			if(pageNumber >= nbrImgMax) { //change tsl to rvb

				picNumber = pageNumber - nbrImgMax; //convert cause of 2x picture (tsl and rgb)

				//skip this if correct answer from previous serie 
				if (((picSet[picNumber].type == "Ishihara") || (picSet[picNumber].type == "Technique")) && 
					(answersList[picNumber] == picSet[picNumber].QA.fetch()[0].answerCorrect)) {
						$("#next").click();
						return;
				} 

				$("#filters").show();
				//label change to be more user friendly
				$("#filters #CorrectifRouge label, #filters #CorrectifVert label, \
					#filters #CorrectifBleu label").text("Correctif"); 
				$("#filters #AffinementRouge label, #filters #AffinementVert label, \
					#filters #AffinementBleu label").text("Affinement"); 
				if(!daltonize) $(".filter").hide(); //hide all for the 1st time
				$("#choiceType").show();
				// replace question - answer content
				fillQA(picNumber, true);
				daltonize = false;

			} else { //show QA

				$("#filters").hide();
				$("#formQA").show();
				// replace question - answer content
				fillQA(picNumber, false);

			}

			// replace image content
			fillImg(picNumber);

			// init canvas and realise effect
			imageToRender.onload = function() {
				texture = initCanvas("image"+pageNumber);

				//reset slider and picture render if not Esthetic, else set to a previous config
				if ((picSet[picNumber].type == "Ishihara") || (picSet[picNumber].type == "Technique")) {
						reset();
				} else {
						setColorEsthetic();
				}
			}

		//show choice of pictures
		} else if (pageNumber < nbrImgMax*2 + nbrImgMax) {

			/* init of the 2 canvas with his configurations */
			var picNumber = pageNumber - nbrImgMax*2; //first id
			var picNumber2 = pageNumber - nbrImgMax; //second id

			if(pageNumber == nbrImgMax*2) { //first choice   
				$("#imgContent").hide(); /* hide filters, QA and picture containers */
				$("#filters").hide();
				$("#QAcontainer").hide();
				$("#choiceContent").show(); //show choice of pictures container
				$("#next").insertAfter("#choiceImgContent") //move of button next
					.css({
					  "display" : "block",
					  "width" : "250px",
					  "margin" : "0 auto"
					});
			} else {
				//if pic selected, next set of pictures to show
				if (chooseImg()) {
					$('#choiceImgContent').hide().show("slide", {
						direction: "right"
					}, 300);

					$('.contentCheck .check').css({ 
						"display": "none"
					});
				} else {
					return;
				}
				imgChoice = -1;
			}

			currentFilter = tabFilters[picNumber].valueFilter;
			var modif = false
			//search for one config with at least one value changed
			$.map( currentFilter, function( value, key ) {
				if(value != 0) modif = true;
			});
			if (!modif) {
				currentFilter = tabFilters[picNumber2].valueFilter;
				//search for one config with at least one value changed
				$.map( currentFilter, function( value, key ) {
					if(value != 0) modif = true;
				});
			//skip this if no modif on this picture
				if(!modif) {
					imgChoice = -2;
					$("#next").click();
					return;
				}
			} 

			currentFilter = tabFilters[picNumber].valueFilter;

			fillImg(picNumber, 0); //replace choice content for imageOrigin
			// replace choice content for img 1
			fillImg(picNumber, 1);

			// init canvas, render and realise effect
			imageToRender.onload = function() {
				// replace choice content for img 2
				fillImg(picNumber, 2);

				//init and render canvas 1
				texture = initCanvas("image"+picNumber, false, 1);
				applyFilters(picNumber, false);

				// init canvas, render and realise effect
				imageToRender.onload = function() {
					currentFilter = tabFilters[picNumber2].valueFilter;
					//init and render canvas 2
					texture2 = initCanvas("image"+picNumber2, true, 2);
					applyFilters(picNumber2, true);
				}
			}

		//show form
		} else {

			//if last pic selected, show form
			if (chooseImg()) {
				$("#choiceContent").hide();
				$("#field_user").show();
				$("#next").hide();
			}

		}

		//progress bar update
		progress(parseInt((pageNumber/(nbrImgMax*3))*100), $('#progressBar'));
	}
});


/* At startup */
Template.CorrectionTool.onRendered(function(){
	/* Every Picture collections in DB */
	picSet = Picture.find({}, {sort: {fileName: 1}}).fetch();

	//Number of pics
	nbrImgMax = picSet.length;

	//the current page
	pageNumber = 0;

	//progress bar show
	progress(0, $('#progressBar'));

	/* 
	  Init tabFilters, which will contain each filter value of each image rendered 
	  And return the current filter (the first one)
	*/
	currentFilter = initTabFilters();
	//Init a list for every answers of the user
	answersList = [];

	// replace image content
	fillImg(pageNumber);

	// replace question - answer content
	fillQA(pageNumber, false);

	// create an new instance of a pixi stage and his sprite
	stage = new PIXI.Stage(0xFFFFFF, true);
	sprite = new PIXI.Sprite (new PIXI.Texture.fromImage(srcImg));
	stage.addChild(sprite);

	// try to create 2 WebGL canvas (will fail if WebGL isn't supported)
	try {
		canvas = fx.canvas(); 
	} catch (e) { 
		alert(e);
		return;
	}
	try {
		canvas2 = fx.canvas(); 
	} catch (e) {  
		alert(e); 
		return;
	}    

	/* Resolve the bug of working on the image while it's not load yet ! */
	imageToRender.onload = function() {
		//init of the canvas which substitute the image
		texture = initCanvas("image"+pageNumber, false);
	}

	/* Init slider and event slider 
	if value change, image render change */
	$( ".filterSetting" ).slider({
		  max: 100,
		  min: 0,
		  step: 1,
		  value: 0,
		  from: 0,
		  slide : function( event, ui ) {
			  var parent = $(event.target.parentElement);
			  update(0, parent, ui.value);
		  }
	}); 
	/* slider for daltonization isn't exactly the same */
	$( "#AffinementRouge .filterSetting" ).slider({
		  min: -100
	});
	/* slider for daltonization isn't exactly the same */
	$( "#AffinementVert .filterSetting" ).slider({
		  min: -100
	});
	/* slider for daltonization isn't exactly the same */
	$( "#AffinementBleu .filterSetting" ).slider({
		  min: -100
	});
});

/* Update bar progress to show the progression of the user in the app */
function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('span').animate({ width: progressBarWidth }, 300).html(percent + "% ");
}

/*  Replace the image content with image n°picNumber
 *  and the question label associate
 * 	picNumber = index of current picture
 *	i is not undefined if function is called from choice of pictures
 */
function fillImg(picNumber, i) {
	//picture from current page
	var picture = picSet[picNumber];
	srcImg = "pictures/correction_tool/"+picture.type+"/"+picture.fileName;

	/* Fill in image */
	imageToRender = document.createElement("img");
	var nbr = picture.fileName.split('.')[0].split('image')[1];
	var nbrNew = parseInt(nbr);
	//if rgb, id is different from first set of picture
	if ((pageNumber >= nbrImgMax && pageNumber < nbrImgMax*2) || i == 2) {
		nbrNew += nbrImgMax;
	}
	if (i==0) { //id for imageOrigin during the choice of picture
		imageToRender.id = "imageOrigin"+parseInt(nbr)
	} else { //current id
		imageToRender.id = picture.fileName.split('.')[0].replace(nbr,nbrNew);
	}
	imageToRender.src = srcImg;

	/* Replace content */
	var content;
	if(typeof i != "undefined") { //during choice
		content = $($('.contentCheck')[i]);
	} else {
		content = $('#imgContent');
	}
	content.children()[0].remove();
	content.prepend(imageToRender);
}

/* 	Functions glfx to init image render with replacing it with a canvas 
 *	childNum is for choice of pictures
		//image.src = canvas.toDataURL('image/svg');
		//$(parent.children).attr('data-action', 'zoom');
 */
function initCanvas(imgId, double) {
	var image = document.getElementById(imgId);
	var parent = image.parentNode;
	if(!double) {
		texture = canvas.texture(image);
		canvas.draw(texture).update();
		// replace the image with the canvas
		parent.insertBefore(canvas, image);
		parent.removeChild(image);
		/*$(canvas).appendTo($(parent)).show("slide", { TODO
					direction: "right"
				}, 200);*/
		parent.children[0].id = imgId; //add the id to the canvas
		$("#"+imgId).show();
		return texture;
	} else {
		texture2 = canvas2.texture(image);
		canvas2.draw(texture2).update();
		// replace the image with the canvas2
		parent.insertBefore(canvas2, image);
		parent.removeChild(image);
		parent.children[0].id = imgId; //add the id to the canvas
		$("#"+imgId).show(); 
		return texture2;
	}
}

/* Replace the informations in Question-Answer container 
 * picNumber = index of current picture
 * serie2 = true if it's a picture show for the second time (filters daltonize)
 */
function fillQA (picNumber, serie2) {
	var currentQA = picSet[picNumber].QA.fetch()[0];

	// Fill in the question label with the question associate with picture
	$( "#question" ).text(currentQA.question);

	if(serie2) {
		//case of Esthetic pictures
		if (currentQA.answerCorrect == null) {
			$("#filters #answerGiven").hide();
			$("#filters #infoFilters").hide();
		} else {
			giveAnswer(picNumber);
			$("#filters #infoFilters").show();
		}
	} else {
		//case of Esthetic pictures
		if (currentQA.answerCorrect == null) {
			$("#formQA").hide();
			$("#filters #answerGiven").hide();
			$("#filters #infoFilters").hide();
			$("#filters #CorrectifRouge, #filters #CorrectifVert, #filters #CorrectifBleu, \
					 #filters #AffinementRouge, #filters #AffinementVert, #filters #AffinementBleu, \
					#filters #Contraste, #filters #Vibrance").hide();
			$("#filters").slideDown();
		//case of Technical pictures
		} else if(currentQA.answerArray != null) {
			$("#formQA #answer_number").hide();
			$("#formQA #infoNumber").hide();
			$('#answer_select').append('<option value="inconnu">Je ne sais pas</option>');
			//foreach answer, add the value to the list to select
			$.each(currentQA.answerArray, function(index, value) {
				$('#answer_select').append('<option value="'+ value +'">'+ value +'</option>');
			});
			$("#formQA #answer_select").show();
		//case of Ishihara plates
		} else {
			$("#formQA #answer_select").hide();
			$("#formQA #answer_number").show();
			$("#formQA #infoNumber").show();
		}
	}
}


/* Give answer to User to help him to correct the picture n°picNumber appropriatly */
function giveAnswer (picNumber) {
	var currentAnswer = picSet[picNumber].QA.fetch()[0].answerCorrect;
	if (currentAnswer == 0) currentAnswer = "Aucun";
	$( "#answerGiven" ).text("La réponse est : " + currentAnswer).show();
}

/* 
  Init tabFilters, which will contain each filter value of each image rendered 
  And return the current filter (the first one)
*/
function initTabFilters() {
	tabFilters = {};
	for(j=0 ; j<nbrImgMax*2 ; j++) {
		var valueFilter = {};
		for(i=0 ; i < $( ".filterValue" ).length ; i++) {
			valueFilter[$( ".filter" )[i].id] = parseFloat($( ".filterValue" )[i].textContent);
		}
		var picNumber = j;
		if (j >= nbrImgMax) {
			picNumber = j - nbrImgMax;
		}
		//correction_profile
		tabFilters[j] = {
			type : picSet[picNumber].type,
			CB_Type : "undefined",
			isBest : false,
			valueFilter : valueFilter //filters
		};
	}
	//tabFilters is directly put in session for each change
	Session.set('tabFilters', tabFilters);
	return tabFilters[pageNumber].valueFilter; //return the first one after init
}

/* Reset slider value and image render */
function reset() {
	$( ".filterValue" ).text(0);
	$( ".filterSetting" ).slider({value: 0});
	$.map( currentFilter, function( value, key ) {
	  currentFilter[key] = 0;
	});
	applyFilters(pageNumber, false);
}

/* 	Set color to slider value and image render 
 *	for esthetic pictures with previous configurations.
 */
function setColorEsthetic () {
	var continuer = true, //to stop if one config find
		picIndex = 0; //current picture's index

	//stop only if 0 or 1 config find
	while (continuer && picIndex < nbrImgMax) {
		//for esthetic with tsl sliders
		if (pageNumber < nbrImgMax) {
			currentFilter = tabFilters[picIndex].valueFilter;
		} else {
			currentFilter = tabFilters[nbrImgMax+picIndex].valueFilter;
		}
		//search for one config with at least one value changed
		$.map( currentFilter, function( value, key ) {
			if(value != 0) continuer = false;
		});
		console.log(picIndex);
		picIndex++;
	}
   	
	//update values from previous configuration
	$.map( currentFilter, function( value, key ) {
		value = value*100;
		console.log(value);
		//conversion for fitler hue (0 to 100 and -100 to -50)
		if(key ==  "Teinte") {
			if(value < -50) {
				value = value + 150;
			} else {
				value = parseInt(value / 2);
			}
		}
		console.log(value);
		$( "#"+ key + " .filterValue" ).text(value);
		$( "#"+ key + " .filterSetting" ).slider({value: value});
	});
	applyFilters(pageNumber, false);
}

/* 
  Update value of slider text and image render in the same time for a tool input 
	tool 0 : slider (in this case, val is an input too)
	tool 1 : less
	tool 2 : more
  parent = the filter content
  val = the value define by the user
*/
function update(tool, parent, val) {
	var filterName = parent.attr('id');
	if(tool != 0) { //case of - / + tools
		val = parseInt(parent.children(".filterValue").text()); //retrieve ex value
		//for -, if val > 0 we can do anytime and if it's > -100 juste for some filters
		if (tool == 1 && (   (val > 0)  
							 || ( (val > -100) && ((filterName == "AffinementRouge") || 
							 	 (filterName == "AffinementVert") || (filterName == "AffinementBleu")) ) ) ) { 
			val = val - 1; 
		} else if (tool == 2 && val < 100) { 
			val = val + 1; 
		} else return;
		parent.children(".filterSetting").slider({value: val}); //update value slider
	}
	parent.children(".filterValue").text(val);                //update value text      	
	//conversion for fitler hue (0 to 100 and -100 to -50)
	if(filterName ==  "Teinte") {
		if(val < 50) {
			val *= 2;
		} else {
			val = val - 150;
		}
	}
	currentFilter[filterName] = val/100;                      //update image render
	applyFilters(pageNumber, false);
}

/*  Apply the webgl filters to image imgNbr
	double = true if picture comes from choiceContent 
*/
function applyFilters(imgNbr, double) {
	tabFilters = Session.get('tabFilters');
		//set the current filter as datas
		tabFilters[imgNbr].valueFilter = currentFilter;
		//set the type of color blindness chosen if rgb filters (warning it's changed only if filter change !)
		if(pageNumber >= nbrImgMax && pageNumber < nbrImgMax*2) tabFilters[imgNbr].CB_Type = type;
		var currentType = tabFilters[imgNbr].CB_Type;
	Session.set('tabFilters', tabFilters);

	if(!double) {
	  //webgl application
	  canvas.draw(texture).brightnessContrast(currentFilter["Luminosité"], currentFilter["Contraste"])
						.hueSaturation(currentFilter["Teinte"], currentFilter["Saturation"])
						.vibrance(currentFilter["Vibrance"])
						.update();
	} else {
	  //webgl application
	  canvas2.draw(texture2).brightnessContrast(currentFilter["Luminosité"], currentFilter["Contraste"])
						.hueSaturation(currentFilter["Teinte"], currentFilter["Saturation"])
						.vibrance(currentFilter["Vibrance"])
						.update();
	}

	//filters RGB
	if(currentType != "undefined") {
		if(currentType == "protanope") Daltonize("Protanope", currentFilter["CorrectifRouge"], currentFilter["AffinementRouge"], imgNbr, double);
		else if(currentType == "deuteranope") Daltonize("Deuteranope", currentFilter["CorrectifVert"], currentFilter["AffinementVert"], imgNbr, double);
		else Daltonize("Tritanope", currentFilter["CorrectifBleu"], currentFilter["AffinementBleu"], imgNbr, double);  
	}
}
	

/* 
 *	Try to correct the color blindness using pixi js 
 *	type = type of color blindness
 *	amountDalto = 0 to 1
 *	amountTransf = -1 to 1
 *	imgNbr = id of the current picture to render
 * 	double = true if picture comes from the "choiceContent"
 */
function Daltonize(type, amountDalto, amountTransf, imgNbr, double){
	
	/* with pixi js
	daltonize = true;

	// add the src of picture (orgin) 
	stage.removeChild(sprite);
	sprite = new PIXI.Sprite (new PIXI.Texture.fromImage(srcImg));
	stage.addChild(sprite);

	//get the picture node
	var img = document.getElementById("image"+imgNbr);
	var parent = img.parentNode;
	if (parent.children.length > 1) parent.removeChild(parent.children[0]);

	// Daltonize algo call
	Color.Vision.Daltonize(img, stage, {
		type : type,
		amountDalto : amountDalto-1,
		amountTransf : amountTransf/2,
		callback : function(canvas) {
			// replace with new rendered picture
			$('#imgContent').prepend(canvas); //correction in normal vision
			//parent.children[0].id = img.id; //add the id to the canvas
			//parent.removeChild(parent.children[1]); //delete img
		}
	});
	*/

	/* without pixi js */
	daltonize = true;

	$("#image"+imgNbr).hide();
	var img = document.getElementById("image"+imgNbr);
	var parent = img.parentNode;
	if (parent.children.length > 1 && !double) parent.removeChild(parent.children[0]);
	Color.Vision.Daltonizing(img, { //correction in normal vision
	  type:type,
	  amountDalto : amountDalto-1,
	  amountTransf : amountTransf/2,
	  callback:function(canvas){
		// insert the render with the canvas
		parent.insertBefore(canvas, img);
		if(!double) {
			parent.children[0].id = "daltonize"; //add the id to the canvas
		} else { //if canva of pictures choice
			parent.removeChild(parent.children[1]);
			parent.children[0].id = "image"+imgNbr; //add the id to the canvas
		}
	  }
	});

};

/* Change selected picture in our tabFilter, or notify if not */
function chooseImg() {
	if (imgChoice != -1) {    //choice done
		if (imgChoice != -2) {  //not original image chosen
			tabFilters[imgChoice].isBest = true;
			Session.set('tabFilters', tabFilters);
		}
		$('#choiceError').hide();
		return true;
	} else {                  //no pic chosen
		pageNumber--;
		$('#choiceError').fadeIn();
		return false;
	}
}