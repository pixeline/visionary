var srcImg;
var stage, sprite;
var mode = "";
var currentValueDalto = 0.0;
var currentValueTransf = 0.0;
var currentValueSat = 0.0;
var currentValueHue = 0.0;

/* At startup */
Template.Daltonize.onRendered (function(){

	var picSet = Picture.find({}, {sort: {fileName: 1}}).fetch();
	var picUpload = Images.find({}, {sort: {uploadedAt:-1}}).fetch();

	//foreach picture uploaded, add it to the list of pictures
	$.each(picUpload, function(index, value) {
		$('#img_select').append('<option id="'+ value._id +'" value="'+ value.url() +'">'+ index +'</option>');
	});

	//foreach picture object, add his filename to the list of pictures
	$.each(picSet, function(index, value) {
		$('#img_select').append('<option value="'+ value.type +'">'+ value.fileName +'</option>');
	});

	//select the first one
  	$('#img_select').change();

	$('#simTxt').hide();
	$('#correcTxt').hide();
	$('#img p').hide();
	$('#image').css("width", "100%");

	/* As soon as any slider value change, image render change */
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

	/* As soon as any slider value change, image render change */
	$( "#transform .filterSetting" ).slider({
		  min: -100
	}); 
	$( ".filter" ).hide();

    // create an new instance of a pixi stage
    stage = new PIXI.Stage(0xFFFFFF, true);
    sprite = new PIXI.Sprite (new PIXI.Texture.fromImage(srcImg));
    stage.addChild(sprite);

});

/* Event daltonize */
Template.Daltonize.events({
	//to upload images
	'change .myFileInput': function(event, template) {
	    FS.Utility.eachFile(event, function(file) {
			var fileObj = Images.insert(file, function (err, result) {
				if (err){
						console.log('error', err);
				} else {
					// handle success depending what you need to do
					var userId = Meteor.userId();
					var imagesURL = {
						"profile.image": "/cfs/files/images/" + result._id
					};
					Meteor.users.update(userId, {$set: imagesURL});
				}
			});

			fileObj.on('uploaded', function () {
		        //refresh page after upload
		        $(".refresh").submit();
			});
	    });
	},
	//to remove image
	'click #img_remove_btn': function(event, template) {
		var picSelect = $( "#img_select option:selected" );
		if(picSelect.text().indexOf("image") > -1) {
			alert("Pas celle là !");
		} else {
			var picIdRemove = picSelect.attr("id");
			Images.remove({_id:picIdRemove}, function (err, result) {
				if (err){
					console.log('error', err);
				} else {
				}
			});
			picSelect.remove();
  			$('#img_select').change();
		}
	},
	//change picture when select
	'change #img_select': function(event){
		var picSelect = $("#img_select option:selected");
		if(picSelect.text().indexOf("image") > -1) {
			//picture from application
			srcImg = "pictures/correction_tool/"+picSelect.val()+"/"+picSelect.text();
		} else {
			//uploaded picture
			srcImg = picSelect.val();
		}
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
	} else if(parent.attr('id') == "transform") {
		currentValueTransf = val/100;          //update value of image render to tranform
	} else if(parent.attr('id') == "saturation") {
		currentValueSat = val/10;          	//update value of image render to saturation
	} else {
		currentValueHue = val*3.6;          	//update value of image render to hue
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
	$( ".filter" ).show();
	if(sim) {
		$('#simTxt').show();
		$('#correcTxt').hide();
		$("#transform, #saturation, #teinte").hide();
	} else {
		$('#simTxt').hide();
		$('#correcTxt').show();
	}
}

/* return image content with a new url if not null */
function recupImg () {
	var image = document.getElementById("image");
	image.src = srcImg;
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
		amount:currentValueDalto,
		callback:function(canvas){
			$('#imgContentD').append(canvas);
		}
	});
	Color.Vision.Simulate(image,{
		type:"Deuteranope",
		amount:currentValueDalto,
		callback:function(canvas){
			$('#imgContentD').append(canvas);
		}
	});
	Color.Vision.Simulate(image,{
		type:"Tritanope",
		amount:currentValueDalto,
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

	Color.Vision.Simulate(image,{
		type:type,
		amount:currentValueDalto,
		callback:function(canvas){
			$('#imgContentD').append(canvas);
		}
	});
	Color.Vision.Dalto (image, {
		type:type,
		amountDalto:currentValueDalto-1,
		amountTransf:currentValueTransf/2,
		amountHue:currentValueHue,
		amountSaturation:currentValueSat,
		callback:function(canvas){
			$('#imgContentD').append(canvas); //correction in normal vision
			Color.Vision.Simulate(canvas,{
				type:type,
				amount:currentValueDalto,
				callback:function(canvas){
					$('#imgContentD').append(canvas);
				}
			});
		}
	});
};

