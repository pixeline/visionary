/* Use of attributes to reuse in the template Header */
Template.Header.helpers({
    //instruction for current template
    info :  function(template) {
        var module = getCurrentModule(template);
        //if template of picture's correction
        if (["Valid", "Select", "Select_ligne", "Adjust", "Choose"].indexOf(template) > -1 ) {
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
    previousPic : function () {
        var currentPic = parseInt(Router.current().params.img);
		var allPic = JSON.parse(sessionStorage.getItem("currentSurvey")).picture_admin;
        var previousPicArray = [];
        var item = {};//TODO
        for(i = 1 ; i < currentPic ; i++) {
            if(i==1 || allPic[i].order != allPic[i-1].order) {
                previousPicArray.push(allPic[i].order);
            }
        }
        return previousPicArray;
    },
    nextPic : function () {
        var currentPic = parseInt(Router.current().params.img);
		var allPic = JSON.parse(sessionStorage.getItem("currentSurvey")).picture_admin;
        var nextPicArray = [];
        for(i = currentPic+1 ; i < allPic.length ; i++) {
            if(allPic[i].order != allPic[i-1].order) {
                nextPicArray.push(allPic[i].order);
            }
        }
        return nextPicArray;
    },
    modulesPic : function () {
		var modules = JSON.parse(sessionStorage.getItem("currentSurvey")).module_survey;
        modArray = [];
        $(modules).each(function( i, mod ) {
            if(mod.order > 0 && mod.filter_admin.length > 0) {
                modArray.push(mod.title);
            }
        });
        return modArray;
    },
    previous : function (templateInList) {
        return getCurrentModule(templateInList).order < getCurrentModule(Router.current().route.getName()).order;
    },
    current : function (templateInList) {
        return getCurrentModule(templateInList).order == getCurrentModule(Router.current().route.getName()).order;
    },
    currentPic : function () {
        return parseInt(Router.current().params.img);
    }
});