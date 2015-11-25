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
    
    /* Remove Survey */  
    'removeSurvey': function(surveyId){
        check(surveyId, String);
        //Remove survey data's in MongoDB (+ verification of admin)
        if(isAdmin()){
            var del = survey.remove({_id: surveyId});
            if(del == 0) {
                throw new Meteor.Error("Unauthorized", "Rien à supprimer");
            }
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
    }
    
});
