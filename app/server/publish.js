  //publish of survey
  Meteor.publish('survey', function(currentUser){
      //Admin can see every surveys
      if(currentUser && currentUser.username === "admin") {
        return survey.find(); 
      } else {
        return survey.find({ display : true }); 
      }
  });
  
  //publish of module_survey
  Meteor.publish('module_survey', function(){
	    return module_survey.find();
  });
  
  //publish of picture_admin
  Meteor.publish('picture_admin', function(){
	    return picture_admin.find();
  });
  
  //publish of picture_admin
  Meteor.publish('instruction', function(){
	    return instruction.find();
  });
  
  //publish of info_txt
  Meteor.publish('info_txt', function(){
	    return info_txt.find();
  });
  
  //publish of sorted_color_admin
  Meteor.publish('sorted_color_admin', function(){
	    return sorted_color_admin.find();
  });
  
  //publish of filter_admin
  Meteor.publish('filter_admin', function(){
	    return filter_admin.find();
  });
  
  //publish of field_form
  Meteor.publish('field_form', function(){
	    return field_form.find();
  });
  
  
  //publish of admin
  Meteor.publish("admin", function() {
      return Meteor.users.find({}, {username: "admin"});
  });   