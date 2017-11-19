Template.CorrectionTool.onRendered(function(){
    //Validation and inscription of the user and his correction profile
    $('.user_information').validate({
        submitHandler: function(event){

            var tabFilters = Session.get('tabFilters');
            var answersList = Session.get('answersList');

            //Collection user 
            var user = {
              name : $('[name=Nom]').val(),
              firstname : $('[name=Prénom]').val(),
              email : $('[name=Email]').val(),
              age : parseInt($('[name=Age]').val()),
              sex : $('[name=Sexe]')[0].checked 
            };

            //Collections correction_profiles, link with user
            var correction_profiles = [];
            $.map( tabFilters, function( value, key ) {
              correction_profiles [key] = {
                   type : value.type,
                   isBest : value.isBest, 
                   CB_type : value.CB_Type
              };
            });
            
            /*  Mapping to create an Array of Collections tab_adaptation_rules in 2D 
                (correction type and value filter), link with correction_profile */
            var tab_adaptation_rules = [];
            var j;
            $.map( tabFilters, function( val, i ) {
                j=0;
                tab_adaptation_rules[i] = [];
                $.map( val.valueFilter, function( value, key ) {
                  tab_adaptation_rules[i][j] = {
                       parameter : key,
                       value : parseFloat(value)
                  };
                  j++;
                });
            });

            //Send answerList to update the questions-answers collections
            Meteor.call('updateQA', answersList, function(error, result){
                // display error or go on
                if(error) {                
                    return alert('Le serveur est indisponible pour l\'instant, veuillez réessayer ultérieurement.');
                } else {
                    //Send correction profile of the current user to the server
                    Meteor.call('insertUserCorrection', user, correction_profiles, tab_adaptation_rules, function(error, result){
                        // display error or go on
                        if(error) {                
                            return alert('Le serveur est indisponible pour l\'instant, veuillez réessayer ultérieurement.');
                        } else {
                            //redirection to profile information page
                            Router.go('Profile', {_id: result._id});
                        }
                    }); 
                }
            }); 
        }
    });
});

// Validation rules and messages
$.validator.setDefaults({
    rules: {
        Nom: {
            required: true
        },
        Prénom: {
            required: true
        },
        Email: {
            required: false,
            email: true
        },
        Age: {
            required: true,
            number: true,
            min:1,
            max:130,
            maxlength: 3
        },
        Sexe: {
            required: true
        },
        password: {
            required: true,
            minlength: 8
        }
    },
    messages: {
        Nom : {
            required: " Le nom est requis."
        },
        Prénom : {
            required: " Le prénom est requis."
        },
        Email : {
            email: " Veuillez encoder une adresse e-mail correcte."
        },
        Age : {
            required: " L'âge est requis.",
            number : " Veuillez encoder un nombre correcte",
            min : " Veuillez encoder un nombre correcte",
            max : " Veuillez encoder un nombre correcte",
            maxlength : " Veuillez encoder un nombre correcte"
        },
        Sexe : {
            required: ""
        },
        password: {
            required: " You must enter a password.",
            minlength: " Your password must be at least {0} characters."
        }
    }
});