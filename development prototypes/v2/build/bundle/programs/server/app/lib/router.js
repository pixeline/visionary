(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/******************************************\
|  Routing of the application's templates  |                           //
\******************************************/                           //
                                                                       //
//root_url of the current application                                  //
var root_url = Meteor.settings['public'].admin_panel.survey[0].root_url;
                                                                       //
/* Route configuration */                                              //
Router.configure({                                                     // 9
    layoutTemplate: 'MasterLayout',                                    // 10
    loadingTemplate: 'Loading',                                        // 11
    notFoundTemplate: 'NotFound'                                       // 12
});                                                                    //
                                                                       //
/*******************                                                   //
 * PROFILER SYSTEM *                                                   //
 *******************/                                                  //
                                                                       //
/* Homepage of the application */                                      //
Router.route(root_url, {                                               // 20
    name: 'Index',                                                     // 21
    template: 'Index',                                                 // 22
    controller: 'IndexController'                                      // 23
});                                                                    //
                                                                       //
/* Template to select a picture (between several types of correction) */
Router.route(root_url + '/select/:img', {                              // 27
    name: 'Select',                                                    // 28
    template: 'Select',                                                // 29
    controller: 'PictureController'                                    // 30
});                                                                    //
                                                                       //
/* Template to select a picture (between several types of correction) */
Router.route(root_url + '/select_ligne/:img', {                        // 34
    name: 'Select_ligne',                                              // 35
    template: 'Select_ligne',                                          // 36
    controller: 'PictureController'                                    // 37
});                                                                    //
                                                                       //
/* Template to adjust first color correction of a picture */           //
Router.route(root_url + '/adjust/:img', {                              // 41
    name: 'Adjust',                                                    // 42
    template: 'Adjust',                                                // 43
    controller: 'PictureController'                                    // 44
});                                                                    //
/* Template to choose best second correction adjustment of a picture */
Router.route(root_url + '/choose/:img', {                              // 47
    name: 'Choose',                                                    // 48
    template: 'Choose',                                                // 49
    controller: 'PictureController'                                    // 50
});                                                                    //
/* Template to valid a correction (illustration picture) */            //
Router.route(root_url + '/valid/:img', {                               // 53
    name: 'Valid',                                                     // 54
    template: 'Valid',                                                 // 55
    controller: 'PictureController'                                    // 56
});                                                                    //
/* Template to upload a picture and correct it */                      //
Router.route(root_url + '/upload/:img', {                              // 59
    name: 'Upload',                                                    // 60
    template: 'Upload',                                                // 61
    controller: 'PictureController'                                    // 62
});                                                                    //
/* Form to submit informations of the current user */                  //
Router.route(root_url + '/form', {                                     // 65
    name: 'Form',                                                      // 66
    template: 'Form',                                                  // 67
    controller: 'FormController'                                       // 68
});                                                                    //
/* Form to thank the user */                                           //
Router.route(root_url + '/thanks/:idUser', {                           // 71
    name: 'Thanks',                                                    // 72
    template: 'Thanks',                                                // 73
    controller: 'ThanksController'                                     // 74
});                                                                    //
                                                                       //
/***************                                                       //
 * Admin panel *                                                       //
 ***************/                                                      //
                                                                       //
/* Login for Admin Panel */                                            //
Router.route(root_url + '/admin', {                                    // 83
    name: 'Login',                                                     // 84
    template: 'Login',                                                 // 85
    controller: 'LoginAdminController'                                 // 86
});                                                                    //
                                                                       //
/* Homepage of Admin Configuration Panel */                            //
Router.route(root_url + '/configPanel', {                              // 90
    name: 'Config',                                                    // 91
    template: 'Config',                                                // 92
    controller: 'AdminController'                                      // 93
});                                                                    //
                                                                       //
/* Configuration panel for survey */                                   //
Router.route(root_url + '/configSurvey', {                             // 97
    name: 'ConfigSurvey',                                              // 98
    template: 'ConfigSurvey',                                          // 99
    controller: 'AdminController'                                      // 100
});                                                                    //
                                                                       //
/* Configuration panel for modules */                                  //
Router.route(root_url + '/configModules', {                            // 104
    name: 'ConfigModules',                                             // 105
    template: 'ConfigModules',                                         // 106
    controller: 'PictureAdminController'                               // 107
});                                                                    //
                                                                       //
/* Homepage of Admin Mock Panel */                                     //
Router.route(root_url + '/adminMockPanel', {                           // 111
    name: 'AdminMock',                                                 // 112
    template: 'AdminMock',                                             // 113
    controller: 'AdminMockController'                                  // 114
});                                                                    //
                                                                       //
/* Homepage of Dashboard Panel */                                      //
Router.route(root_url + '/dashboard', {                                // 118
    name: 'Dashboard',                                                 // 119
    template: 'Dashboard',                                             // 120
    controller: 'DashboardController'                                  // 121
});                                                                    //
                                                                       //
/* Dashboard for each user */                                          //
Router.route(root_url + '/dashboard/:idUser', {                        // 125
    name: 'DashboardUser',                                             // 126
    template: 'DashboardUser',                                         // 127
    controller: 'ProfileController'                                    // 128
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=router.js.map
