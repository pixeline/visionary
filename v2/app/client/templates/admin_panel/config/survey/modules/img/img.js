  /**************************************************************************\
  |  Functions for img templates                                             |
  |      Informations of images to modify + filters and instructions         |
  |      Informations of a previous survey or the default survey introduced  |
  |      Remove of a template img functionnality                             |
  |      Change order with a drag&drop functionnality                        |
  |      Uploading a picture and seeing reactively the result                |
  \**************************************************************************/
  
/* onrendered the ImgAdmin Template => toggle every modules and filter config */
Template.ImgAdmin.onRendered(function () {
    $(".contentAccordions").hide();
    $(".contentAccordionsFilters").hide();
    
    //get a survey if exist and load the images and config of survey
    var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
    if (surveyToModif && !stopInit) {
        $.each(surveyToModif.picture_admin, function (index, pic) {
            $("#typeImg" + (index + 1)).val(pic.type);
            if (index > 0) $("#sameGroup" + (index + 1)).attr('checked', pic.order == surveyToModif.picture_admin[index - 1].order);
            $("#uploadedImg" + (index + 1)).attr('alt', pic.title);
            $("#uploadedImg" + (index + 1)).attr('src', pic.file_name);
            var picture = document.getElementById("uploadedImg" + (index + 1));
            picture.onload = function () {
                $("#uploadedImg" + (index + 1)).attr('width', 400);
                $("#uploadedImg" + (index + 1)).attr('height', 250);
            };
        });
    }
    
    //ressort the images with drag&drop
    $(".sortable").sortable({
        cancel: ".state-disabled",
        placeholder: "ui-state-highlight",

        start: function (event, ui) {
            var start_pos = ui.item.index();
            ui.item.data('start_pos', start_pos);
        },
        update: function (event, ui) {
            //get the position init and final
            var nbrImg = parseInt(Session.get('nbrImg'));
            var start_pos = ui.item.data('start_pos');
            var end_pos = ui.item.index();
            if (end_pos > 0 && end_pos <= nbrImg ) {
                sAlert.info("image n°"+start_pos+" placée en position "+end_pos);
                //get info of start_pos image
                var checked_first = $("#sameGroup" + (start_pos)).prop('checked');
                var type_first = $("#typeImg" + (start_pos)).val();
                var alt_first = $("#uploadedImg" + (start_pos)).attr('alt');
                var src_first = $("#uploadedImg" + (start_pos)).attr('src');
                var valid_first = $("#instructionImg" + (start_pos) + "Valid").val();
                var select_first = $("#instructionImg" + (start_pos) + "Select").val();
                var adjust_first = $("#instructionImg" + (start_pos) + "Adjust").val();
                var choose_first = $("#instructionImg" + (start_pos) + "Choose").val();
                if(start_pos < end_pos) {
                    //replace the content of each image after and including start_pos, with the next one
                    for (i = start_pos; i < end_pos; i++) {
                        changerOrderImg (i, true);
                    }
                } else {
                    //replace the content of each image after and including start_pos, with the previous one
                    for (i = start_pos; i > end_pos; i--) {
                        changerOrderImg (i, false);
                    }
                }
                //replace the content of end_pos image with the start_pos image
                $("#sameGroup" + end_pos).attr('checked', checked_first);
                $("#typeImg" + end_pos).val(type_first);
                $("#uploadedImg" + end_pos).attr('alt', alt_first);
                $("#uploadedImg" + end_pos).attr('src', src_first);
                $("#instructionImg" + end_pos + "Valid").val(valid_first);
                $("#instructionImg" + end_pos + "Select").val(select_first);
                $("#instructionImg" + end_pos + "Adjust").val(adjust_first);
                $("#instructionImg" + end_pos + "Choose").val(choose_first);
            }
            return false;
        }
    });
    $(".sortable").disableSelection();
    
});

/* helper for the admin of images */
Template.ImgAdmin.helpers({
    //true if not first image
    isNotFirst: function (order) {
        return order != 1;
    },
    //an id different for each image template
    idTab: function (order) {
        return "tabImg" + (parseInt(order));
    },
    //an id different for each field in each img module configuration
    mixId: function (field, orderImg) {
        return field + orderImg;
    }
});

