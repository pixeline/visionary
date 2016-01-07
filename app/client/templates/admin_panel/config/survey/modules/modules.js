/* Give some default values */
Template.ConfigModules.helpers ({
    surveyDefault : function(){
        return Meteor.settings.public.admin_panel.survey[0];
    },
    surveyToAdd : function(){
        var survey = JSON.parse(sessionStorage.getItem("surveyToAdd"));
        return survey;
    }
});

/* some utils functions for config */
Template.InputConfig.helpers ({
    //return true if element == "radio"
    isRadio : function(element){
        return element == "radio";
    }
});