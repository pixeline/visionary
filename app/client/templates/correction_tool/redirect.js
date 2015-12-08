/* detect that the user want to exit/encoding url in application and ask confirmation */
window.addEventListener("beforeunload", function (e) {
	if(insideTool(false) != "undefined") {
		var confirmationMessage = "";
		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage;                            //Webkit, Safari, Chrome
	}
});

/* register informations in local storage if exit/encoding url */
window.onunload = function () {
	if(insideTool(false) != "undefined" ) {
		localStorage.setItem("currentSurvey", JSON.stringify(JSON.parse(sessionStorage.getItem("currentSurvey"))));
		localStorage.setItem("correction_profiles", JSON.stringify(JSON.parse(sessionStorage.getItem("correction_profiles"))));
		localStorage.setItem("lastModule", sessionStorage.getItem("lastModule"));
		localStorage.setItem("lastPicture", sessionStorage.getItem("lastPicture"));	
	}
};

/* retrieve informations in local/session storage if previous exit/encoding url */
window.onload = function () {
	var lastPicture = parseInt(sessionStorage.getItem("lastPicture"));
	var lastModule = sessionStorage.getItem("lastModule");
		
	var moduleEncoded = insideTool(false);
	//if there is something in session
	if(lastModule) {
		//if a valid url in correction tool
		if(moduleEncoded != "undefined") {
			var paramImg = parseInt(Router.current().params.img);
			//if not a valid url
			if(isNaN(paramImg) || paramImg <= 0){
				//redirect to last position
				Router.go(lastModule, {img: lastPicture});
			} else {
				Meteor.call('isAdmin', function (error, result) {
					if(result) {
					} else {
						moduleEncoded = getCurrentModule(moduleEncoded);
						var module = getCurrentModule(lastModule);
						//redirect only if user want a page not visited yet
						if(paramImg > parseInt(lastPicture) || ((paramImg == parseInt(lastPicture) && moduleEncoded.order > module.order))) {
							//redirect to last position
							Router.go(lastModule, {img: lastPicture});
						}
					}
				});
			}
		}
	} else {
		moduleEncoded = insideTool(true);
		//if a valid url in correction tool
		if(moduleEncoded != "undefined") {
			//else retrieve everything from localStorage
			var currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
			var correction_profiles = JSON.parse(localStorage.getItem("correction_profiles"));
			lastModule = localStorage.getItem("lastModule");
			lastPicture = parseInt(localStorage.getItem("lastPicture"));
			
			//set in session
			sessionStorage.setItem("currentSurvey", JSON.stringify(currentSurvey));
			sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
			sessionStorage.setItem("lastModule", lastModule);
			sessionStorage.setItem("lastPicture", lastPicture);
			
			//remove data in local
			localStorage.clear();
			
			//redirect to last position
			Router.go(lastModule, {img: lastPicture});
		}
	}
};

/* function of verification to be an Admin */
function isAdminRedirect () {
	var isAdmin = false;
	Meteor.call('isAdmin', function (error, result) {
	 	if(result) {
			 isAdmin = true;
		 } else {
			 isAdmin = false;
		 }
	});
	return isAdmin;
}

/* check if it's a page of correction tool application */
function insideTool (retrieve) {
	var moduleTitles = ["Select","Select_ligne","Adjust","Choice","Valid","Upload","Form"];
	if(retrieve) {
		moduleTitles.push("Index");
	}
	var inside = "undefined";
	$.each(moduleTitles, function (i, title) {
		if(Router.current() && typeof Router.current().route != "undefined" && Router.current().route.getName().indexOf(title) > -1) {
			inside = title;
			return;
		}
	});
	return inside;
}