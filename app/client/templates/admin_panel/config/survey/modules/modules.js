//init the number of images
Session.set('nbrImg', 1);
//if the number of images have been init or not
initModify = false;
stopInit = false;

/* some utils functions for main configuration of modules */
Template.ConfigModules.helpers({
    //return the default infotxt for the moduleName from settings
    //or from the survey that have to be modify if exist
    infoTxt: function (moduleName) {
        //get config if exist
        var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
        
        var surveyConfig;
        if(surveyToModif) {
            surveyConfig = surveyToModif;
        } else {
            surveyConfig = Meteor.settings.public.admin_panel.survey[0];
        }
        
        var currentModule;
        //return the current module
        $.each(surveyConfig.module_survey, function (index, modCurrent) {
            if (modCurrent.title == moduleName) {
                currentModule = modCurrent;
                return false;
            }
        });
        //add help txt only for module upload
        if (moduleName == "Upload") {
            currentModule.info_txt[0].helpTxt = currentModule.info_txt[1];
        }
        
        return currentModule.info_txt[0];
    },
    //previous config of survey
    surveyToAdd: function () {
        var survey = JSON.parse(sessionStorage.getItem("surveyToAdd"));
        return survey;
    },
    //retrieve the images objects and init reactively the counter of images
    images: function () {
        //init the number of images if it's a survey to modify
        var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
        if(surveyToModif && !initModify) {
            var nbImg = surveyToModif.picture_admin.length;
            if(surveyToModif.picture_admin[surveyToModif.picture_admin.length-1].type == "Upload") {
                nbImg --;
            }
            Session.set('nbrImg', nbImg);
            initModify = true;
        }
        
        var nbrImg = Session.get('nbrImg');
        var tabImg = [];
        for (var i = 0; i < nbrImg; i++) {
            var img = {};
            img.order = i + 1;
            tabImg.push(img);
        }
        return tabImg;
    }
});

/* Adding img module's templates */
Template.ConfigModules.events({
    //add one image template
    'click #addImgLabel': function (event) {
        var nbrImg = Session.get('nbrImg');
        nbrImg++;
        Session.set('nbrImg', nbrImg);
        stopInit = true;
    },
    //submit the survey and his modules
    'click #registerSurveyAdmin': function (event) {
        retrieveAndInsertSurvey();
        event.preventDefault();
    }

});

/* some utils functions for configuration of form module */
Template.FormInputConfig.helpers({
    //return true if element == "radio"
    isRadio: function (element) {
        return element == "radio";
    },
    //an id different for each field in each input configuration
    mixId: function (idInput, field) {
        return idInput + field;
    }
});

/*  
 *  Function to retrieve every data about the survey 
 *  And call controller to insert all 
 */
