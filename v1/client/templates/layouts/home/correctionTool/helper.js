/* Use of attributes to reuse in the template CorrectionTool */
Template.CorrectionTool.helpers({  
  //picture stored 
  img: function() {
    return Picture.find({}, {sort: {fileName: 1}});
  },
  imgOriginAttributes: function (type, fileName, zoom) {
    var nbr = fileName.split('.')[0].split('image')[1];
    return {
      class: "img-responsive",
      id: ("imageOrigin"+parseInt(nbr)) + zoom,
      src: "pictures/correction_tool/"+type+"/"+fileName
    }
  },
  filter: [ //id of each filter 
	    "Teinte",
	    "Saturation",
	    "Luminosité",
	    "Contraste",
	    "Vibrance",
	    "CorrectifRouge",
      "AffinementRouge",
      "CorrectifVert",
      "AffinementVert",
      "CorrectifBleu",
      "AffinementBleu"
  ]
}); 

/* Using informations of the user in the template Profile */
Template.Profile.helpers({
  user: function() {
    return User.findOne({}, {sort: {createdAt: -1} });
  }
});  