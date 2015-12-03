/* Create mock data coming from settings */
Template.AdminMock.onRendered (function () {
        //link with settings and insert data for one survey
        if(Meteor.settings.public.mock) {
            var surveyActive = survey.findOne({state : true});
            if (typeof surveyActive == "undefined") {
                var surveyMock = Meteor.settings.public.admin_panel.survey[0];
                Controller.InsertSurvey(surveyMock);
            }
        }
});

/* Create mock data coming from settings */
Template.AdminMock.events ({
    //remove survey
    'click #removeSurvey': function(event){
        event.preventDefault();
        var idSurvey = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveSurvey(idSurvey);
    },
    
    //link with settings and insert data for modules
    'click #addModule': function(event){
        event.preventDefault();
        var idSurvey = $(event.target.parentNode.parentNode).attr('id');
        var mock = Meteor.settings.public.admin_panel.survey[0].module_survey;
        //insert each module
        $.each(mock, function( index, value ) {
            Controller.InsertModuleSurvey(value, idSurvey);
        });
    },
    
    //remove module
    'click #removeModule': function(event){
        event.preventDefault();
        var idModule = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveModuleSurvey(idModule);
    },
    
    //link with settings and insert data for field_form associate with appropriate module
    'click #addPicture': function(event){
        event.preventDefault();
        var idSurvey = $(event.target.parentNode.parentNode).attr('id');
        var mock = Meteor.settings.public.admin_panel.survey[0].picture_admin;
        //insert each picture
        $.each(mock, function( index, value ) {
            Controller.InsertPictureAdmin(value, idSurvey);
        }); 
    },
    
    //remove picture
    'click #removePicture': function(event){
        event.preventDefault();
        var idPicture = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemovePictureAdmin(idPicture);
    },
    
    //link with settings and insert data for info_txt associate with appropriate module
    'click #addInfotxt': function(event){
        event.preventDefault();
        var idModule = $(event.target.parentNode.parentNode).attr('id');
        var titleModule = $(event.target.parentNode.parentNode).attr('title');
        var mock = Meteor.settings.public.admin_panel.survey[0].module_survey;
        //filter to insert just info_txt for the selected module
        $.each(mock, function( index, value ) {
            if(value.title == titleModule) return mock = value;
        });
        if(typeof mock.info_txt != "undefined") {
            $.each(mock.info_txt, function( index, value ) {
                Controller.InsertInfoTxt(value, idModule);
            });
        } else {
            sAlert.warning("Rien à insérer !");
        }
    },
    
    //remove InfoTxt
    'click #removeInfoTxt': function(event){
        event.preventDefault();
        var idInfoTxt = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveInfoTxt(idInfoTxt);
    },
    
    //link with settings and insert data for sorted_color_admin associate with appropriate module
    'click #addColor': function(event){
        event.preventDefault();
        var idModule = $(event.target.parentNode.parentNode).attr('id');
        var titleModule = $(event.target.parentNode.parentNode).attr('title');
        var mock = Meteor.settings.public.admin_panel.survey[0].module_survey;
        //filter to insert just color for the selected module
        $.each(mock, function( index, value ) {
            if(value.title == titleModule) return mock = value;
        });
        if(typeof mock.sorted_color_admin != "undefined") {
            $.each(mock.sorted_color_admin, function( index, value ) {
                Controller.InsertSortedColorAdmin(value, idModule);
            });
        } else {
            sAlert.warning("Rien à insérer !");
        }
    },
    
    //remove color
    'click #removeColor': function(event){
        event.preventDefault();
        var idColor = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveSortedColorAdmin(idColor);
    },
    
    //link with settings and insert data for filter_admin associate with appropriate module
    'click #addFilter': function(event){
        event.preventDefault();
        var idModule = $(event.target.parentNode.parentNode).attr('id');
        var titleModule = $(event.target.parentNode.parentNode).attr('title');
        var mock = Meteor.settings.public.admin_panel.survey[0].module_survey;
        //filter to insert just info_txt for the selected module
        $.each(mock, function( index, value ) {
            if(value.title == titleModule) return mock = value;
        });
        if(typeof mock.filter_admin != "undefined") {
            $.each(mock.filter_admin, function( index, value ) {
                Controller.InsertFilterAdmin(value, idModule);
            });
        } else {
            sAlert.warning("Rien à insérer !");
        }
    },
    
    //remove filter
    'click #removeFilter': function(event){
        event.preventDefault();
        var idFilter = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveFilterAdmin(idFilter);
    },
    
    //link with settings and insert data for instruction associate with appropriate picture and module
    'click #addInstruction': function(event){
        event.preventDefault();
        var idPicture = $(event.target.parentNode.parentNode).attr('id');
        var titlePicture = $(event.target.parentNode.parentNode).attr('title');
        var idModule = $(event.target.parentNode).attr('id');
        var titleModule = $(event.target.parentNode).attr('title');
        var mock = Meteor.settings.public.admin_panel.survey[0].picture_admin;
        
        //filter to have only the selected picture
        $.each(mock, function( index, value ) {
            if(value.title == titlePicture) return mock = value;
        });
        
        if(typeof mock.instruction != "undefined") {
            //filter to have only the selected module
            $.each(mock.instruction, function( index, value ) {
                if(value.module == titleModule) return mock = value;
            });
            if(typeof mock.module != "undefined") {
                //insert just one instruction assiocate with one picture and one module
                Controller.InsertInstruction(mock, idPicture, idModule);
            } else {
                sAlert.warning("Rien à insérer !");
            }
        } else {
            sAlert.warning("Rien à insérer !");
        }
    },
    
    //remove instruction
    'click #removeInstruction': function(event){
        event.preventDefault();
        var idInstruction = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveInstruction(idInstruction);
    },
    
    //link with settings and insert data for field_form associate with appropriate module
    'click #addForm': function(event){
        event.preventDefault();
        var idModule = $(event.target.parentNode.parentNode).attr('id');
        var titleModule = $(event.target.parentNode.parentNode).attr('title');
        var mock = Meteor.settings.public.admin_panel.survey[0].module_survey;
        //filter to insert just info_txt for the selected module
        $.each(mock, function( index, value ) {
            if(value.title == titleModule) return mock = value;
        });
        if(typeof mock.field_form != "undefined") {
            $.each(mock.field_form, function( index, value ) {
                Controller.InsertFieldForm(value, idModule);
            });
        } else {
            sAlert.warning("Rien à insérer !");
        }
    },
    
    //remove fieldForm
    'click #removeFieldForm': function(event){
        event.preventDefault();
        var idForm = $(event.target.parentNode.parentNode).attr('id');
        Controller.RemoveFieldForm(idForm);
    },
    
});