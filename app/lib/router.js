//root_url of the current application
var root_url = Meteor.settings.public.admin_panel.survey[0].root_url;

/* Route configuration */
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
}); 

/*****************************
 * Correction Tool Prototype *
 *****************************/

/* Homepage of the application */
Router.route(root_url, {
    name: 'Index',
    template: 'Index',
    controller: 'IndexController'
});

/* Template to select a picture (between several types of correction) */
Router.route(root_url+'/select', {
    name: 'Select',
    template: 'Select'
});

/* Template to select a picture (between several types of correction) */
Router.route(root_url+'/select_ligne', {
    name: 'Select_ligne',
    template: 'Select_ligne'
});

/* Template to adjust first color correction of a picture */
Router.route(root_url+'/adjust', {
    name: 'Adjust',
    template: 'Adjust'
});
/* Template to choose best second correction adjustment of a picture */
Router.route(root_url+'/choice', {
    name: 'Choice',
    template: 'Choice'
});
/* Template to upload a picture and correct it */
Router.route(root_url+'/upload', {
    name: 'Upload',
    template: 'Upload'
});
/* Template to valid a correction */
Router.route(root_url+'/valid', {
    name: 'Valid',
    template: 'Valid'
});
/* Form to submit informations of the current user */
Router.route(root_url+'/form', {
    name: 'Form',
    template: 'Form'
});


/***************
 * Admin panel *
 ***************/
 
/* Login for Admin Panel */
Router.route(root_url+'/admin', {
    name: 'Login',
    template: 'Login',
    controller: 'LoginAdminController'
});

/* Homepage of Admin Panel */
Router.route(root_url+'/adminPanel', {
    name: 'Admin',
    template: 'Admin',
    controller: 'AdminController'
});

/* Homepage of Admin Mock Panel */
Router.route(root_url+'/adminMockPanel', {
    name: 'AdminMock',
    template: 'AdminMock',
    controller: 'AdminMockController'
});