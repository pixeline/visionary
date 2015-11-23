Template.Survey.events({
    'click #addSurvey': function(event){
        event.preventDefault();
    
        //Collection survey 
        var survey = {
              name : $('input[name=name]').val(),
              root_url : $('input[name=root_url]').val(),
              date_created : new Date(),
              max_reset_counter : parseInt($('input[name=max_reset_counter]').val()),
              display : $('input[name=display]')[0].checked
        };
        
        //Insert survey in mongoDB - call to server-side
        Meteor.call('insertSurvey', survey, function(error, result){
            // display error or go on
            if(error) {              
                sAlert.error(error.reason);  
                sAlert.error('L\'insertion du questionnaire a échoué.');
            } else {
                //redirection to detailed Survey page
                console.log(result._id);
            }
        }); 
    },
    
    'click #removeSurvey': function(event){
        var confirm = window.confirm("Supprimer ce questionnaire ?");
        event.preventDefault();
    }
});