function retrieveAndInsertSurvey() {

    var survey = JSON.parse(sessionStorage.getItem("surveyToAdd"));
    survey.state = false; //disable the survey by default
    //formate every modules and pictures in the survey object
    survey.module_survey = [];
    survey.picture_admin = [];

    var modules = $(".tab-content");
    var order_module = 0;
    var order_picture;
    //iterate on modules or images
    $.each(modules, function (index, modCurrent) {
        //if module type img
        if (modCurrent.id.indexOf("moduleImg") > -1) {

            var orderImg = modCurrent.id.split("moduleImg")[1];
            if (modCurrent.id == "moduleImg1") {

                order_picture = 1;
                var modules_img = $("#moduleImg1 .contentAccordions");
                //iterate on images' modules
                $.each(modules_img, function (index, modImgCurrent) {
                    //get Valid, Select...
                    var moduleSurvey = {};
                    var module_title = modImgCurrent.id.split("1")[0];
                    order_module++;
                        
                    //get info_txt (help txt for each module img)
                    var info_txt = [];
                    var helpTxt = {};
                    helpTxt.title = $("#titleHelpImg" + module_title).val();
                    helpTxt.txt = $("#txtHelpImg" + module_title).val();
                    info_txt.push(helpTxt);

                    var filters = $("#" + module_title + "1 .clearfix");
                    moduleSurvey.filter_admin = [];
                    //iterate on filters
                    $.each(filters, function (index, filterCurrent) {
                        //get filter_admin
                        var filterAdmin = {};
                        var fitlerId = filterCurrent.id;
                        filterAdmin.order = parseInt($("#order" + fitlerId).val());
                        filterAdmin.parameter = $("#type" + fitlerId).val();
                        filterAdmin.init_value = parseInt($("#initValue" + fitlerId).val());
                        filterAdmin.min = parseInt($("#min" + fitlerId).val());
                        filterAdmin.max = parseInt($("#max" + fitlerId).val());
                        filterAdmin.conversion = parseFloat($("#conversion" + fitlerId).val());
                        filterAdmin.step = parseInt($("#step" + fitlerId).val());
                        //insert filter_admin
                        moduleSurvey.filter_admin.push(filterAdmin);
                    });
                        
                    //insert module
                    moduleSurvey.order = order_module;
                    moduleSurvey.title = module_title;
                    moduleSurvey.info_txt = info_txt;
                    survey.module_survey.push(moduleSurvey);

                });

            } else { 
                //incr the order of a picture_admin only if not in the same group 
                if (!$("#sameGroup" + orderImg).prop('checked')) {
                    order_picture++;
                }
            }
            //get picture_admin
            var pictureAdmin = {};
            pictureAdmin.order = order_picture;
            pictureAdmin.title = $("#uploadedImg" + orderImg).attr('alt');
            pictureAdmin.type = $("#typeImg" + orderImg).val();
            pictureAdmin.file_name = $("#uploadedImg" + orderImg).attr('src');

            var modules_img_instr = $("#moduleImg" + orderImg + " .contentAccordions");
            pictureAdmin.instruction = [];
            //iterate on images' modules to retrieve instructions
            $.each(modules_img_instr, function (index, modImgCurrent) {
                var instr = {};
                instr.module = modImgCurrent.id.split(orderImg)[0];
                //get instruction of picture and module
                instr.txt = $("#instructionImg" + orderImg + instr.module).val();
                //insert instruction
                pictureAdmin.instruction.push(instr);
            });
            
            //insert picture
            survey.picture_admin.push(pictureAdmin);

        } else {
            //get Index, Upload...
            var moduleSurvey = {};
            var module_title = modCurrent.id;
            order_module++;

            var info_txt = [];
            //get info_txt
            var infoTxt = {};
            infoTxt.title = $("#title" + module_title).val();
            infoTxt.txt = $("#txt" + module_title).val();
            info_txt.push(infoTxt);

            if (module_title == "Upload")  {
                // get help txt
                var helpTxt = {};
                helpTxt.title = $("#titleHelp" + module_title).val();
                helpTxt.txt = $("#txtHelp" + module_title).val();
                info_txt.push(helpTxt);
                
                var pic_admin = Meteor.settings.public.admin_panel.survey[0].picture_admin;
                var picUp = pic_admin[pic_admin.length - 1];
                // inject a picture_admin for upload picture from settings
                picUp.order = order_picture+1;
                survey.picture_admin.push(picUp);
            }

            if (module_title == "Form")  {
                var inputs = $(".formInputs");
                moduleSurvey.field_form = [];
                //iterate on inputs for module form
                $.each(inputs, function (index, input) {
                    var inputId = input.id;
                    var field = {};
                    //get every field_form
                    field.order = parseInt(inputId.split("inputForm")[1]);
                    field.type = $("#" + inputId + "TypeField").val();
                    field.name = $("#" + inputId + "IdField").val();
                    field.required = $("#" + inputId + "ReqField").prop('checked');
                    field.label = [];
                    field.placeholder = "";
                    if (field.type == "radio") {
                        field.label.push($("#" + inputId + "Option1").val());
                        field.label.push($("#" + inputId + "Option2").val());
                    } else {
                        field.label.push($("#" + inputId + "LabelField").val());
                        field.placeholder = $("#" + inputId + "LabelField").val();
                    }
                    //insert field_form
                    moduleSurvey.field_form.push(field);
                });
            }
                 
            //insert module
            moduleSurvey.order = order_module;
            moduleSurvey.title = module_title;
            moduleSurvey.info_txt = info_txt;
            survey.module_survey.push(moduleSurvey);
        }
    });
    //access to controller to insert server-side
    Controller.InsertSurvey(survey);
    sessionStorage.clear();
    Router.go("Config");
}