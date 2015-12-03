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
Router.route(root_url+'/select/:img', {
    name: 'Select',
    template: 'Select',
    controller: 'PictureController'
});

/* Template to select a picture (between several types of correction) */
Router.route(root_url+'/select_ligne/:img', {
    name: 'Select_ligne',
    template: 'Select_ligne',
    controller: 'PictureController'
});

/* Template to adjust first color correction of a picture */
Router.route(root_url+'/adjust/:img', {
    name: 'Adjust',
    template: 'Adjust',
    controller: 'PictureController'
});
/* Template to choose best second correction adjustment of a picture */
Router.route(root_url+'/choice/:img', {
    name: 'Choice',
    template: 'Choice',
    controller: 'PictureController'
});
/* Template to valid a correction (illustration picture) */
Router.route(root_url+'/valid/:img', {
    name: 'Valid',
    template: 'Valid',
    controller: 'PictureController'
});
/* Template to upload a picture and correct it */
Router.route(root_url+'/upload/:img', {
    name: 'Upload',
    template: 'Upload',
    controller: 'PictureController'
});
/* Form to submit informations of the current user */
Router.route(root_url+'/form', {
    name: 'Form',
    template: 'Form',
    controller: 'FormController'
});
/* Form to thank the user */
Router.route(root_url+'/thanks', {
    name: 'Thanks',
    template: 'Thanks',
    controller: 'VerifController'
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