/* cfr master_layout.js for events applied to each templates */

/* events of template Index */
Template.Index.events({
    'click #nextPage': function (event) {
        event.preventDefault();
        
        //store the current path
        var module = getCurrentModule("Index");
        sessionStorage.setItem("lastModule", module.order);
        sessionStorage.setItem("lastPicture", 1);
        
        //init the user's corrections (maximum of possible corrections that the user can do)
        initCorrection();
            
        //redirection to next module with first picture (warning it's mandatory)
        var nextRoute = getNextModule("Index", false, false);
        Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
    }
});

    /* init the user's corrections (Mandatory to reset everything at the startup) */
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
		//add a last correction for the upload possibility
		correction_profiles.push(new Collection.CorrectionProfilePicture(undefined , 0, undefined, filtersToInit));
		//set in session
        sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
		
}