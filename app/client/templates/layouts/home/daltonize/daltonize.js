var srcImg;
var stage, sprite;
var mode = "";
var currentValueDalto = 0.0;
var currentValueTransf = 0.0;

/* At startup */
Template.Daltonize.onRendered (function(){
 
	var picSet = Picture.find({}, {sort: {fileName: 1}}).fetch();

	//foreach picture object, add his filename to the list of pictures
	$.each(picSet, function(index, value) {
		$('#img_select').append('<option value="'+ value.type +'">'+ value.fileName +'</option>');
	});
	//add src to img tag
	srcImg = "pictures/correction_tool/"+picSet[0].type+"/"+picSet[0].fileName;
	document.getElementById('image').src = srcImg;

	$('#simTxt').hide();
	$('#correcTxt').hide();
	$('#img p').hide();
	$('#image').css("width", "100%");

	/* As soon as any slider value change, image render change */
	$( ".filterSetting" ).slider({
		  max: 100,
		  min: -100,
		  step: 1,
		  value: 0,
		  from: 0,
		  slide : function( event, ui ) {
			  var parent = $(event.target.parentElement);
			  update(0, parent, ui.value);
		  }
	}); 
	$( ".filter" ).hide();

    // create an new instance of a pixi stage
    stage = new PIXI.Stage(0xFFFFFF, true);
    sprite = new PIXI.Sprite (new PIXI.Texture.fromImage(srcImg));
    stage.addChild(sprite);
});

/* Event daltonize */
Template.Daltonize.events({
	//change picture when select
	'change select': function(event){
		var picSelect = $( "#img_select option:selected" );
		srcImg = "pictures/correction_tool/"+picSelect.val()+"/"+picSelect.text();
		document.getElementById('image').src = srcImg;
	},
	'submit .img-change': function(event){
		event.preventDefault();
	},
	/* Ask simulation */
	'click #sim': function(){
		changeImgBefore();
		var image = recupImg();
		image.onload=function(){
			Simulate(image);
			changeImgAfter(true);
		};
		mode = "sim";
	},
	/* Ask correction */
	'click #correcP': function(){
		changeImgBefore();
		var image = recupImg();
		image.onload=function(){
			Daltonize("Protanope", image);
			changeImgAfter(false);
		};
		mode = "correcP";
	},
	/* Ask correction */
	'click #correcD': function(){
		changeImgBefore();
		var image = recupImg();
		image.onload=function(){
			Daltonize("Deuteranope", image);
			changeImgAfter(false);
		};
		mode = "correcD";
	},
	/* Ask correction */
	'click #correcT': function(){
		changeImgBefore();
		var image = recupImg();
		image.onload=function(){
			Daltonize("Tritanope", image);
			changeImgAfter(false);
		};
		mode = "correcT";
	}
});

/* 
  Update value of slider text and image render in the same time for a tool input 
	tool 0 : slider (in this case, val is an input too)
	tool 1 : less
	tool 2 : more
*/
function update(tool, parent, val) {
	parent.children(".filterValue").text(val); //update value text    
	if(parent.attr('id') == "daltonize") {
		currentValueDalto = val/100;           //update value of image render to daltonize
	} else {
		currentValueTransf = val/100;          //update value of image render to tranform
	}
	changeImgBefore();
	var image = recupImg();
	image.onload=function(){
		if(mode=="sim") {
			Simulate(image);
			changeImgAfter(true);
		} else {
			if(mode=="correcP") Daltonize("Protanope", image);
			else if(mode=="correcD") Daltonize("Deuteranope", image);
			else if(mode=="correcT") Daltonize("Tritanope", image);
			changeImgAfter(false);
		}
	};
}

/* Used to resize before render */
function changeImgBefore() {
	$('#image').hide();
	$('#img p').show();
	$('#image').css("width", "auto"); 
}

/* Used to show in appropriate size after render */
function changeImgAfter(sim) {
	$('#image').css("width", "100%"); 
	$('#image').show();
	$('#img p').hide();
	$('canvas').css("width", "25%"); 
	if(sim) {
		$('#simTxt').show();
		$('#correcTxt').hide();
	} else {
		$('#simTxt').hide();
		$('#correcTxt').show();
	}
	$( ".filter" ).show();
}

/* return image content with a new url if not null */
function recupImg () {
	var image = document.getElementById("image");
	var url = $('#url').val();
	if(url != '') {
		image.src = url;
		image.crossOrigin = ''
	} else {
		image.src = srcImg;
	}
	return image;
}

/* Simulate color blindness for the 3 types */
function Simulate(image){
	$('#img').append(image); //normal vision

	/* remove content to replace with new rendered pictures soon */
	var content = document.getElementById('imgContentD');
	while (typeof content.children[1] != 'undefined') {
		content.removeChild(content.children[1]);
	}

	Color.Vision.Simulate(image,{
		type:"Protanope",
		amount:0.5+currentValueDalto/2,
		callback:function(canvas){
			$('#imgContentD').append(canvas);
		}
	});
	Color.Vision.Simulate(image,{
		type:"Deuteranope",
		amount:0.5+currentValueDalto/2,
		callback:function(canvas){
			$('#imgContentD').append(canvas);
		}
	});
	Color.Vision.Simulate(image,{
		type:"Tritanope",
		amount:0.5+currentValueDalto/2,
		callback:function(canvas){
			$('#imgContentD').append(canvas);
		}
	});

	

};

/* Try to correct the color blindness for the type in input (using pixi js) */
function Daltonize(type, image){
	$('#img').append(image); //normal vision

	/* remove content to replace with new rendered pictures soon */
	var content = document.getElementById('imgContentD');
	while (typeof content.children[1] != 'undefined') {
		content.removeChild(content.children[1]);
	}

    stage.removeChild(sprite);
    sprite = new PIXI.Sprite (new PIXI.Texture.fromImage(srcImg));
    stage.addChild(sprite);

	Color.Vision.Daltonize(image, stage, {
		type:type,
		amountDalto:currentValueDalto/2 - 0.5,
		amountTransf:currentValueTransf/2,
		callback:function(canvas){
			$('#imgContentD').append(canvas); //correction in normal vision
			
		}
	});
};

