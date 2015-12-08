/* Use of attributes to reuse in the template Header */
Template.Header.helpers({
    //instruction for current template
    info :  function(template) {
        var module = getCurrentModule(template);
        //if template of picture's correction
        if (["Valid", "Select", "Select_ligne", "Adjust", "Choice"].indexOf(template) > -1 ) {
            var picture = getCurrentPicture(parseInt(Router.current().params.img));
            return getCurrentInstruction(picture, module);
        } else {
            var infoTxt = module.info_txt[0].title;
            return infoTxt;
        }
    },
    //help text for current template
    help :  function(template, field) {
        var module = getCurrentModule(template);
        var infoTxt;
        if (module.info_txt.length > 1 ) {
            infoTxt = module.info_txt[1];
        } else {
            infoTxt = module.info_txt[0];
        }
        if(field == "title") {
            return infoTxt.title;
        } else {
            return infoTxt.txt;
        }
    },
});