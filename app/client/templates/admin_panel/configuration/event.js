/* check if not null */
function checkName (aString) {  
  aString = aString || '';
  return aString.length > 0;
}
/* url must be void or /url */
function checkUrl (aString) {  
  aString = aString || '';
  if(aString.length > 1) {
      return aString[0] == "/";
  } else if (aString.length == 0) {
      return true;
  } else {
      return false;
  }
}
/* check if a number >= 0 for authorized reset */
function checkNumber (aNumber) {  
  return !isNaN(aNumber) && aNumber >= 0;
}
/* only one survey displayed */
function checkDisplay (display) {  
  if(display) {
      var surveyActive = survey.findOne({display : true});
      return (typeof surveyActive == "undefined");
  } else {
      return true;
  }
}

Template.Survey.events({
    
    /* validation for survey form and call to server to add the survey */
    'click #addSurvey': function(event){
        event.preventDefault();
        
        //Collection survey 
        var survey = {
              name : $('input[name=name]').val(),
              root_url : $('input[name=root_url]').val(),
              max_reset_counter : parseInt($('input[name=max_reset_counter]').val()),
              display : $('input[name=display]')[0].checked,
              date_created : new Date().toLocaleString()
        };
        
        var isValidName = checkName(survey.name);
        var isValidUrl = checkUrl(survey.root_url);
        var isValidCounter = checkNumber(survey.max_reset_counter);
        var isValidDisplay = checkDisplay(survey.display);
        
        if (!isValidName || !isValidUrl || !isValidCounter || !isValidDisplay) {
            if (!isValidName) {
              sAlert.error('Nom de questionnaire invalide');
            }
            if (!isValidUrl) {
              sAlert.error('L\'url doit être de type \"/url\".');
            }
            if (!isValidCounter) {
              sAlert.error('Compteur invalide.');
            }
            if (!isValidDisplay) {
              sAlert.error('Un seul questionnaire peut être affiché.');
            }
        } else {
            //Insert survey in mongoDB - call to server-side
            Meteor.call('insertSurvey', survey, function(error, result){
                // display error or go on
                if(error) {              
                    sAlert.error('L\'insertion du questionnaire a échoué.');
                }
            }); 
        }
    },
    
    /* remove the survey selected if confirm */
    'click #removeSurvey': function(event){
        event.preventDefault();
        var confirm = window.confirm("Supprimer ce questionnaire ?");
        var idSurvey = $(event.target.parentNode.parentNode).attr('id');
        if(confirm) {
            //Insert survey in mongoDB - call to server-side
            Meteor.call('removeSurvey', idSurvey, function(error, result){
            // display error or go on
            if(error) {               
                sAlert.error('La suppression du questionnaire a échoué.');
            }
        }); 
        }
    },
    
    /* visit page of survey selected */
    'click tr.survey_line': function(event){
        event.preventDefault();
        var idSurvey = $(event.target.parentNode).attr('id');
        if (typeof idSurvey != "undefined") {
            Router.go('Survey', idSurvey);
        }
    }
});