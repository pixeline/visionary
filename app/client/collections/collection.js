
  /*****************************************************************************************\
  |  Collections for client-side (Model)                                                    |
  |     collections are used for admin panel without sub collection                         |
  | 	collections are used in profiler system with all sub collections to put in session  |
  \*****************************************************************************************/

Collection = {}; 

(function () {
		
	/**************************
	*	USER INFORMATIONS     *
	***************************/
		
	/* Collection User to be constructed */
	Collection.User = function (name, firstname, email, age, sex, date_created) {
		this.name = name;
		this.firstname = firstname;
		this.email = email;
		this.age = age;
		this.sex = sex;
		this.date_created = date_created;
	};
	
	/* Collection CorrectionProfilePicture to be constructed (linked with one user) */
	Collection.CorrectionProfilePicture = function (filter_type, reset_counter, picture, filter) {
		this.filter_type = filter_type;
		this.reset_counter = reset_counter;
		this.picture = pictureTab(objectOrUndefined(picture));
		this.filter = filterTab(filter);
	};
		
	/* Collection Picture to be constructed (linked with one CorrectionPorfilePicture) */
	Collection.Picture = function (order, title, typePic, file_name, instruction) {
		this.order = order;
		this.title = title;
		this.type = typePic;
		this.file_name = file_name;
		this.instruction = instructionTab2(objectOrUndefined2(instruction));
	};
		
	/* Collection Filter to be constructed (linked with one user) */
	Collection.Filter = function (parameter, value) {
		this.parameter = parameter;
		this.value = value;
	};
	
	
	/**************************
	*	ADMIN CONFIGURATION   *
	***************************/
		
	/* Collection Survey to be constructed */
	Collection.Survey = function (name, root_url, state, date_created, max_reset_counter, max_satis, module_survey, picture_admin) {
		this.name = name;
		this.root_url = root_url;
		this.state = state;
		this.date_created = date_created;
		this.max_reset_counter = max_reset_counter;
		this.max_satis = max_satis;
		this.module_survey = moduleTab(module_survey);
		this.picture_admin = pictureTab(picture_admin);
	};
		
	/* Collection ModuleSurvey to be constructed (linked with survey) */
	Collection.ModuleSurvey = function (order, title, instruction, info_txt, filter_admin, sorted_color_admin, field_form) {
		this.order = order;
		this.title = title;
		this.instruction = instructionTab(objectOrUndefined(instruction));
		this.info_txt = infoTxtTab(objectOrUndefined(info_txt));
		this.filter_admin = filterAdminTab(objectOrUndefined(filter_admin));
		this.sorted_color_admin = colorTab(objectOrUndefined(sorted_color_admin));
		this.field_form = fieldTab(objectOrUndefined(field_form));
	};
		
	/* Collection PictureAdmin to be constructed (linked with survey and integrated in module which have one/several filter_admin) */
	Collection.PictureAdmin = function (order, title, typePic, file_name, instruction) {
		this.order = order;
		this.title = title;
		this.type = typePic;
		this.file_name = file_name;
		this.instruction = instructionTab(objectOrUndefined(instruction));
	};
		
	/* Collection Instruction to be constructed (linked with a picture and a module) */
	Collection.Instruction = function (txt, module_order, picture_order) {
		this.txt = txt;
		this.module_order = module_order;
		this.picture_order = picture_order;
	};
		
	/* Collection InfoTxt to be constructed (linked with some modules) */
	Collection.InfoTxt = function (title, txt) {
		this.title = title;
		this.txt = txt;
	};
		
	/* Collection SortedColorAdmin to be constructed (linked with module sorted_test) */
	Collection.SortedColorAdmin = function (order, color) {
		this.order = order;
		this.color = color;
	};
		
	/* Collection FilterAdmin to be constructed (linked with some modules - select, select_ligne, adjust, choice) */
	Collection.FilterAdmin = function (order, parameter, init_value, min, max, conversion, step) {
		this.order = order;
		this.parameter = parameter;
		this.init_value = init_value;
		this.min = min;
		this.max = max;
		this.conversion = conversion;
		this.step = step;
	};
		
	/* Collection FieldForm to be constructed (linked with module form) */
	Collection.FieldForm = function (order, typeField, label, name, placeholder, required) {
		this.order = order;
		this.type = typeField;
		this.label = label;
		this.name = name;
		this.placeholder = placeholder;
		this.required = required;
	};
		
		
	/********************************************************
	*	Added functions to put the collection from mongoDB  *
	*	to an object that can be saved in sessionStorage    *
	*********************************************************/

	function moduleTab(module_survey) {
		var modulesTab =  [];
		$(module_survey).each(function (i, moduleSurveyInput) {
			modulesTab[i] = new Collection.ModuleSurvey(moduleSurveyInput.order, moduleSurveyInput.title,
				moduleSurveyInput.instruction, moduleSurveyInput.info_txt, moduleSurveyInput.filter_admin,
				moduleSurveyInput.sorted_color_admin, moduleSurveyInput.field_form);
		});
		return modulesTab;
	}

	function pictureTab(picture_admin) {
		var picturesTab =  [];
		$(picture_admin).each(function (i, pictureInput) {
			picturesTab[i] = new Collection.PictureAdmin(pictureInput.order, pictureInput.title, pictureInput.type,
				pictureInput.file_name, pictureInput.instruction);
		});
		return picturesTab;
	}

	function instructionTab(instruction) {
		if (typeof instruction == "undefined" || instruction.length == 0) {
			return [];
		} else {
			var instructionTab =  [];
			$(instruction).each(function (i, instr) {
				instructionTab[i] = new Collection.Instruction(instr.txt, instr.moduleObj.order, instr.picObj.order);
			});
			return instructionTab;
		}
	}

	function infoTxtTab(info_txt) {
		if (typeof info_txt == "undefined" || info_txt.length == 0) {
			return [];
		} else {
			var infosTab =  [];
			$(info_txt).each(function (i, infoTxt) {
				infosTab[i] = new Collection.InfoTxt(infoTxt.title, infoTxt.txt);
			});
			return infosTab;
		}
	}

	function filterAdminTab(filter) {
		if (typeof filter == "undefined" || filter.length == 0) {
			return [];
		} else {
			var filterTab =  [];
			$(filter).each(function (i, filterAdmin) {
				filterTab[i] = new Collection.FilterAdmin(filterAdmin.order, filterAdmin.parameter, filterAdmin.init_value,
					filterAdmin.min, filterAdmin.max, filterAdmin.conversion, filterAdmin.step);
			});
			return filterTab;
		}
	}

	function colorTab(color) {
		if (typeof color == "undefined" || color.length == 0) {
			return [];
		} else {
			var colorTab =  [];
			$(color).each(function (i, sortedColor) {
				colorTab[i] = new Collection.SortedColorAdmin(sortedColor.order, sortedColor.color);
			});
			return colorTab;
		}
	}

	function fieldTab(field) {
		if (typeof field == "undefined" || field.length == 0) {
			return [];
		} else {
			var fieldTab =  [];
			$(field).each(function (i, fieldForm) {
				fieldTab[i] = new Collection.FieldForm(fieldForm.order, fieldForm.type, fieldForm.label,
					fieldForm.name, fieldForm.placeholder, fieldForm.required);
			});
			return fieldTab;
		}
	}

	function filterTab(filters) {
		if (typeof filters == "undefined" || filters.length == 0) {
			return [];
		} else {
			var filterTab =  [];
			$(filters).each(function (i, filter) {
				filterTab[i] = new Collection.Filter(filter.parameter, undefined);
			});
			return filterTab;
		}
	}

	function objectOrUndefined(object) {
		if (typeof object != "undefined") {
			return object.fetch();
		} else {
			return undefined;
		}
	}

	function objectOrUndefined2(object) {
		if (typeof object != "undefined") {
			return object;
		} else {
			return undefined;
		}
	}

	function instructionTab2(instruction) {
		if (typeof instruction == "undefined" || instruction.length == 0) {
			return [];
		} else {
			var instructionTab =  [];
			$(instruction).each(function (i, instr) {
				instructionTab[i] = new Collection.Instruction(instr.txt, instr.module_order, instr.picture_order);
			});
			return instructionTab;
		}
	}

})();