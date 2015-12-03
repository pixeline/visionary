/* Use of attributes to reuse in the template Header */
Template.Header.helpers({
    //instruction to adjust a picture (type of correction to choose)
    info :  function(template) {
        var module = getCurrentModule(template);
        //if template of picture's correction
        if (["Select", "Select_ligne", "Adjust", "Choice"].indexOf(template) > -1 ) {
            var picture = getCurrentPicture(parseInt(Router.current().params.img));
            return getCurrentInstruction(picture, module);
        } else {
            var infoTxt = module.info_txt[0].title;
            return infoTxt;
        }
    }
});