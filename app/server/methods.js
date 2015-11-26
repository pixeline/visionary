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
        return false;
    } 
}

Meteor.methods({
  
    /* Insert Survey */ 
    'insertSurvey': function(surveyObj) { 
        //Check server-side
        check(surveyObj, {
              name : String,
              root_url : String,
              max_reset_counter : Number,
              state : Boolean,
              date_created : String
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
              title : String
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
    
    /* Insert PictureAdmin of survey surveyId*/ 
    'insertPictureAdmin': function(pictureAdmin, surveyId) { 
        //Check server-side
        check(pictureAdmin, {
              order : Number,
              title : String,
              type : String,
              file_name : String
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
              txt : String
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
    }
    
});
