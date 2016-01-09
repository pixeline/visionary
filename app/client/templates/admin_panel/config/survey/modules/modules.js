Session.set('nbrImg', 1);

/* some utils functions for main configuration of modules */
Template.ConfigModules.helpers ({
    //return the default infotxt for the moduleName from settings
    infoTxt : function(moduleName){
        var surveyConfig = Meteor.settings.public.admin_panel.survey[0];
        var currentModule;
        //return the current module
        $.each(surveyConfig.module_survey, function( index, modCurrent ) {
            if(modCurrent.title == moduleName) {
                currentModule = modCurrent;
                return false;
            }
        });
        //add help txt only for module upload
        if(moduleName == "Upload") {
            currentModule.info_txt[0].helpTxt = currentModule.info_txt[1];
        }
        return currentModule.info_txt[0];
    },
    surveyToAdd : function(){
        var survey = JSON.parse(sessionStorage.getItem("surveyToAdd"));
        return survey;
    },
    //retrieve the images objects and init reactively the counter of images
    images : function() {
        var nbrImg = Session.get('nbrImg');
        var tabImg = [];
        for(var i = 0; i < nbrImg; i++) {
            var img = {};
            img.order = i+1;
            tabImg.push(img);
        }
        return tabImg;
    }
});

/* Adding img module's templates */
Template.ConfigModules.events ({
    //add one image template
    'click #addImgLabel' : function (event) {
        var nbrImg = Session.get('nbrImg');
        nbrImg++;
        Session.set('nbrImg', nbrImg);
    },
    //submit the survey and his modules
    'click #registerSurveyAdmin' : function (event) {
        getAndInsertSurvey();
        event.preventDefault();
    }
    
});

/* some utils functions for configuration of form module */
Template.FormInputConfig.helpers ({
    //return true if element == "radio"
    isRadio : function(element){
        return element == "radio";
    },
    //an id different for each field in each input configuration
    mixId : function (idInput, field) {
        return idInput+field;
    }
});

/*  Function to retrieve every data about the survey 
 *  And call controller to insert all 
 */
function getAndInsertSurvey () {
    
        var survey = JSON.parse(sessionStorage.getItem("surveyToAdd"));
        survey.state = false; //disable the survey by default
        console.log(survey);
        //var surveyId = sessionStorage.getItem("surveyId");
        
        var modules = $(".tab-content");
        var order_module = 0;
        var order_picture;
        //iterate on modules or images
        $.each(modules, function( index, modCurrent ) {
            if(modCurrent.id.indexOf("moduleImg") > -1) {
                
                var orderImg = modCurrent.id.split("moduleImg")[1];
                if(modCurrent.id == "moduleImg1") {
                    
                    order_picture = 1;
                    var modules_img = $("#moduleImg1 .contentAccordions");
                    //iterate on images' modules
                    $.each(modules_img, function( index, modImgCurrent ) {
                        //get Valid, Select...
                        var module_title = modImgCurrent.id.split("1")[0];
                        order_module++;
                        console.log(module_title, order_module);
                        //get info_txt (help txt for each module img)
                        var infoTxtHelp_title = $("#titleHelpImg"+module_title).val();
                        var infoTxtHelp_txt = $("#txtHelpImg"+module_title).val();
                        console.log(infoTxtHelp_title, infoTxtHelp_txt);
                        
                        var filters = $("#"+module_title+"1 .clearfix");
                        //iterate on filters
                        $.each(filters, function( index, filterCurrent ) {
                            //get filter_admin
                            var fitlerId = filterCurrent.id;
                            var filterAdmin_order = $("#order"+fitlerId).val();
                            var filterAdmin_type = $("#type"+fitlerId).val();
                            var filterAdmin_init_value = $("#initValue"+fitlerId).val();
                            var filterAdmin_min = $("#min"+fitlerId).val();
                            var filterAdmin_max = $("#max"+fitlerId).val();
                            var filterAdmin_conversion = $("#conversion"+fitlerId).val();
                            var filterAdmin_step = $("#step"+fitlerId).val();
                            console.log(filterAdmin_order, filterAdmin_type, filterAdmin_init_value, filterAdmin_min, 
                                filterAdmin_max, filterAdmin_conversion, filterAdmin_step);
                        });
                        
                    });
                    
                } else { 
                    //incr the order of a picture_admin only if not in the same group 
                    if(!$("#sameGroup"+orderImg).prop('checked')) {
                       order_picture++;
                    }
                }
                //get picture_admin
                var pictureAdmin_order = order_picture;
                var pictureAdmin_title = $("#uploadedImg"+orderImg).attr('alt');
                var pictureAdmin_type = $("#typeImg"+orderImg).val();
                var pictureAdmin_file_name = $("#uploadedImg"+orderImg).attr('src');
                console.log(pictureAdmin_order, pictureAdmin_title, pictureAdmin_type, pictureAdmin_file_name);
                
                var modules_img_instr = $("#moduleImg"+orderImg+" .contentAccordions");
                //iterate on images' modules to retrieve instructions
                $.each(modules_img_instr, function( index, modImgCurrent ) {
                    var module_title = modImgCurrent.id.split(orderImg)[0];
                    //get instruction of picture and module
                    var instr = $("#instructionImg"+orderImg+module_title).val();
                    console.log("instruction : " + instr);
                });
                
            } else {
                //get Index, Upload...
                var module_title = modCurrent.id;
                order_module++;
                console.log(module_title, order_module);
                //get info_txt (instruction and help txt)
                 var infoTxt_title = $("#title"+module_title).val();
                 var infoTxt_txt = $("#txt"+module_title).val();
                console.log(infoTxt_title, infoTxt_txt);
                 var infoTxtHelp_title = $("#titleHelp"+module_title).val();
                 var infoTxtHelp_txt = $("#txtHelp"+module_title).val();
                console.log(infoTxtHelp_title, infoTxtHelp_txt);
                
                if(module_title == "Form") {
                    var inputs = $(".formInputs");
                    //iterate on inputs for module form
                    $.each(inputs, function( index, input ) {
                        var inputId = input.id;
                        //get every field_form
                        var fieldForm_order = inputId.split("inputForm")[1];
                        var fieldForm_type = $("#"+inputId+"TypeField").val();
                        var fieldForm_name = $("#"+inputId+"IdField").val();
                        var fieldForm_required = $("#"+inputId+"ReqField").prop('checked');
                        var fieldForm_label = [];
                        var fieldForm_placeholder = "";
                        if(fieldForm_type == "radio") {
                            fieldForm_label.push($("#"+inputId+"Option1").val());
                            fieldForm_label.push($("#"+inputId+"Option2").val());
                        } else {
                            fieldForm_label.push($("#"+inputId+"LabelField").val());
                            fieldForm_placeholder = $("#"+inputId+"LabelField").val();
                        }
                        console.log(fieldForm_order, fieldForm_type, fieldForm_label, 
                            fieldForm_name, fieldForm_placeholder, fieldForm_required);
                    });
                }
            }
        });
        
}