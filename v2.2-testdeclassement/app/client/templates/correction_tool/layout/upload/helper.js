
/* Use of attributes to reuse in the template Test5 */
Template.Upload.helpers({  
    //get the text for the upload template
    infoTxt :  function() {
        var module = getCurrentModule("Upload");
        var infoTxt = module.info_txt[0];
        return infoTxt;
    }
});