/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  
    /* Insert Data of User and his Correction Profiles */ 
    'insertSurvey': function(surveyObj) { 
        //Check server-side
        check(surveyObj, {
              name : String,
              root_url : String,
              date_created : Date,
              max_reset_counter : Number,
              display : Boolean
        });
        
        //Insert survey data's in MongoDB
        
        var currentUser = Meteor.user();
        if(currentUser && currentUser.username === "admin"){
            return survey.insert(surveyObj);
        } else {
            throw new Meteor.Error("Unauthorized", "Insertion non-autorisée");
        }   
    }
    
});
