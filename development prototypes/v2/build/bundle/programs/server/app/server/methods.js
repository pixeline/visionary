(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/methods.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/********************************************************************\
|  Data-access and process in MongoDB (pattern Method-call and DAO)  |
\********************************************************************/
                                                                       //
/* Insert, Update, Delete in mongoDB */                                //
Meteor.methods({                                                       // 7
                                                                       //
    /*******************                                               //
    * PROFILER SYSTEM *                                                //
    *******************/                                               //
                                                                       //
    /* Insert Data of User and his Correction Profiles */              //
    'insertUserAndProfiles': function (User, correctionProfilesPicture, surveyName, correctionProfilesResult) {
                                                                       //
        //Check server-side                                            //
        check(User, {                                                  // 17
            name: String,                                              // 18
            firstname: String,                                         // 19
            email: String,                                             // 20
            age: Number,                                               // 21
            sex: Boolean, //true if Male, false if Female              // 22
            date_created: Number //millisecond since 1970              // 23
        });                                                            //
                                                                       //
        //check unique email                                           //
        var usr = user.findOne({ "email": User.email }, { fields: { "email": 1 } });
        if (usr) {                                                     // 28
            throw new Meteor.Error("Unauthorized", "Email déjà existant");
        }                                                              //
                                                                       //
        var survey_id = survey.find().fetch()[0]._id;                  // 32
        //add the survey foreign key                                   //
        User = _.extend(User, {                                        // 34
            survey_id: survey_id                                       // 35
        });                                                            //
                                                                       //
        //Insert User Data and return user_id, useful for foreign keys
        user_id = user.insert(User);                                   // 39
                                                                       //
        //Insert each correction_profile of user and the picture in relation
        correctionProfilesResult.forEach(function (result) {           // 42
            var filters_result = result.filter;                        // 43
            delete result.filter;                                      // 44
            check(result, {                                            // 45
                type: String                                           // 46
            });                                                        //
            //add the user foreign key                                 //
            result = _.extend(result, {                                // 49
                user_id: user_id                                       // 50
            });                                                        //
            //Insert correction_profile_picture Data and return id     //
            var correc_result_id = correction_profile_result.insert(result);
                                                                       //
            //insert each filter of correction_profile_picture         //
            filters_result.forEach(function (filter_result) {          // 56
                check(filter_result, {                                 // 57
                    parameter: String,                                 // 58
                    value: Number                                      // 59
                });                                                    //
                //extend the collection to add foreign key             //
                filter_result = _.extend(filter_result, {              // 62
                    correction_profile_result_id: correc_result_id     // 63
                });                                                    //
                //Insert each filter                                   //
                filter.insert(filter_result);                          // 66
            });                                                        //
        });                                                            //
                                                                       //
        //insert each correction_profile of user and the picture in relation
        correctionProfilesPicture.forEach(function (correc) {          // 72
            //if the user have seen the picture                        //
            if (correc.picture.length != 0 && typeof correc.filter_type != "undefined") {
                var picture_correc = correc.picture;                   // 75
                var filters_correc = correc.filter;                    // 76
                delete correc.picture;                                 // 77
                delete correc.filter;                                  // 78
                check(correc, {                                        // 79
                    filter_type: String,                               // 80
                    reset_counter: Number                              // 81
                });                                                    //
                //add the user foreign key                             //
                correc = _.extend(correc, {                            // 84
                    user_id: user_id                                   // 85
                });                                                    //
                //Insert correction_profile_picture Data and return id
                var correc_id = correction_profile_picture.insert(correc);
                                                                       //
                delete picture_correc.instruction;                     // 90
                check(picture_correc, {                                // 91
                    order: Number,                                     // 92
                    title: String,                                     // 93
                    type: String,                                      // 94
                    file_name: String                                  // 95
                });                                                    //
                //add the correc foreign key                           //
                picture_correc = _.extend(picture_correc, {            // 98
                    correction_profile_picture_id: correc_id           // 99
                });                                                    //
                picture.insert(picture_correc);                        // 101
                                                                       //
                //if there were a correction on the picture            //
                if (correc.filter_type != "undefined") {               // 104
                    //insert each filter of correction_profile_picture
                    filters_correc.forEach(function (filter_correc) {  // 106
                        //if it's the filter chosen lastly             //
                        if (typeof filter_correc.value != "undefined" && (filter_correc.parameter == correc.filter_type || filter_correc.parameter == "hue" && correc.filter_type == "saturation" || filter_correc.parameter.split("_")[1] == correc.filter_type.split("_")[1])) {
                            check(filter_correc, {                     // 111
                                parameter: String,                     // 112
                                value: Number                          // 113
                            });                                        //
                            //extend the collection to add foreign key
                            filter_correc = _.extend(filter_correc, {  // 116
                                correction_profile_picture_id: correc_id
                            });                                        //
                            //Insert each filter                       //
                            filter.insert(filter_correc);              // 120
                        }                                              //
                    });                                                //
                }                                                      //
            }                                                          //
        });                                                            //
                                                                       //
        return user_id;                                                // 127
    },                                                                 //
                                                                       //
    /* Remove User and every collections associated */                 //
    'removeUser': function (userId) {                                  // 132
        check(userId, String);                                         // 133
                                                                       //
        var results = correction_profile_result.find({ user_id: userId }, { fields: { _id: 1 } });
        //Call to remove each correc profile result associated         //
        results.forEach(function (result) {                            // 137
            Meteor.call('removeCorrecResult', result._id);             // 138
        });                                                            //
                                                                       //
        var picCorrecProfiles = correction_profile_picture.find({ user_id: userId }, { fields: { _id: 1 } });
        //Call to remove each correc profile picture associated        //
        picCorrecProfiles.forEach(function (correcProfile) {           // 143
            Meteor.call('removeCorrecPicture', correcProfile._id);     // 144
        });                                                            //
                                                                       //
        //remove user                                                  //
        user.remove({ _id: userId });                                  // 148
    },                                                                 //
                                                                       //
    /* Remove the correction profile result and every collections associated */
    'removeCorrecResult': function (resultId) {                        // 152
        check(resultId, String);                                       // 153
                                                                       //
        var filters = filter.find({ correction_profile_result_id: resultId }, { fields: { _id: 1 } });
        //Call to remove each filters associated                       //
        filters.forEach(function (filter) {                            // 157
            Meteor.call('removeFilter', filter._id);                   // 158
        });                                                            //
                                                                       //
        correction_profile_result.remove({ _id: resultId });           // 161
    },                                                                 //
                                                                       //
    /* Remove the correction profile picture and every collections associated */
    'removeCorrecPicture': function (correcProfileId) {                // 165
        check(correcProfileId, String);                                // 166
                                                                       //
        var filters = filter.find({ correction_profile_picture_id: correcProfileId }, { fields: { _id: 1 } });
        //Call to remove each filter associated                        //
        filters.forEach(function (filter) {                            // 170
            Meteor.call('removeFilter', filter._id);                   // 171
        });                                                            //
        var pictures = picture.find({ correction_profile_picture_id: correcProfileId }, { fields: { _id: 1 } });
        //Call to remove each picture associated                       //
        pictures.forEach(function (picture) {                          // 175
            Meteor.call('removePicture', picture._id);                 // 176
        });                                                            //
                                                                       //
        correction_profile_picture.remove({ _id: correcProfileId });   // 179
    },                                                                 //
                                                                       //
    /* Remove the picture */                                           //
    'removePicture': function (pictureId) {                            // 183
        check(pictureId, String);                                      // 184
        picture.remove({ _id: pictureId });                            // 185
    },                                                                 //
                                                                       //
    /* Remove the filter */                                            //
    'removeFilter': function (filterId) {                              // 189
        check(filterId, String);                                       // 190
        filter.remove({ _id: filterId });                              // 191
    },                                                                 //
                                                                       //
    /***************                                                   //
    * ADMIN PANEL *                                                    //
    ***************/                                                   //
                                                                       //
    /* Insert Survey */                                                //
    'insertSurvey': function (surveyObj) {                             // 200
        //Check server-side                                            //
        check(surveyObj, {                                             // 202
            name: String,                                              // 203
            root_url: String,                                          // 204
            max_reset_counter: Number,                                 // 205
            max_satis: Number,                                         // 206
            state: Boolean, //activated (online) or not                // 207
            date_created: Number, //millisecond since 1970             // 208
            module_survey: Array,                                      // 209
            picture_admin: Array                                       // 210
        });                                                            //
        //Insert survey data's in MongoDB and return id (+ verification of admin)
        if (isAdmin()) {                                               // 213
            return survey.insert(surveyObj);                           // 214
        }                                                              //
    },                                                                 //
                                                                       //
    /* Update Survey's state ; active or disable */                    //
    'updateStateSurvey': function (surveyId, stateToPut) {             // 219
        check(surveyId, String);                                       // 220
        check(stateToPut, Boolean);                                    // 221
        // Set the state of survey to true                             //
        survey.update(surveyId, {                                      // 223
            $set: { state: stateToPut }                                // 224
        });                                                            //
    },                                                                 //
                                                                       //
    /* Remove Survey and every collections associated */               //
    'removeSurvey': function (surveyId) {                              // 229
        check(surveyId, String);                                       // 230
        //Remove survey data's in MongoDB (+ verification of admin)    //
        if (isAdmin()) {                                               // 232
            var modules = module_survey.find({ survey_id: surveyId }, { fields: { _id: 1 } });
            //Call to remove each modules associated                   //
            modules.forEach(function (moduleSurvey) {                  // 235
                Meteor.call('removeModuleSurvey', moduleSurvey._id);   // 236
            });                                                        //
                                                                       //
            var pictures = picture_admin.find({ survey_id: surveyId }, { fields: { _id: 1 } });
            //Call to remove each pictures associated                  //
            pictures.forEach(function (pictureAdmin) {                 // 241
                Meteor.call('removePictureAdmin', pictureAdmin._id);   // 242
            });                                                        //
                                                                       //
            //remove survey                                            //
            survey.remove({ _id: surveyId });                          // 246
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert ModuleSurvey of survey surveyId*/                        //
    'insertModuleSurvey': function (moduleSurveyObj, surveyId) {       // 251
        //Check server-side                                            //
        check(moduleSurveyObj, {                                       // 253
            order: Number,                                             // 254
            title: String,                                             // 255
            instruction: Array,                                        // 256
            info_txt: Array,                                           // 257
            filter_admin: Array,                                       // 258
            sorted_color_admin: Array,                                 // 259
            field_form: Array                                          // 260
        });                                                            //
                                                                       //
        //extend the collection to join with survey associated         //
        moduleSurveyObj = _.extend(moduleSurveyObj, {                  // 264
            survey_id: surveyId                                        // 265
        });                                                            //
                                                                       //
        //Insert module data's in MongoDB (+ verification of admin)    //
        if (isAdmin()) {                                               // 269
            return module_survey.insert(moduleSurveyObj);              // 270
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove Module Survey and collections associated */              //
    'removeModuleSurvey': function (moduleId) {                        // 275
        check(moduleId, String);                                       // 276
        //Remove module_survey data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 278
            var instructions = instruction.find({ module_survey_id: moduleId }, { fields: { _id: 1 } });
            //Call to remove each instructions associated              //
            instructions.forEach(function (instr) {                    // 281
                Meteor.call('removeInstruction', instr._id);           // 282
            });                                                        //
                                                                       //
            var infoTxts = info_txt.find({ module_survey_id: moduleId }, { fields: { _id: 1 } });
            //Call to remove each infoTxts associated                  //
            infoTxts.forEach(function (infoTxt) {                      // 287
                Meteor.call('removeInfoTxt', infoTxt._id);             // 288
            });                                                        //
                                                                       //
            var colors = sorted_color_admin.find({ module_survey_id: moduleId }, { fields: { _id: 1 } });
            //Call to remove each colors associated                    //
            colors.forEach(function (color) {                          // 293
                Meteor.call('removeSortedColorAdmin', color._id);      // 294
            });                                                        //
                                                                       //
            var filters = filter_admin.find({ module_survey_id: moduleId }, { fields: { _id: 1 } });
            //Call to remove each filters associated                   //
            filters.forEach(function (filter) {                        // 299
                Meteor.call('removeFilterAdmin', filter._id);          // 300
            });                                                        //
                                                                       //
            var fields = field_form.find({ module_survey_id: moduleId }, { fields: { _id: 1 } });
            //Call to remove each fields associated                    //
            fields.forEach(function (field) {                          // 305
                Meteor.call('removeFieldForm', field._id);             // 306
            });                                                        //
                                                                       //
            module_survey.remove({ _id: moduleId });                   // 309
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert PictureAdmin of survey surveyId */                       //
    'insertPictureAdmin': function (pictureAdmin, surveyId) {          // 314
        //Check server-side                                            //
        check(pictureAdmin, {                                          // 316
            order: Number,                                             // 317
            title: String,                                             // 318
            type: String,                                              // 319
            file_name: String,                                         // 320
            instruction: Array                                         // 321
        });                                                            //
                                                                       //
        //extend the collection to join with survey associated         //
        pictureAdmin = _.extend(pictureAdmin, {                        // 325
            survey_id: surveyId                                        // 326
        });                                                            //
                                                                       //
        //Insert picture data's in MongoDB (+ verification of admin)   //
        if (isAdmin()) {                                               // 330
            return picture_admin.insert(pictureAdmin);                 // 331
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove Picture Admin and collections associated */              //
    'removePictureAdmin': function (pictureId) {                       // 336
        check(pictureId, String);                                      // 337
        //Remove picture_admin data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 339
            var instructions = instruction.find({ picture_id: pictureId }, { fields: { _id: 1 } });
            //Call to remove each instructions associated              //
            instructions.forEach(function (instr) {                    // 342
                Meteor.call('removeInstruction', instr._id);           // 343
            });                                                        //
            picture_admin.remove({ _id: pictureId });                  // 345
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert Instruction of picture pictureId and module moduleId */  //
    'insertInstruction': function (Instruction, pictureId, moduleId) {
        //Check server-side                                            //
        check(Instruction, {                                           // 352
            txt: String,                                               // 353
            module_order: Match.Optional(Number),                      // 354
            picture_order: Match.Optional(Number)                      // 355
        });                                                            //
                                                                       //
        //extend the collection to join with picture and module associated
        Instruction = _.extend(Instruction, {                          // 359
            picture_admin_id: pictureId,                               // 360
            module_survey_id: moduleId                                 // 361
        });                                                            //
                                                                       //
        //Insert instruction data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 365
            return instruction.insert(Instruction);                    // 366
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove Instruction */                                           //
    'removeInstruction': function (instrId) {                          // 371
        check(instrId, String);                                        // 372
        //Remove instruction data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 374
            instruction.remove({ _id: instrId });                      // 375
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert InfoTxt of module moduleId */                            //
    'insertInfoTxt': function (infoTxtObj, moduleId) {                 // 380
        //Check server-side                                            //
        check(infoTxtObj, {                                            // 382
            title: String,                                             // 383
            txt: String                                                // 384
        });                                                            //
                                                                       //
        //extend the collection to join with module associated         //
        infoTxtObj = _.extend(infoTxtObj, {                            // 388
            module_survey_id: moduleId                                 // 389
        });                                                            //
                                                                       //
        //Insert info_txt data's in MongoDB (+ verification of admin)    
        if (isAdmin()) {                                               // 393
            return info_txt.insert(infoTxtObj);                        // 394
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove InfoTxt */                                               //
    'removeInfoTxt': function (infoTxtId) {                            // 399
        check(infoTxtId, String);                                      // 400
        //Remove info_txt data's in MongoDB (+ verification of admin)  //
        if (isAdmin()) {                                               // 402
            info_txt.remove({ _id: infoTxtId });                       // 403
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert SortedColorAdmin of module moduleId */                   //
    'insertSortedColorAdmin': function (SortedColorObj, moduleId) {    // 408
        //Check server-side                                            //
        check(SortedColorObj, {                                        // 410
            order: Number,                                             // 411
            color: String                                              // 412
        });                                                            //
                                                                       //
        //extend the collection to join with module associated         //
        SortedColorObj = _.extend(SortedColorObj, {                    // 416
            module_survey_id: moduleId                                 // 417
        });                                                            //
                                                                       //
        //Insert sorted_color_admin data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 421
            return sorted_color_admin.insert(SortedColorObj);          // 422
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove SortedColorAdmin */                                      //
    'removeSortedColorAdmin': function (sortedColorId) {               // 427
        check(sortedColorId, String);                                  // 428
        //Remove sorted_color_admin data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 430
            sorted_color_admin.remove({ _id: sortedColorId });         // 431
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert FilterAdmin of module moduleId */                        //
    'insertFilterAdmin': function (filterObj, moduleId) {              // 436
        //Check server-side                                            //
        check(filterObj, {                                             // 438
            order: Number,                                             // 439
            parameter: String,                                         // 440
            init_value: Number,                                        // 441
            min: Number,                                               // 442
            max: Number,                                               // 443
            conversion: Number,                                        // 444
            step: Number                                               // 445
        });                                                            //
                                                                       //
        //extend the collection to join with module associated         //
        filterObj = _.extend(filterObj, {                              // 449
            module_survey_id: moduleId                                 // 450
        });                                                            //
                                                                       //
        //Insert filter_admin data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 454
            return filter_admin.insert(filterObj);                     // 455
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove FilterAdmin */                                           //
    'removeFilterAdmin': function (filterId) {                         // 460
        check(filterId, String);                                       // 461
        //Remove filer_admin data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 463
            filter_admin.remove({ _id: filterId });                    // 464
        }                                                              //
    },                                                                 //
                                                                       //
    /* Insert FieldForm of module moduleId */                          //
    'insertFieldForm': function (fieldObj, moduleId) {                 // 469
        //Check server-side                                            //
        check(fieldObj, {                                              // 471
            order: Number,                                             // 472
            type: String,                                              // 473
            label: [String],                                           // 474
            name: String,                                              // 475
            placeholder: String,                                       // 476
            required: Boolean                                          // 477
        });                                                            //
                                                                       //
        //extend the collection to join with module associated         //
        fieldObj = _.extend(fieldObj, {                                // 481
            module_survey_id: moduleId                                 // 482
        });                                                            //
                                                                       //
        //Insert filter_admin data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 486
            return field_form.insert(fieldObj);                        // 487
        }                                                              //
    },                                                                 //
                                                                       //
    /* Remove FieldForm */                                             //
    'removeFieldForm': function (fieldId) {                            // 492
        check(fieldId, String);                                        // 493
        //Remove field_form data's in MongoDB (+ verification of admin)
        if (isAdmin()) {                                               // 495
            field_form.remove({ _id: fieldId });                       // 496
        }                                                              //
    },                                                                 //
                                                                       //
    //know if user is admin or not                                     //
    'isAdmin': function () {                                           // 501
        return isAdmin();                                              // 502
    }                                                                  //
                                                                       //
});                                                                    //
                                                                       //
/* function of verification to be an Admin */                          //
function isAdmin() {                                                   // 508
    var currentUser = Meteor.user();                                   // 509
    if (currentUser && currentUser.username === "admin") {             // 510
        return true;                                                   // 511
    } else {                                                           //
        throw new Meteor.Error("Unauthorized", "Insertion non-autorisée");
    }                                                                  //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=methods.js.map
