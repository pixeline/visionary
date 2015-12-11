/* detect that the user want to exit/encoding url in application and ask confirmation */
window.addEventListener("beforeunload", function (e) {
	if(insideTool() != "undefined") {
		var confirmationMessage = "";
		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage;                            //Webkit, Safari, Chrome
	}
});

/* register informations in local storage if exit/encoding url */
window.onunload = function () {
	if(insideTool() != "undefined" ) {
		localStorage.setItem("currentSurvey", JSON.stringify(JSON.parse(sessionStorage.getItem("currentSurvey"))));
		localStorage.setItem("correction_profiles", JSON.stringify(JSON.parse(sessionStorage.getItem("correction_profiles"))));
        localStorage.setItem("correction_profile_result", JSON.stringify(JSON.parse(sessionStorage.getItem("correction_profile_result"))));
		localStorage.setItem("lastModule", sessionStorage.getItem("lastModule"));
		localStorage.setItem("lastPicture", sessionStorage.getItem("lastPicture"));	
	}
};

/* check if it's a page of correction tool application */
function insideTool () {
	var moduleTitles = ["Select","Select_ligne","Adjust","Choose","Valid","Upload","Form"];
	var inside = "undefined";
	$.each(moduleTitles, function (i, title) {
		if(Router.current() && typeof Router.current().route != "undefined" && Router.current().route.getName().indexOf(title) > -1) {
			inside = title;
			return;
		}
	});
	return inside;
}