/* Give some default values or the values from a previous config */
Template.ConfigSurvey.helpers ({
    //survey from setttings
    surveyDefault : function() {
        return Meteor.settings.public.admin_panel.survey[0];
    },
    //survey to modif
    surveyModif : function () {
        initModify = false;
        stopInit = false;
        return JSON.parse(sessionStorage.getItem("surveyToModify"));
    },
    //return true if the module have to be included, false else
    existModule : function (surveyModif, defaultInclude, toEnable, module_title) {
        if(surveyModif) {
            var exist = false;
            //iterate on module and return true if module exist
            $.each(surveyModif.module_survey, function (index, modCurrent) {
                if (modCurrent.title == module_title) {
                    exist = true;
                    return false;
                }
            });
            if(!exist) toEnable = !toEnable;
            return toEnable;
        } else {
            //if it's just the added template
            return defaultInclude;
        }
    }
});

/* Submitting informations of the survey to add */
Template.ConfigSurvey.events ({
    'submit #storeSurvey' : function(event) {
        event.preventDefault();
        //survey's informations
        var surveyToAdd = {
            name : $('[name=nameSurvey]').val(),
            root_url : $('[name=urlSurvey]').val(),
            max_reset_counter : parseInt($('[name=maxReset]').val()),
            max_satis : parseInt($('[name=maxSatis]').val()),
            sortedTest : $('[name=sortedTest]')[0].checked,
            upload : $('[name=upload]')[0].checked,
        };
        //set in session
        sessionStorage.setItem("surveyToAdd", JSON.stringify(surveyToAdd));
        Router.go("ConfigModules");
    }
});
    
/* 
 * Validate and store survey's data in session
 */
Template.ConfigSurvey.onRendered(function(){
    $('#storeSurvey').validate({ 
        rules: {
            nameSurvey : {
                required: true
            },
            urlSurvey : {
                required: true,
                typeUrl:  true
            },
            maxReset : {
                required: true,
                number: true,
                min:1,
                max:99,
                maxlength: 2
            },
            maxSatis : {
                required: true,
                number: true,
                min:1,
                max:100,
                maxlength: 2
            }
        },
        messages: {
            nameSurvey : {
                required: "Le nom du questionnaire est requis."
            },
            urlSurvey : {
                required: "L'url du questionnaire est requis (de la forme /url)."
            },
            maxReset : {
                required: "Le compteur maximum de reset est requis.",
                number: "true",
                min: "Veuillez encoder un compteur entre 1 et 99.",
                max: "Veuillez encoder un compteur entre 1 et 99."
            },
            maxSatis : {
                required: "Le compteur maximum de satisfaction est requis.",
                number: "true",
                min: "Veuillez encoder un compteur entre 1 et 99.",
                max: "Veuillez encoder un compteur entre 1 et 99."
            }
        }
    });
});

//validate an url like /v1/app
$.validator.addMethod( 'typeUrl', function(url) {
    if (/^(\/([0-9a-z])+)*$/.test(url)) {
        return true;   // PASS validation when REGEX matches
    } else {
        return false;  // FAIL validation
    }
}, "Spécifiez un url de la forme /url");