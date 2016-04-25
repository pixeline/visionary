  /****************************************************\
  |  Displaying survey and managing survey data CRUD   |
  \****************************************************/
  
/* helper of the homepage configuration panel */
Template.Config.helpers ({
    'survey': function(){
        return survey.find();
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    },
    'nbrImg' : function(picTab) {
        return (picTab.fetch().length);
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
    //go to template of inserting a survey
    'click #addSurveyLink': function(event) {
        event.preventDefault();
        //clean session to avoid a previous configuration
        sessionStorage.clear();
        Session.set('nbrImg', null);
        Router.go("ConfigSurvey");
    },
    //go to template of modification of a survey TODO
    'click .modifier': function(event) {
        event.preventDefault();
        var idSurvey = $(event.target).parents(".surveyInserted").attr("id");
        var surveyToModify = survey.findOne({ _id : idSurvey });
        //we have to formate the collection to access to every field
        surveyToModify = new Collection.Survey(surveyToModify.name, surveyToModify.root_url, surveyToModify.state, 
                                    surveyToModify.date_created, surveyToModify.max_reset_counter, surveyToModify.max_satis,
                                    surveyToModify.module_survey.fetch(), surveyToModify.picture_admin.fetch());
        //set in session
        sessionStorage.setItem("surveyToModify", JSON.stringify(surveyToModify));
        Router.go("ConfigSurvey");
    },
    //duplicate the selected survey TODO
    'click .duplicateSurvey': function(event) {
        sAlert.info('Fonction non-implémentée pour le moment.');
        /*var idSurvey = $(event.target).parents(".surveyInserted").attr("id");
        var survey2 = survey.findOne({ _id : idSurvey });
        //access to controller to insert the same survey
        Controller.InsertSurvey(survey2);*/
    },
    //remove the selected survey
    'click .removeSurvey': function(event) {
        var idSurvey = $(event.target).parents(".surveyInserted").attr("id");
        var state = survey.findOne({ _id : idSurvey }).state;
        if(state === true) {
            sAlert.error('Vous ne pouvez supprimer que les questionnaires non-actifs.');
        } else {
            Controller.RemoveSurvey(idSurvey);
        }
    }
});

  /************************************\
  |  helpers for field in admin panel  |
  \************************************/
  
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