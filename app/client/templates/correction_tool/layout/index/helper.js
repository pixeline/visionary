/* Use of attributes to reuse in the template Index */
Template.Index.helpers({
    //put survey configuration in session at the startup
    //Warning : have to pass here to init survey
    preLoadFunction : function () {
        var surveyInput = survey.find().fetch()[0];
        var currentSurvey = new Collection.Survey(surveyInput.name, surveyInput.root_url, surveyInput.state, 
                                    surveyInput.date_created, surveyInput.max_reset_counter, surveyInput.max_satis,
                                    surveyInput.module_survey.fetch(), surveyInput.picture_admin.fetch());
	    satis_counter = 0;
        sessionStorage.setItem("currentSurvey", JSON.stringify(currentSurvey));
    },
    //get the text for the homepage of application
    infoTxt :  function() {
        var module = getCurrentModule("Index");
        var infoTxt = module.info_txt[0];
        return infoTxt;
    }
});