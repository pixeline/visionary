/* event of submitting for template Form */
Template.Form.events({
        //redirect to the next module
        'submit': function (event) {
                event.preventDefault();
        }
});

/* 
 * Validation and inserting user's data for template Form 
 * informations of user, correction_profile_picture 
 * (in relation with current survey) and the correction_result computed for him (TODO)
 */
Template.Form.onRendered(function(){
    $('#userForm').validate({ 
        submitHandler: function(event){

            //store the current path
            var module = getCurrentModule("Form");
            sessionStorage.setItem("lastModule", module.title);
                       
            if(!$('[name=sex]')[0].checked && !$('[name=sex]')[1].checked) {
                sAlert.error('Veuillez sélectionner votre genre.');
            } else {
                //correction on each pictures
                var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
                //survey that the user used
                var surveySession = JSON.parse(sessionStorage.getItem("currentSurvey"));
                //correction resulted
                var correcResult = getResultProfile();
                
                //user's informations
                var user = {
                    name : $('[name=name]').val(),
                    firstname : $('[name=firstname]').val(),
                    email : $('[name=email]').val(),
                    age : parseInt($('[name=age]').val()),
                    sex : $('[name=sex]')[0].checked
                };
                
                //ask an insert in DB
                Controller.InsertUserAndProfiles(user, correction_profiles, surveySession.name, correcResult);
               
            }
                      
        }
    });
});

// Validation rules and messages
$.validator.setDefaults({
    rules: {
        name : {
            required: true
        },
        firstname : {
            required: true
        },
        email : {
            required: false,
            email: true,
            uniqueEmail: true
        },
        age : {
            required: true,
            number: true,
            min:1,
            max:130,
            maxlength: 3
        },
        sex : {
            required: false
        },
        password : {
            required: true,
            minlength: 8
        }
    },
    messages: {
        name : {
            required: " Le nom est requis."
        },
        firstname : {
            required: " Le prénom est requis."
        },
        email : {
            email: " Veuillez encoder une adresse e-mail correcte."
        },
        age : {
            required: " L'âge est requis.",
            number : " Veuillez encoder un nombre correct.",
            min : " Veuillez encoder un nombre correct.",
            max : " Veuillez encoder un nombre correct.",
            maxlength : " Veuillez encoder un nombre correct."
        },
        sex : {
            required: ""
        },
        password: {
            required: " Vous devez encoder un mot de passe.",
            minlength: " Votre mot de passe doit être d'au moins {0} caractères."
        }
    }
});


//validate an url like /v1/app
$.validator.addMethod( 'uniqueEmail', function(email) {
    var usr = user.findOne( { "email": email }, { fields: { "email": 1 } } );
    return usr ? false : true;
}, "Cet email a déjà été utilisé, veuillez en choisir un autre.");