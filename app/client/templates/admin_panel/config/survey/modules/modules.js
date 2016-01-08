Session.set('nbrImg', 1);

/* Give some default values */
Template.ConfigModules.helpers ({
    surveyDefault : function(){
        return Meteor.settings.public.admin_panel.survey[0];
    },
    surveyToAdd : function(){
        var survey = JSON.parse(sessionStorage.getItem("surveyToAdd"));
        return survey;
    },
    //retrieve the images objects and init reactively the counter of images
    images : function() {
        var nbrImg = Session.get('nbrImg');
        var tabImg = [];
        for(var i = 0; i < nbrImg; i++) {
            var img = {};
            img.order = i+1;
            tabImg.push(img);
        }
        return tabImg;
    }
});

/* Adding img modules template */
Template.ConfigModules.events ({
    'click #addImgLabel' : function (event) {
        var nbrImg = Session.get('nbrImg');
        nbrImg++;
        Session.set('nbrImg', nbrImg);
    }
});

/* some utils functions for config */
Template.InputConfig.helpers ({
    //return true if element == "radio"
    isRadio : function(element){
        return element == "radio";
    }
});

/* some utils functions for config of filters in module img */
Template.ContentModuleImg.helpers ({
    //return every filters for the current module
    filterAdmin : function (module) {
        var surveyConfig = Meteor.settings.public.admin_panel.survey[0];
        var currentModule;
        $.each(surveyConfig.module_survey, function( index, modCurrent ) {
            if(modCurrent.title == module) {
                currentModule = modCurrent;
                return false;
            }
        });
        return currentModule.filter_admin;
    }
});

/* events in Configuration for modules img => toggle an accordion */
Template.ImgAdmin.events ({
    'click .accordion' : function (event) {
        $(event.target.parentNode).next().toggle("slow");
    }
});

/* onrendered the ImgAdmin Template => toggle every modules and filter config */
Template.ImgAdmin.onRendered (function () {
    $(".contentAccordions").toggle();
    $(".contentAccordionsFilter").toggle();
});