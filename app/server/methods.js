/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  
    /* Insert Survey */ 
    'insertSurvey': function(surveyObj) { 
        //Check server-side
        check(surveyObj, {
              name : String,
              root_url : String,
              max_reset_counter : Number,
              display : Boolean,
              date_created : String
        });
        console.log(surveyObj);
        //Insert survey data's in MongoDB (+ verification of admin)
        var currentUser = Meteor.user();
        if(currentUser && currentUser.username === "admin"){
            return survey.insert(surveyObj);
        } else {
            throw new Meteor.Error("Unauthorized", "Insertion non-autorisée");
        }   
    },
    
    /* Remove Survey */ 
    'removeSurvey': function(surveyId){
        //Remove survey data's in MongoDB (+ verification of admin)
        var currentUser = Meteor.user();
        if(currentUser && currentUser.username === "admin"){
            survey.remove({_id: surveyId});
        } else {
            throw new Meteor.Error("Unauthorized", "Suppression non-autorisée");
        } 
    },
    
});
