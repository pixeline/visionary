
/* Use of attributes to reuse in the template Form */
Template.Form.helpers({  
    //get the text for the form to submit
    infoTxt :  function() {
        var module = getCurrentModule("Form");
        var infoTxt = module.info_txt[0];
        return infoTxt;
    },
    fieldForm : function() {
        var module = getCurrentModule("Form");
        var fieldForm = module.field_form;
        return fieldForm;
    }
});

/* attributes reused for template Input */
Template.Input.helpers({  
    isRadio : function(aType) {
        return aType == "radio";
    },
    giveLabel : function(labelTab, i) {
        return labelTab[i];
    }
});