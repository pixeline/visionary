/* Give some default values */
Template.ConfigSurvey.helpers ({
    surveyDefault : function(){
        return Meteor.settings.public.admin_panel.survey[0];
    }
});

/* Submitting informations of the survey to add */
Template.ConfigSurvey.events ({
    'submit #storeSurvey' : function(event) {
        event.preventDefault();
        sessionStorage.clear();
        //survey's informations
        var surveyToAdd = {
            nameSurvey : $('[name=nameSurvey]').val(),
            urlSurvey : $('[name=urlSurvey]').val(),
            maxReset : $('[name=maxReset]').val(),
            maxSatis : parseInt($('[name=maxSatis]').val()),
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