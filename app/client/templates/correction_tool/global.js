
/*************************************************************************************************************
 * Global functions and variables for correction_tool (functions for profile, filters, modules and pictures) *
 ************************************************************************************************************/

 
(function() {
	
	satis_counter = 0;
	
	/* register a filter in session that match orderFilter inside correction_profiles for a pictureOrder */
	saveFilter = function (pictureOrder, orderFilter, module, val, setType) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		
		//if no correction on picture
		if((module.title == "Select" || module.title == "Valid")  && orderFilter == 0) {
			correction_profiles[pictureOrder-1].filter_type = "undefined";
		} else {
			var filter = getCurrentFilterByOrder(orderFilter, module);
			if(module.title == "Select" || setType) {
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
	
	/* register filters for a global result profile in session */
	saveResultProfile = function (filters) {
		var profileResult = JSON.parse(sessionStorage.getItem("correction_profile_result"));
		
		//reinit result profile each time
		profileResult = [];
		profileResult[0] = {};
		profileResult[0].filter = [];
			
		if(filters == "undefined") {
			profileResult[0].type = "undefined";
			profileResult[0].filter.push({parameter:"undefined", value:0});
		} else {
			//add each filter to result
			$(filters).each(function( i, filter ) {
				if(i == 0) {
					profileResult[0].type = filter.parameter;
				}
				profileResult[0].filter.push(filter);
			});
		}
		
		//set in session
        sessionStorage.setItem("correction_profile_result", JSON.stringify(profileResult));
	};
	
	/* retrieve previous filters configured */
	getResultProfile = function () {
		return JSON.parse(sessionStorage.getItem("correction_profile_result"));
	};
	
	/* increment reset counter for picture picOrder */
	updateResetCounter = function (picOrder) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		correction_profiles[picOrder-1].reset_counter += 1;
		updateSatis(true); //reset global satisfaction in the same time
		//set in session
        sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
	};
	
	/* return true if there are too many reset for this picture */
	stopReset = function (picOrder) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		var reset_counter = correction_profiles[picOrder-1].reset_counter;
		var max_reset_counter = JSON.parse(sessionStorage.getItem("currentSurvey")).max_reset_counter;
		return reset_counter >= max_reset_counter;
	};
	
	/* update the number of consecutive times the user is satisfied for the current picture */
	updateSatis = function (resetSatis) {
		if(resetSatis) {
			satis_counter = 0;
		} else {
			satis_counter += 1;
		}
	};
	
	/* return true if the counter of satisfaction is suficient */
	isSatis = function () {
        var max_satis = JSON.parse(sessionStorage.getItem("currentSurvey")).max_satis;
		return satis_counter >= max_satis;
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
		if(reset) {
			//if too many reset with this picture
			reset = !stopReset(picOrder);
		}
		//if want to correct again the current picture
		if(reset) {
			nextModule = getCurrentModule("Select"); //manual recorrection of current picture 
			nextPic = getCurrentPicture(picOrder);
		} else {
			//get the order of the current module
			var currentOrder = getCurrentModule(currentTemplate).order;
			
			var survey = JSON.parse(sessionStorage.getItem("currentSurvey"));
			var modules = survey.module_survey;
			//filter to get only one module with the next order
			$(modules).each(function( index, module ) {
				if(module.order == currentOrder+1) { 
					nextModule = module;
				} 
			}); 
            console.log(currentOrder, nextModule.title);
			//1st picture without sorted test
			if(currentOrder == 1 && nextModule.title != "Sorted_test") { 
				//get next picture
				nextPic = getNextPicture(picOrder);
				nextModule = getCurrentModule("Valid");
			} //if select the original picture or go to next picture
			else if(choiceOrigin || nextModule.title == "Upload" || nextModule.title == "Form" || nextModule.title == "Select" || nextModule.title == "Select_ligne") {				
				//update satis_counter si current = valid ou choice origin pic (if satis)
				if(nextModule.title != "Upload" && nextModule.title != "Form") {
					updateSatis(); //more satisfaction if "I'm satisfied"
				}
				//last pic if completly satisfied
				if(isSatis() && isNotLastPic(picOrder)) {
					nextPic = getLastPicture();
					nextModule = getCurrentModule("Valid");
				} else {
					//get next picture
					nextPic = getNextPicture(picOrder);
					switch(nextPic.type) {
						case "Upload":
							nextModule = getCurrentModule("Upload");
							break;
						case "Undefined":
							nextModule = getCurrentModule("Form");
							break;
						default: //validation of next picture with injected profile
							nextModule = getCurrentModule("Valid");
					}
				}
			//else next module is just module with next order and current picture !
			} else if(picOrder != 0) {
				nextPic = getCurrentPicture(picOrder);
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
		if(pictureOrder <= correction_profiles.length) {
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
			var currentPicture = new Collection.Picture(pictureOrder, "undefined", "Undefined", "undefined", "undefined");	
			return currentPicture;
		}
	};
	
	/* return picture next to picture with order currentPicOrder */
	getNextPicture = function (currentPicOrder) {
		return getCurrentPicture(currentPicOrder + 1);
	};
	
	/* return last picture = illustration picture */
	getLastPicture = function () {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		return getCurrentPicture(correction_profiles.length-1);
	};
	
	isNotLastPic = function (picOrder) {
		var correction_profiles = JSON.parse(sessionStorage.getItem("correction_profiles"));
		return picOrder < correction_profiles.length-1;
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
		var picSession = getCurrentPicture(picUploaded.order);
		
		//set in session the picture for this correction_profile
		correction_profiles[picUploaded.order-1].picture = new Collection.Picture(picUploaded.order, picUploaded.title, 
												picUploaded.type, picUploaded.file_name, picSession.instruction);	
														
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