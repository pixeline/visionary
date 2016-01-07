/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

/* function of verification to be an Admin */
function isAdmin () {
    var currentUser = Meteor.user();
    if(currentUser && currentUser.username === "admin"){
        return true;
    } else {
        throw new Meteor.Error("Unauthorized", "Insertion non-autorisée");
    } 
}

/* Insert, Update, Delete in mongoDB */
Meteor.methods({
  
    /*******************
    * PROFILER SYSTEM *
    *******************/
 
	/* Insert Data of User and his Correction Profiles */ 
	'insertUserAndProfiles': function(User, correctionProfilesPicture, surveyName, correctionProfilesResult){ 
		
        //Check server-side
		check(User, {
            name : String,
            firstname: String, 
            email: String, 
            age: Number,
            sex: Boolean, //true if Male, false if Female
            date_created: Number //millisecond since 1970
		});
        
        //check unique email
        var usr = user.findOne( { "email": User.email }, { fields: { "email": 1 } } );
        if(usr) {
            throw new Meteor.Error("Unauthorized", "Email déjà existant");
        }
        
        var survey_id = survey.find().fetch()[0]._id;
        //add the survey foreign key
        User = _.extend(User, {
                survey_id: survey_id
        });
        
        //Insert User Data and return user_id, useful for foreign keys
        user_id = user.insert(User);
        
        //Insert each correction_profile of user and the picture in relation
        correctionProfilesResult.forEach(function (result) {
            var filters_result = result.filter;
            delete result.filter;
            check(result, {
                type : String
            });
            //add the user foreign key
            result = _.extend(result, {
                    user_id: user_id
            });
            //Insert correction_profile_picture Data and return id
            var correc_result_id = correction_profile_result.insert(result);
            
            //insert each filter of correction_profile_picture
            filters_result.forEach(function (filter_result) {
                    check(filter_result, {
                        parameter : String,
                        value: Number
                    });
                    //extend the collection to add foreign key
                    filter_result = _.extend(filter_result, {
                        correction_profile_result_id: correc_result_id
                    });
                    //Insert each filter
                    filter.insert(filter_result);
            });
        });
        
        
        //insert each correction_profile of user and the picture in relation
        correctionProfilesPicture.forEach(function (correc) {
            //if the user have seen the picture
            if(correc.picture.length != 0 && typeof correc.filter_type != "undefined" ) {
                var picture_correc = correc.picture;
                var filters_correc = correc.filter;
                delete correc.picture;
                delete correc.filter;
                check(correc, {
                    filter_type : String,
                    reset_counter : Number
                });
                //add the user foreign key
                correc = _.extend(correc, {
                    user_id: user_id
                });
                //Insert correction_profile_picture Data and return id
                var correc_id = correction_profile_picture.insert(correc);
                
                delete picture_correc.instruction;
                check(picture_correc, {
                    order : Number,
                    title : String,
                    type : String,
                    file_name : String
                });
                //add the correc foreign key
                picture_correc = _.extend(picture_correc, {
                    correction_profile_picture_id: correc_id
                });
                picture.insert(picture_correc);
                
                //if there were a correction on the picture
                if(correc.filter_type != "undefined") {
                    //insert each filter of correction_profile_picture
                    filters_correc.forEach(function (filter_correc) {
                        //if it's the filter chosen lastly
                        if(typeof filter_correc.value != "undefined" && (filter_correc.parameter == correc.filter_type || 
                            (filter_correc.parameter == "hue" && correc.filter_type == "saturation") ||
                            (filter_correc.parameter.split("_")[1] == correc.filter_type.split("_")[1]))) {
                                check(filter_correc, {
                                    parameter : String,
                                    value: Number
                                });
                                //extend the collection to add foreign key
                                filter_correc = _.extend(filter_correc, {
                                    correction_profile_picture_id: correc_id
                                });
                                //Insert each filter
                                filter.insert(filter_correc);
                        }
                    });
                }
            }
        }); 
        
        return user_id;
        
	},
    
    /* Remove User and every collections associated */  
    'removeUser': function(userId){ 
        check(userId, String);
        
        var results = correction_profile_result.find({user_id:userId}, {fields: {_id: 1}});          
        //Call to remove each correc profile result associated
        results.forEach(function (result) {
            Meteor.call('removeCorrecResult', result._id);
        }); 
        
        var picCorrecProfiles = correction_profile_picture.find({user_id:userId}, {fields: {_id: 1}});
        //Call to remove each correc profile picture associated
        picCorrecProfiles.forEach(function (correcProfile) {
            Meteor.call('removeCorrecPicture', correcProfile._id);
        }); 
            
        //remove user
        user.remove({_id: userId});
    },
    
    /* Remove the correction profile result and every collections associated */  
    'removeCorrecResult': function(resultId){ 
        check(resultId, String);
        
        var filters = filter.find({correction_profile_result_id:resultId}, {fields: {_id: 1}});          
        //Call to remove each filters associated
        filters.forEach(function (filter) {
            Meteor.call('removeFilter', filter._id);
        }); 
            
        correction_profile_result.remove({_id: resultId});
    },
    
    /* Remove the correction profile picture and every collections associated */  
    'removeCorrecPicture': function(correcProfileId){ 
        check(correcProfileId, String);
        
        var filters = filter.find({correction_profile_picture_id:correcProfileId}, {fields: {_id: 1}});          
        //Call to remove each filter associated
        filters.forEach(function (filter) {
            Meteor.call('removeFilter', filter._id);
        }); 
        var pictures = picture.find({correction_profile_picture_id:correcProfileId}, {fields: {_id: 1}});          
        //Call to remove each picture associated
        pictures.forEach(function (picture) {
            Meteor.call('removePicture', picture._id);
        }); 
            
        correction_profile_picture.remove({_id: correcProfileId});
    },
    
    /* Remove the picture */  
    'removePicture': function(pictureId){ 
        check(pictureId, String);
        picture.remove({_id: pictureId});
    },
    
    /* Remove the filter */  
    'removeFilter': function(filterId){ 
        check(filterId, String);
        filter.remove({_id: filterId});
    },
    
    /***************
    * ADMIN PANEL *
    ***************/
    
    /* Insert Survey */ 
    'insertSurvey': function(surveyObj) { 
        //Check server-side
        check(surveyObj, {
              name : String,
              root_url : String,
              max_reset_counter : Number,
              max_satis : Number,
              state : Boolean,      //activated (online) or not
              date_created: Number, //millisecond since 1970
              module_survey : Array,
              picture_admin : Array
        });
        //Insert survey data's in MongoDB and return id (+ verification of admin)
        if(isAdmin()){
            return survey.insert(surveyObj);
        }
    },
    
    /* Remove Survey and every collections associated */  
    'removeSurvey': function(surveyId){ 
        check(surveyId, String);
        //Remove survey data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            var modules = module_survey.find({survey_id:surveyId}, {fields: {_id: 1}});          
            //Call to remove each modules associated
            modules.forEach(function (moduleSurvey) {
                Meteor.call('removeModuleSurvey', moduleSurvey._id);
            }); 
            
            var pictures = picture_admin.find({survey_id:surveyId}, {fields: {_id: 1}});
            //Call to remove each pictures associated
            pictures.forEach(function (pictureAdmin) {
                Meteor.call('removePictureAdmin', pictureAdmin._id);
            }); 
            
            //remove survey
            survey.remove({_id: surveyId});
        }
    },
    
    /* Insert ModuleSurvey of survey surveyId*/ 
    'insertModuleSurvey': function(moduleSurveyObj, surveyId) { 
        //Check server-side
        check(moduleSurveyObj, {
              order : Number,
              title : String,
              instruction : Array,
              info_txt : Array,
              filter_admin : Array,
              sorted_color_admin : Array,
              field_form : Array
        });
        
        //extend the collection to join with survey associated
        moduleSurveyObj = _.extend(moduleSurveyObj, {
            survey_id: surveyId
        });
        
        //Insert module data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            return module_survey.insert(moduleSurveyObj);
        }   
    },
    
    /* Remove Module Survey and collections associated */  
    'removeModuleSurvey': function(moduleId){ 
        check(moduleId, String);
        //Remove module_survey data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            var instructions = instruction.find({module_survey_id:moduleId}, {fields: {_id: 1}});
            //Call to remove each instructions associated
            instructions.forEach(function (instr) {
                Meteor.call('removeInstruction', instr._id);
            });
            
            var infoTxts = info_txt.find({module_survey_id:moduleId}, {fields: {_id: 1}});
            //Call to remove each infoTxts associated
            infoTxts.forEach(function (infoTxt) {
                Meteor.call('removeInfoTxt', infoTxt._id);
            });
            
            var colors = sorted_color_admin.find({module_survey_id:moduleId}, {fields: {_id: 1}});
            //Call to remove each colors associated
            colors.forEach(function (color) {
                Meteor.call('removeSortedColorAdmin', color._id);
            });
            
            var filters = filter_admin.find({module_survey_id:moduleId}, {fields: {_id: 1}});
            //Call to remove each filters associated
            filters.forEach(function (filter) {
                Meteor.call('removeFilterAdmin', filter._id);
            });
            
            var fields = field_form.find({module_survey_id:moduleId}, {fields: {_id: 1}});
            //Call to remove each fields associated
            fields.forEach(function (field) {
                Meteor.call('removeFieldForm', field._id);
            });
            
            module_survey.remove({_id: moduleId});
        }
    },
    
    /* Insert PictureAdmin of survey surveyId */ 
    'insertPictureAdmin': function(pictureAdmin, surveyId) { 
        //Check server-side
        check(pictureAdmin, {
              order : Number,
              title : String,
              type : String,
              file_name : String,
              instruction : Array
        });
        
        //extend the collection to join with survey associated
        pictureAdmin = _.extend(pictureAdmin, {
            survey_id: surveyId
        });
        
        //Insert picture data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            return picture_admin.insert(pictureAdmin);
        } 
    },
    
    /* Remove Picture Admin and collections associated */  
    'removePictureAdmin': function(pictureId){ 
        check(pictureId, String);
        //Remove picture_admin data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            var instructions = instruction.find({picture_id:pictureId}, {fields: {_id: 1}});
            //Call to remove each instructions associated
            instructions.forEach(function (instr) {
                Meteor.call('removeInstruction', instr._id);
            });
            picture_admin.remove({_id: pictureId});
        }
    },
    
    /* Insert Instruction of picture pictureId and module moduleId */ 
    'insertInstruction': function(Instruction, pictureId, moduleId) { 
        //Check server-side
        check(Instruction, {
              txt : String,
              module_order : Match.Optional(Number),
              picture_order : Match.Optional(Number)
        });
        
        //extend the collection to join with picture and module associated
        Instruction = _.extend(Instruction, {
            picture_admin_id: pictureId,
            module_survey_id: moduleId
        });
        
        //Insert instruction data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            return instruction.insert(Instruction);
        }  
    },
    
    /* Remove Instruction */  
    'removeInstruction': function(instrId){ 
        check(instrId, String);
        //Remove instruction data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            instruction.remove({_id: instrId});
        }
    },
    
    /* Insert InfoTxt of module moduleId */ 
    'insertInfoTxt': function(infoTxtObj, moduleId) { 
        //Check server-side
        check(infoTxtObj, {
              title : String,
              txt : String
        });
        
        //extend the collection to join with module associated
        infoTxtObj = _.extend(infoTxtObj, {
            module_survey_id: moduleId
        });
        
        //Insert info_txt data's in MongoDB (+ verification of admin)     
        if(isAdmin()){
            return info_txt.insert(infoTxtObj);
        }
    },
    
    /* Remove InfoTxt */  
    'removeInfoTxt': function(infoTxtId){ 
        check(infoTxtId, String);
        //Remove info_txt data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            info_txt.remove({_id: infoTxtId});
        }
    },
    
    /* Insert SortedColorAdmin of module moduleId */ 
    'insertSortedColorAdmin': function(SortedColorObj, moduleId) { 
        //Check server-side
        check(SortedColorObj, {
              order : Number,
              color : String
        });
        
        //extend the collection to join with module associated
        SortedColorObj = _.extend(SortedColorObj, {
            module_survey_id: moduleId
        });
        
        //Insert sorted_color_admin data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            return sorted_color_admin.insert(SortedColorObj);
        } 
    },
    
    /* Remove SortedColorAdmin */  
    'removeSortedColorAdmin': function(sortedColorId){ 
        check(sortedColorId, String);
        //Remove sorted_color_admin data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            sorted_color_admin.remove({_id: sortedColorId});
        }
    },
    
    /* Insert FilterAdmin of module moduleId */ 
    'insertFilterAdmin': function(filterObj, moduleId) { 
        //Check server-side
        check(filterObj, {
            order : Number,
            parameter : String,
            init_value : Number,
            min : Number,
            max : Number,
            conversion : Number,
            step : Number
        });
        
        //extend the collection to join with module associated
        filterObj = _.extend(filterObj, {
            module_survey_id: moduleId
        });
        
        //Insert filter_admin data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            return filter_admin.insert(filterObj);
        }  
    },
    
    /* Remove FilterAdmin */  
    'removeFilterAdmin': function(filterId){ 
        check(filterId, String);
        //Remove filer_admin data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            filter_admin.remove({_id: filterId});
        }
    },
    
    /* Insert FieldForm of module moduleId */ 
    'insertFieldForm': function(fieldObj, moduleId) { 
        //Check server-side
        check(fieldObj, {
            order : Number,
            type : String,
            label : [String],
            name : String,
            placeholder : String,
            required : Boolean
        });
        
        //extend the collection to join with module associated
        fieldObj = _.extend(fieldObj, {
            module_survey_id: moduleId
        });
        
        //Insert filter_admin data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            return field_form.insert(fieldObj);
        } 
    },
    
    /* Remove FieldForm */  
    'removeFieldForm': function(fieldId){ 
        check(fieldId, String);
        //Remove field_form data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            field_form.remove({_id: fieldId});
        }
    },
    
    //know if user is admin or not
    'isAdmin': function () {
        return isAdmin();
    }
    
});