/* events in Configuration for modules img */
Template.ImgAdmin.events({
    //toggle an accordion
    'click .moduleAccordions, click .filtersAccordions': function (event) {
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
                            $("#uploadedImg" + orderImg).attr('alt', fileObj.name().split(".")[0]);
                            $("#uploadedImg" + orderImg).attr('src', fileObj.url());
                            $("#uploadedImg" + orderImg).attr('width', 400);
                            $("#uploadedImg" + orderImg).attr('height', 250);
                            computation.stop();
                        }
                    });
                }
            });
        });
    },
    //to remove an image from the config
    'click .delImgAdmin': function (event) {
        //get order of image
        var orderImg = parseInt(event.target.id.split('removeImgAdmin')[1]);
        var nbrImg = parseInt(Session.get('nbrImg'));
        //replace the content of each image after and including orderImg, with the next one
        for (i = orderImg; i < nbrImg; i++) {
            changerOrderImg (i, true);
        }
        //reduce the number of image
        nbrImg--;
        Session.set('nbrImg', nbrImg);
        stopInit = true;
    }
});

/* some utils functions for config of instruction and modules img (valid, select...) in module img */
Template.ContentModuleImg.helpers({
    //return every filters for the current module from settings
    //or from the survey that have to be modify if exist
    filterAdmin: function (module) {
        //get a survey if exist
        var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));

        var surveyConfig;
        if (surveyToModif) {
            surveyConfig = surveyToModif;
        } else {
            surveyConfig = Meteor.settings.public.admin_panel.survey[0];
        }

        var currentModule;
        //return the current module
        $.each(surveyConfig.module_survey, function (index, modCurrent) {
            if (modCurrent.title == module) {
                currentModule = modCurrent;
                return false;
            }
        });
        var filters = currentModule.filter_admin;
        //return current several filter_admin with module
        $.each(filters, function (index, filter) {
            filter.mod = module;
        });
        return filters;
    },
    //return the instruction from previous image and for module only for last image added
    //or the instruction from the survey to modify if exist
    instrDefault: function (module, orderImg, orderModule) {
        if (orderImg != 1 && $(".configModule").length == orderImg - 1) {
            return $("#instructionImg" + (orderImg - 1) + module).val();
        } else {
            //get a survey if exist
            var surveyToModif = JSON.parse(sessionStorage.getItem("surveyToModify"));
            if (surveyToModif && !stopInit) {
                var instrs = surveyToModif.picture_admin[orderImg - 1].instruction;
                var instruction = "";
                //return the instruction of survey to modify
                $.each(instrs, function (index, instr) {
                    if (instr.module_order == orderModule) {
                        instruction = instr.txt;
                        return false;
                    }
                });
                return instruction;
            } else {
                return $("#instructionImg" + orderImg + module).val();
            }
        }
    },
    //true if first image
    isFirst: function (order) {
        return order == 1;
    },
    //an id different for each field in each img module configuration
    mixId: function (id1, id2) {
        return id1 + id2;
    }
});

/* some utils functions for config of filters in module img */
Template.ConfigFilter.helpers({
    //an id different for each filter
    mixId: function (id1, id2, id3) {
        return id1 + id2 + id3;
    }
});


/*  
 *  Function util to change the order of the image in config panel by drag&drop or remove
 */
function changerOrderImg (orderImgAdmin, more) {
    //image that replace the content of the orderImgAdmin
    var orderImgReplace;
    if(more) {
        orderImgReplace = orderImgAdmin+1;
    } else {
        orderImgReplace = orderImgAdmin-1;
    }
    //replace the content of an image with the previous or next one
    $("#sameGroup" + orderImgAdmin).attr('checked', $("#sameGroup" + orderImgReplace).prop('checked'));
    $("#typeImg" + orderImgAdmin).val($("#typeImg" + orderImgReplace).val());
    $("#uploadedImg" + orderImgAdmin).attr('alt', $("#uploadedImg" + orderImgReplace).attr('alt'));
    $("#uploadedImg" + orderImgAdmin).attr('src', $("#uploadedImg" + orderImgReplace).attr('src'));
    $("#instructionImg" + orderImgAdmin + "Valid").val($("#instructionImg" + orderImgReplace + "Valid").val());
    $("#instructionImg" + orderImgAdmin + "Select").val($("#instructionImg" + orderImgReplace + "Select").val());
    $("#instructionImg" + orderImgAdmin + "Adjust").val($("#instructionImg" + orderImgReplace + "Adjust").val());
    $("#instructionImg" + orderImgAdmin + "Choose").val($("#instructionImg" + orderImgReplace + "Choose").val());
}