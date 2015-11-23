  //publish of survey
  Meteor.publish('survey', function(currentUser){
      //Admin can see every surveys
      if(currentUser && currentUser.username === "admin") {
        return survey.find(); 
      } else {
        return survey.find({ display : true }); 
      }
  });