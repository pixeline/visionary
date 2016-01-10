
/* onrendered the ImgAdmin Template => toggle every modules and filter config */
Template.ImgAdmin.onRendered (function () {
    $(".contentAccordions").hide();
    $(".contentAccordionsFilters").hide();
    
    //get a survey if exist and load the images
    var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
    if(surveyToModif && !stopInit) {
        $.each(surveyToModif.picture_admin, function( index, pic ) {
            $("#uploadedImg"+(index+1)).attr('alt', pic.title);
            $("#uploadedImg"+(index+1)).attr('src', pic.file_name);
            var picture = document.getElementById("uploadedImg"+(index+1)); 
            picture.onload=function(){
                $("#uploadedImg"+(index+1)).attr('width', 400);
                $("#uploadedImg"+(index+1)).attr('height', 250);
            };
        });
    }
});

/* helper for the admin of images */
Template.ImgAdmin.helpers ({
    //true if not first image
    isNotFirst : function (order) {
        return order != 1;
    },
    //an id different for each image template
    idTab : function (order) {
        return "tabImg"+(parseInt(order));
    },
    //an id different for each field in each img module configuration
    mixId : function (field, orderImg) {
        return field+orderImg;
    },
    //retrieve picture if it's a survey to modify
    pictureModify : function (orderImg, field) {
        //get a survey if exist
        var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
        if(surveyToModif && !stopInit) {
            return surveyToModif.picture_admin[orderImg-1][field];
        } else {
            return surveyToModif.picture_admin[orderImg-1][field];
        }
    },
    //return true if
    isSameGroup : function (orderImg) {
        //get a survey if exist
        var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
        if(surveyToModif && !stopInit) {
            return surveyToModif.picture_admin[orderImg-1].order == surveyToModif.picture_admin[orderImg-2].order;
        } else {
            return false;
        }
    }
});

/* events in Configuration for modules img */
Template.ImgAdmin.events ({
    //toggle an accordion
    'click .moduleAccordions, click .filtersAccordions' : function (event) {
        $(event.target.parentNode).next().toggle("slow");
    },
    //to upload images
    'change .uploadImg': function (event) {
        //get order of image
        var orderImg = event.target.id.split('uploadImg')[1];
        //insert file in server
        FS.Utility.eachFile(event, function (file) {
            picture_upload.insert(file, function (err, result) {
                if (err) {
                    sAlert.error("Veuillez choisir un fichier de type image.");
                } else {
                    //Some Reactive tracker to check when the file is ready
                    Deps.autorun(function (computation) {
                        var fileObj = picture_upload.findOne(result._id);
                        if (fileObj.hasStored('picture_upload')) {
                            //last picture uploaded show and insert name and url
                            $("#uploadedImg"+orderImg).attr('alt', fileObj.name().split(".")[0]);
                            $("#uploadedImg"+orderImg).attr('src', fileObj.url());
                            $("#uploadedImg"+orderImg).attr('width', 400);
                            $("#uploadedImg"+orderImg).attr('height', 250);
                            computation.stop();
                        }
                    });
                }
            });
        });
    }
});

/* some utils functions for config of instruction and modules img (valid, select...) in module img */
Template.ContentModuleImg.helpers ({
    //return every filters for the current module from settings
    //or from the survey that have to be modify if exist
    filterAdmin : function (module) {
        //get a survey if exist
        var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
        
        var surveyConfig;
        if(surveyToModif) {
            surveyConfig = surveyToModif;
        } else {
            surveyConfig = Meteor.settings.public.admin_panel.survey[0];
        }
        
        var currentModule;
        //return the current module
        $.each(surveyConfig.module_survey, function( index, modCurrent ) {
            if(modCurrent.title == module) {
                currentModule = modCurrent;
                return false;
            }
        });
        var filters = currentModule.filter_admin;
        //return current several filter_admin with module
        $.each(filters, function( index, filter ) {
            filter.mod = module;
        });
        return filters;
    },
    //return the instruction from previous image and for module only for last image added
    //or the instruction from the survey to modify if exist
    instrDefault : function (module, orderImg, orderModule) {
        if (orderImg != 1 && $(".configModule").length == orderImg-1) {
            return $("#instructionImg"+(orderImg-1)+module).val();
        } else {
            //get a survey if exist
            var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
            if(surveyToModif && !stopInit) {
                var instrs = surveyToModif.picture_admin[orderImg-1].instruction;
                var instruction = "";
                //return the instruction of survey to modify
                $.each(instrs, function( index, instr ) {
                    if(instr.module_order == orderModule) {
                        instruction = instr.txt;
                        return false;
                    }
                });
                return instruction;
            } else {
                return $("#instructionImg"+orderImg+module).val();
            }
        }
    },
    //true if first image
    isFirst : function (order) {
        return order == 1;
    },
    //an id different for each field in each img module configuration
    mixId : function (id1, id2) {
        return id1+id2;
    }
});

/* some utils functions for config of filters in module img */
Template.ConfigFilter.helpers ({
    //an id different for each filter
    mixId : function (id1, id2, id3) {
        return id1+id2+id3;
    }
});