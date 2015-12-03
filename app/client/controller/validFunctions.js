/* Validate and insert/remove/modify survey */

Validation = {};

(function() {
        
        /* Validation of a string which can't be null */
        Validation.checkString = function (aString, field) {
            aString = aString || '';
            if (aString.length > 0) {
              return true;
            } else {
              sAlert.error(field + " invalide.");
              return false;
            }
        };
        
        /* Validation of a number */
        Validation.checkNumber = function (aNumber, field) {  
            if (!isNaN(aNumber)) {
              return true;
            } else {
              sAlert.error(field + " invalide.");
              return false;
            }
        };
        
        /* Validation of a number >= 0 */
        Validation.checkNumberPos = function (aNumber, field) {  
            if (!isNaN(aNumber) && aNumber >= 0) {
              return true;
            } else {
              sAlert.error(field + " invalide.");
              return false;
            }
        };
        
        /* Validation of a boolean */
        Validation.checkBool = function (aBool, field) {  
            if(typeof(aBool) == "boolean"){
              return true;
            } else {
              sAlert.error(field + " invalide.");
              return false;
            }
        };
        
        /* url must be void or /url */
        Validation.checkUrlRoot = function (aString) {  
            aString = aString || '';
            if (aString.length == 0 || (aString.length > 1 && aString[0] == "/")) {
                return true;
            } else {
                sAlert.error('L\'url doit être de type \"/url\".');
                return false;
            }
        };
        
        /* only one survey displayed */
        Validation.checkState = function (state) {  
            if(state) {
                var surveyActive = survey.findOne({state : true});
                if (typeof surveyActive == "undefined") {
                  return true;
                } else {
                  sAlert.error('Un seul questionnaire peut être affiché !');
                  return false;
                }
            } else {
                return true;
            }
        };
        
        /* color must be like '#......' or '#...' */
        Validation.checkColor = function (aString) {  
            aString = aString || '';
            if (aString.length == 7 && (aString.match(/^#(?:[0-9a-f]{3}){1,2}$/i) != null)) {
                return true;
            } else {
                sAlert.error('La couleur doit être de type #ffffff ou #fff.');
                return false;
            }
        };
        
        
})();