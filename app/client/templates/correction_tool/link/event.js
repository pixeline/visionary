/*********************************************************
 * Computing of route for page of correction on pictures *
 ********************************************************/


//choice of rendered picture
var idChoice;

/* Event of template linkNext (global event for correction_tool) */
Template.linkNext.events({
        //redirect to the next module
        'click #nextPage': function (event) {
                event.preventDefault();
                if($(event.target).attr("template") == "Choose" && idChoice === 0) {
                        sAlert.error("Vous devez cliquer sur la version de l'image que vous préférez.");     
                } else {
                        routing ($(event.target).attr("template"));
                }
        }
});

/* events of template Select and transition */
Template.Select.events({
        'click a.linkPicture': function (event) {
                event.preventDefault();
                $("div.zoomContainer").remove();
                if(event.target.id != 0) {
                        var xTransit = "0";
                        var yTransit = "0";
                        switch (parseInt(event.target.id)) {
                                case 1 :
                                        yTransit = "60%";
                                        break;
                                case 2 :
                                        yTransit = "-80%";
                                        xTransit = "100%";
                                        break;
                                case 3 :
                                        yTransit = "-80%";
                                        xTransit = "-100%";
                                        break;
                                case 4 :
                                        yTransit = "-170%";
                                        break;
                                default:
                        }
                        $("img").not(document.getElementById(event.target.id)).hide();
                        $(event.target).transition({x: xTransit, y: yTransit, scale: 2.0}, function() {
                                routing ("Select", event.target.id);
                        }); 
                } else {
                        routing ("Select", event.target.id);
                }
        }
});

/* events of template Select_ligne and transition */
Template.Select_ligne.events({
        'click a.linkPicture': function (event) {
                event.preventDefault();
                routing ("Select_ligne", event.target.id);
        }
});

/* Save and Route to the correct url depending on template */
function routing (template, orderFilter) {
        //store the current path
        var module = getCurrentModule(template);
        var picOrder = parseInt(Router.current().params.img) || 0;
        sessionStorage.setItem("lastModule", module.title);
        sessionStorage.setItem("lastPicture", picOrder);
        
        var choiceOrigin = false;
        
        //variability to do for each module before routing
        switch(template) {
                case "Index" :
                        //init the user's corrections (maximum of possible corrections that the user can do)
                        initCorrection();
                        break;
                case "Select" || "Select_ligne" :
                        var val = 0;
                        //image without filter => next picture with current module
                        choiceOrigin = true;
                        if(orderFilter != 0) {
                                choiceOrigin = false;
                                var filter_admin = getCurrentFilterByOrder(orderFilter, module);
                                val = filter_admin.init_value + filter_admin.step;
                        } else {
                                //save result profile null
                                saveResultProfile("undefined");
                                //reinit class to render if origin is chosen
                                $.each($("img"), function (i, pic) {
                                        pic.className = "render";
                                });
                        }
                        //store the correction_profile with filter chosen
                        saveFilter(picOrder, orderFilter, module, val);
                        break;
                case "Choose" : 
                        var previousFilter = getPreviousFilter(parseInt(Router.current().params.img));
                        var previous_filter_admin = getCurrentFilterByTitle(previousFilter.parameter, getPreviousModule(template));                       
                        var filter_admin_choice = getCurrentFilterByOrder(previous_filter_admin.order, module);
                        var val_choice = filter_admin_choice.init_value + (parseInt(idChoice) * filter_admin_choice.step);
                        
                        //store the correction_profile with filter chosen
                        if(idChoice != 0) {
                                saveFilter(picOrder, filter_admin_choice.order, module, val_choice);
                        }
                        
                        for (var member in filter_admin_choice) {
                                if(member != "parameter") {
                                        delete filter_admin_choice[member];
                                }
                        }
                        filter_admin_choice.value = val_choice;
                        //save current result profile
                        var filtersResult = [previousFilter, filter_admin_choice];
                        saveResultProfile(filtersResult);
                        break;
                case "Valid" :
                        var filtersRes = getResultProfile();
                        //if a result exist
                        if(filtersRes) {
                            //Save each filter
                            $.each(filtersRes[0].filter, function (i, filterRes) {
                                    if(filterRes.parameter != "undefined") {
                                            var filter_admin = getCurrentFilterByTitle(filterRes.parameter, module);
                                            saveFilter(picOrder, filter_admin.order, module, filterRes.value, i===0);
                                    } else {
                                            saveFilter(picOrder, 0, module, 0, i===0);
                                    }
                            });
                        }
                        //reinit class to render
                        $.each($("img"), function (i, pic) {
                                pic.className = "render";
                        });
                        break;
                default: break;
        }
        
        //route to next module with picture assiocated
        var nextRoute = getNextModule(module.title, false, choiceOrigin);
        Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
}


/* Event of template linkReset (global event for correction_tool) */
Template.linkReset.events({
        //redirect to the beginning of correction for current picture
        'click #resetPic': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule($(event.target).attr("template"));
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.title);
                sessionStorage.setItem("lastPicture", picOrder);
                
                //update reset_counter for this picture
                updateResetCounter(picOrder);
                
                //route to first page of correction for this picture
                var nextRoute = getNextModule("Valid", true, false);
                Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
        }
});

/* Check added */
Template.Choose.onRendered (function () {
        idChoice = 0;
        //hide the check
        $('a .check').hide();
});

/* events of template Choose */
Template.Choose.events({
	//select a picture
        'click img': function (event) {
            //register the id of the selected one
            idChoice = event.target.id;
            if(event.target.id != '') {
                //disable css of each picture
                $('a .check').hide();
                //display a check
                $(event.target).next().show();
            }
        }
});

/* Init the user's corrections (Mandatory to reset everything at the startup) */
function initCorrection () {
        
        var surveySession = JSON.parse(sessionStorage.getItem("currentSurvey"));
        var modules = surveySession.module_survey;
        var filtersToInit = [];
        
        //iteration to have each filters from configuration
        $(modules).each(function( i, module ) {
                //module which contains filters
                if(module.filter_admin.length != 0) {
                        $(module.filter_admin).each(function( i, filter ) {
                                var isAlreadyStored = false;
                                $(filtersToInit).each(function( i, filterStored ) {
                                        if(filterStored.parameter == filter.parameter) {
                                                isAlreadyStored = true;
                                        }
                                });
                                //put filters which isn't already stored
                                if(!isAlreadyStored) {
                                        filtersToInit.push(filter);
                                }
                        });
                }
        });
        
        var correction_profiles = [];
        var i = 0;
        //iteration on the number of corrections that have to be done
        $(surveySession.picture_admin).each(function (index, pic) {
                i++;
                if(pic.order == i) {	
                        correction_profiles[i-1] = new Collection.CorrectionProfilePicture(undefined , 0, undefined, filtersToInit);
                } else {
                        i--; //picture with the same order
                }
        });
        //set in session
        sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
                
}