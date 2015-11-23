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
/* Homepage of the application */
Router.route(root_url+'/test4', {
    name: 'Test4',
    template: 'Test4'
});
/* Homepage of the application */
Router.route(root_url+'/test5', {
    name: 'Test5',
    template: 'Test5'
});
/* Homepage of the application */
Router.route(root_url+'/test6', {
    name: 'Test6',
    template: 'Test6'
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

/* Survey Panel */
Router.route(root_url+'/adminPanel/survey', {
    name: 'Survey',
    template: 'Survey',
    onBeforeAction : function() {
        var currentUser = Meteor.user();
        if(currentUser && currentUser.username === "admin"){
            this.next();
        } else {
            Router.go("Login");
        }
    },
    waitOn : function() {
        var currentUser = Meteor.user();
        return [ 
            Meteor.subscribe('survey', currentUser)
        ];
    }
});