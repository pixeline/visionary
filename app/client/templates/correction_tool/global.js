
/******************************************************
 * Global functions and variables for correction_tool *
 ******************************************************/

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

/* retrieve informations in local storage if previous exit/encoding url */
window.onload = function () {
	var moduleEncoded = insideTool(true);
	console.log(Router.current(), moduleEncoded, !isNaN(parseInt(Router.current().params.img)),  parseInt(Router.current().params.img) > 0);
	if(Router.current() && moduleEncoded != "undefined" && !isNaN(parseInt(Router.current().params.img)) && parseInt(Router.current().params.img) > 0 ) {
			
		var lastPicture = parseInt(sessionStorage.getItem("lastPicture"));
		var lastModule = sessionStorage.getItem("lastModule");
		
		//if there is something in session
		if(lastModule) {
			console.log("session");
			console.log(lastModule);
			console.log(lastPicture);
			if(!isAdminRedirect()) {
				if(typeof Router.current().params.img != "undefined") {
					moduleEncoded = getCurrentModule(moduleEncoded);
					var module = getCurrentModule(lastModule);
					console.log(moduleEncoded.order, module.order, parseInt(Router.current().params.img), lastPicture);
					//redirect only if user want a page not visited yet 
					if(parseInt(Router.current().params.img) <= parseInt(lastPicture) && moduleEncoded.order <= module.order) {
						
					} else {
						Router.go(lastModule, {img: lastPicture});
					}
				}
			}
		} else {
			console.log("local");
			
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
	} else {
		if(moduleEncoded != "undefined" || Router.current() === null || parseInt(Router.current().params.img) <= 0) {
			console.log("ko");
			//if it's not an url known on the application
			Router.go("Index");
		}
	}
};

/* function of verification to be an Admin */
function isAdminRedirect () {
    var currentUser = Meteor.user();
    return currentUser && currentUser.username === "admin";
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

 
(function() {
	
	/* register a filter in session that match orderFilter inside correction_profiles for a pictureOrder */
	saveFilter = function (pictureOrder, orderFilter, module, val) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		
		//if no correction on picture
		if(module.title == "Select" && orderFilter == 0) {
			correction_profiles[pictureOrder-1].filter_type = "undefined";
		} else {
			var filter = getCurrentFilterByOrder(orderFilter, module);
			if(module.title == "Select") {
				correction_profiles[pictureOrder-1].filter_type = filter.parameter;
			}
			
			//add value to the filter
			$(correction_profiles[pictureOrder-1].filter).each(function( i, currentFilter ) {
				if(currentFilter.parameter == filter.parameter) {
					currentFilter.value = val;
					return;
				}
			});
		}
		
		//set in session
        sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
	};
	
	/* increment reset counter for picture picOrder */
	updateResetCounter = function (picOrder) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		correction_profiles[picOrder-1].reset_counter += 1;
		//set in session
        sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
	};
	
	/* return module associated with currentTemplate */
	getCurrentModule = function (currentTemplate) {
        var module = JSON.parse(sessionStorage.getItem("currentSurvey")).module_survey;
		//filter to get only one module with the correct title
		$(module).each(function( index, value ) {
			if(value.title == currentTemplate) return module = value;
		});
		return module;
	};
	
	/* 	
	 *	Fonction de ROUTAGE
	 *	return next picture and module after module of currentTemplate 
	 *	depending of some conditions (cfr activity diagram)
	 */
	getNextModule = function (currentTemplate, reset, choiceOrigin) {
		var nextModule;
		var nextPic; 
		var picOrder = parseInt(Router.current().params.img);
		if(isNaN(picOrder)) {
			picOrder = 0;
		}
		//if want to correct again the current picture
		if(reset) {
			nextModule = getCurrentModule("Select");
			nextPic = getCurrentPicture(picOrder);
		} else {
			//get next picture
			nextPic = getNextPicture(picOrder);
			//get the order of the current module
			var currentOrder = getCurrentModule(currentTemplate).order;
			var modules = JSON.parse(sessionStorage.getItem("currentSurvey")).module_survey;
			//filter to get only one module with the next order
			$(modules).each(function( index, module ) {
				if(module.order == currentOrder+1) {
					nextModule = module;
				} 
			});
			//if select an the original picture or go to next picture
			if(choiceOrigin || (nextPic.type != "Illustration" && (nextModule.title == "Valid" || nextModule.title == "Upload"))) {
				switch(nextPic.type) {
					case "Illustration": 
						nextModule = getCurrentModule("Valid");
						break;
					case "Upload":
						nextModule = getCurrentModule("Upload");
						break;
					case "Undefined":
						nextModule = getCurrentModule("Form");
						break;
					default:
						nextModule = getCurrentModule("Select");
				}
			//else next module is just module with next order and current picture !
			} else {
				if(picOrder != 0 && !(nextPic.type == "Illustration" && nextModule.title == "Valid")) {
					nextPic = getCurrentPicture(picOrder);
				}
			}
			
		}
		return {mod : nextModule, pic : nextPic};
	};
	
	/* return module before module of currentTemplate */
	getPreviousModule = function (currentTemplate) {
		//get the order of the current module
		var currentOrder = getCurrentModule(currentTemplate).order;
        var module = JSON.parse(sessionStorage.getItem("currentSurvey")).module_survey;
		//filter to get only one module with the next order
		$(module).each(function( index, value ) {
			if(value.order == currentOrder-1) return module = value;
		});
		return module;
	};
	
	/* return picture associated with his order, chosen randomly */
	getCurrentPicture = function (pictureOrder) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		//if it's a picture from the survey yet
		if(pictureOrder < correction_profiles.length) {
			//if first time, choose randomly and set in session
			if(correction_profiles[pictureOrder-1].picture.length == 0) {
				var pictures = JSON.parse(sessionStorage.getItem("currentSurvey")).picture_admin;
				var picturesTab = [];
				//filter to get the picture with the correct order (the same group)
				$(pictures).each(function( index, value ) {
					if(value.order == pictureOrder) {
						picturesTab.push(value);
					} 
				});
				//select a picture randomly between 0 and the number of pictures with the same order
				var randomOrder = Math.floor((Math.random() * picturesTab.length));
				var currentPicture = picturesTab[randomOrder];
				//set in session the picture chosen randomly for this correction_profile
				correction_profiles[pictureOrder-1].picture = new Collection.Picture(currentPicture.order, currentPicture.title, 
														currentPicture.type, currentPicture.file_name, currentPicture.instruction);			
				sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
				return currentPicture;
			} else {
				//if aready chosen randomly
				return correction_profiles[pictureOrder-1].picture;
			}
		} else {
			var typePic = "Undefined";
			//if every pictures of survey have been shown
			if(pictureOrder == correction_profiles.length) {
				//if already uploaded
				if(correction_profiles[pictureOrder-1].picture.length != 0) {
					return correction_profiles[pictureOrder-1].picture;
				} else {
					typePic = "Upload";
				}
			}
			var currentPicture = new Collection.Picture(pictureOrder, "undefined", typePic, "undefined", "undefined");	
			return currentPicture;
		}
	};
	
	/* return picture next to picture with order currentPicOrder */
	getNextPicture = function (currentPicOrder) {
		return getCurrentPicture(currentPicOrder + 1);
	};
	
	/* return the picture's url that match the file_name */
	pictureUrl = function (fileName) {
		//picture uploaded or in file system
		if(fileName.indexOf("cfs") > -1) {
			return "../../" + fileName;
		} else {
			return "../../pictures/correction_tool/"+fileName;
		}
	};
	
	/* set the uploaded picture in session inside correction_profiles */
	setUploadedPicture = function (picUploaded) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		
		var instruction = [];
		instruction[0] = {};
		instruction[1] = {};
		instruction[2] = {};
		instruction[0].txt = "Sélectionner votre image préférée.";
		instruction[1].txt = "Ajuster l'image jusqu'à ce qu'elle corresponde au mieux à vos attentes.";
		instruction[2].txt = "Choisissez votre image préférée.";
		instruction[0].module_order = 2;
		instruction[1].module_order = 3;
		instruction[2].module_order = 4;
		instruction[0].picture_order = picUploaded.order;
		instruction[1].picture_order = picUploaded.order;
		instruction[2].picture_order = picUploaded.order;
		picUploaded.instruction = instruction;
		
		//set in session the picture for this correction_profile
		correction_profiles[picUploaded.order-1].picture = new Collection.Picture(picUploaded.order, picUploaded.title, 
												picUploaded.type, picUploaded.file_name, picUploaded.instruction);	
														
		sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
	};
	
	/* return instruction that correspond to picture and module */
	getCurrentInstruction = function (picture, module) {
        var instruction = "";
		//iteration to have only one instruction that match picture and module
		$(picture.instruction).each(function( i, instr ) {
            if(instr.module_order == module.order) {
                instruction = instr.txt;
                return;
            }
        });	
		return instruction;
	};
	
	/* return filter associated with orderFilter and currentTemplate */
	getCurrentFilterByOrder = function (orderFilter, module) {
		if(module.filter_admin.length >= 0) {
			//filter only one filter_admin
			$(module.filter_admin).each(function( index, filter ) {
				if(filter.order == orderFilter) {
					filterAdmin = filter;
				}
			});
			return filterAdmin;
		} else {
			return undefined;
		}
	};
	
	/* return filter associated with titleFilter and currentTemplate */
	getCurrentFilterByTitle = function (titleFilter, module) {
		if(module.filter_admin.length >= 0) {
			//filter only one filter_admin
			$(module.filter_admin).each(function( index, filter ) {
				if(filter.parameter == titleFilter) {
					filterAdmin = filter;
				}
			});
			return filterAdmin;
		} else {
			return undefined;
		}
	};
	
	/* retrieve filter chosen previously */
	getPreviousFilter = function (pictureOrder) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		var filterParam = correction_profiles[pictureOrder-1].filter_type;
		
		$(correction_profiles[pictureOrder-1].filter).each(function( i, currentFilter ) {
			if(currentFilter.parameter == filterParam) {
				previousFilter = currentFilter;
				return;
			}
		});
		return previousFilter;
	};
		
})();