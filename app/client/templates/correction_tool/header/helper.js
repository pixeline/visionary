/* Use of attributes to reuse in the template Header */
Template.Header.helpers({
    //question for current template
    question :  function(template) {
        var module = getCurrentModule("Valid");
        //if template of picture's correction
        if (["Select", "Select_ligne", "Adjust", "Choose"].indexOf(template) > -1 ) {
            var picture = getCurrentPicture(parseInt(Router.current().params.img));
            return getCurrentInstruction(picture, module);
        }
    },
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
    //get previous picture in the current survey
    previousPic : function () {
        var currentPic = parseInt(Router.current().params.img);
		var allPic = JSON.parse(sessionStorage.getItem("currentSurvey")).picture_admin;
        var previousPicArray = [];
        var iPic;
        $(allPic).each(function(i, pic) { // filter cause of randomize picture with same order
            if(pic.order == currentPic) {
                iPic = i;
                return false;
            }
        });
        for(i = 0 ; i < iPic ; i++) {
            if(i==0 || allPic[i].order != allPic[i-1].order) {
                previousPicArray.push(allPic[i].order);
            }
        }
        return previousPicArray;
    },
    //get next picture in the current survey
    nextPic : function () {
        var currentPic = parseInt(Router.current().params.img);
		var allPic = JSON.parse(sessionStorage.getItem("currentSurvey")).picture_admin;
        var nextPicArray = [];
        var iPic;
        $(allPic).each(function(i, pic) {
            if(pic.order == currentPic) {
                iPic = i;
                return false;
            }
        });
        for(i = iPic+1 ; i < allPic.length ; i++) {
            if(allPic[i].order != allPic[i-1].order) {
                nextPicArray.push(allPic[i].order);
            }
        }
        return nextPicArray;
    },
    //get every modules
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
    //true if templateInList is before current template
    previous : function (templateInList) {
        return getCurrentModule(templateInList).order < getCurrentModule(Router.current().route.getName()).order;
    },
    //true if templateInList is the current template
    current : function (templateInList) {
        return getCurrentModule(templateInList).order == getCurrentModule(Router.current().route.getName()).order;
    },
    //return the current picture
    currentPic : function () {
        return parseInt(Router.current().params.img);
    }
});

/* replace the module by his content in french */
Template.itemLink.helpers({
    formateTxt : function (item) {
        switch(item) {
            case "Valid":
                return "Validation";
            case "Select" || "Select_ligne":
                return "Sélection";
            case "Adjust":
                return "Ajustement";
            case "Choose":
                return "Choix";
            default:
                return item;
        }
    }
});

/* replace the module by his content in french */
Template.itemNoLink.helpers({
    formateTxt : function (item) {
        switch(item) {
            case "Valid":
                return "Validation";
            case "Select" || "Select_ligne":
                return "Sélection";
            case "Adjust":
                return "Ajustement";
            case "Choose":
                return "Choix";
            default:
                return item;
        }
    }
});