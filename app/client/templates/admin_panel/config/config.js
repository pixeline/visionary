/* helper of the homepage configuration panel */
Template.Config.helpers ({
    'survey': function(){
        return survey.find();
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    }
});

/* action on a survey */
Template.Config.events ({
    //disable the current active survey and active the selected one
    'click .activeSurvey': function(event) {
        var idSurvey = survey.findOne({ state : true })._id;
        Meteor.call('updateStateSurvey', idSurvey, false);
        idSurvey = $(event.target).parents(".surveyInserted").attr("id");
        Meteor.call('updateStateSurvey', idSurvey, true);
    },
    'click .duplicateSurvey': function(event) {
        
    },
    'click .removeSurvey': function(event) {
        
    }
});

/* helper for each input in configuration panel */
Template.InputAdmin.helpers ({
    //to have a particular id for each input field
    'getId': function(id1, id2, id3){
        if (id3) {
            return id1+id2+id3;
        } else if (id2) {
            return id1+id2;
        } else {
            return id1;
        }
    }
});

/* helper for each area text in configuration panel */
Template.TextAreaAdmin.helpers ({
    //to have a particular id for each areatext field
    'getId': function(id1, id2){
        if(id2) {
            return id1+id2;
        } else {
            return id1;
        }
    }
});