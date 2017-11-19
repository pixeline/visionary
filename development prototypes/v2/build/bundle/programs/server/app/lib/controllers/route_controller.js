(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/controllers/route_controller.js                                 //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
/*******************************************************************\
|  Controller to suscribe on data assiocate with the current route  |  //
\*******************************************************************/  //
                                                                       //
HomeController = RouteController.extend({                              // 6
    subscriptions: function () {},                                     // 7
    waitOn: function () {},                                            // 9
    data: function () {},                                              // 11
                                                                       //
    onRun: function () {                                               // 14
        this.next();                                                   // 15
    },                                                                 //
    onRerun: function () {                                             // 17
        this.next();                                                   // 18
    },                                                                 //
    onBeforeAction: function () {                                      // 20
        this.next();                                                   // 21
    },                                                                 //
    action: function () {                                              // 23
        this.render();                                                 // 24
    },                                                                 //
    onAfterAction: function () {},                                     // 26
    onStop: function () {}                                             // 28
});                                                                    //
                                                                       //
/*******************                                                   //
 * PROFILER SYSTEM *                                                   //
 *******************/                                                  //
                                                                       //
/*                                                                     //
 *  Retrieve informations in local/session storage if previous exit/encoding url 
 *  Redirection to last route if not a valid url or not visited yet,   //
 *  return false if no need redirection                                //
 */                                                                    //
function redirect(sessionAndLocal) {                                   // 42
    var lastPicture = parseInt(sessionStorage.getItem("lastPicture"));
    var lastModule = sessionStorage.getItem("lastModule");             // 44
    //if there is something in session                                 //
    if (lastModule && sessionAndLocal) {                               // 46
        var paramImg = parseInt(Router.current().params.img);          // 47
        var moduleEncoded = getCurrentModule(Router.current().route.getName());
        //if not a valid url                                           //
        if (moduleEncoded.title != "Form" && (isNaN(paramImg) || paramImg <= 0)) {
            //redirect to last position                                //
            Router.go(lastModule, { img: lastPicture });               // 52
        } else {                                                       //
            Meteor.call('isAdmin', function (error, result) {          // 54
                if (result) {                                          // 55
                    return false;                                      // 56
                } else {                                               //
                    //if it's not an admin                             //
                    var module = getCurrentModule(lastModule);         // 58
                    //pattern of accepted path                         //
                    if (module.title == "Index" && moduleEncoded.title == "Valid" && paramImg == 1 || paramImg < parseInt(lastPicture) || paramImg == parseInt(lastPicture) && moduleEncoded.order <= module.order + 1 || paramImg == parseInt(lastPicture) + 1 && (moduleEncoded.title == "Valid" || moduleEncoded.title == "Upload") && (module.title == "Valid" || module.title == "Select" || module.title == "Choose") || isSatis() && (moduleEncoded.title == "Valid" || moduleEncoded.title == "Upload" || moduleEncoded.title == "Form") || moduleEncoded.title == "Form" && (module.title == "Upload" || module.title == "Valid" || module.title == "Select" || module.title == "Choose")) {
                                                                       //
                        return false;                                  // 67
                    } else {                                           //
                        //redirect to last position only if user want a page not visited yet or not accepted
                        Router.go(lastModule, { img: lastPicture });   // 70
                    }                                                  //
                }                                                      //
            });                                                        //
        }                                                              //
    } else {                                                           //
        //only in local                                                //
        if (!lastModule) {                                             // 77
            //else retrieve everything from localStorage               //
            var currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
            var correction_profiles = JSON.parse(localStorage.getItem("correction_profiles"));
            var correction_profile_result = JSON.parse(localStorage.getItem("correction_profile_result"));
            lastModule = localStorage.getItem("lastModule");           // 82
            lastPicture = parseInt(localStorage.getItem("lastPicture"));
                                                                       //
            //no local and no session storage                          //
            if (!lastModule) {                                         // 86
                //redirect to index                                    //
                Router.go("Index");                                    // 88
            } else {                                                   //
                //set in session                                       //
                sessionStorage.setItem("currentSurvey", JSON.stringify(currentSurvey));
                sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
                sessionStorage.setItem("correction_profile_result", JSON.stringify(correction_profile_result));
                sessionStorage.setItem("lastModule", lastModule);      // 94
                sessionStorage.setItem("lastPicture", lastPicture);    // 95
                                                                       //
                //remove data in local                                 //
                localStorage.clear();                                  // 98
                                                                       //
                //redirect to last position                            //
                Router.go(lastModule, { img: lastPicture });           // 101
            }                                                          //
        } else {                                                       //
            return false;                                              // 105
        }                                                              //
    }                                                                  //
}                                                                      //
                                                                       //
IndexController = HomeController.extend({                              // 110
    /* redirection if need, or go on if no problem */                  //
    onBeforeAction: function () {                                      // 112
        if (!redirect(false)) this.next();                             // 113
    },                                                                 //
    data: function () {                                                // 115
        var data = IndexController.__super__.data.call(this);          // 116
        return data;                                                   // 117
    },                                                                 //
    waitOn: function () {                                              // 119
        var currentUser = Meteor.user();                               // 120
        return [Meteor.subscribe('survey', currentUser), Meteor.subscribe('module_survey'), Meteor.subscribe('picture_admin'), Meteor.subscribe('instruction'), Meteor.subscribe('info_txt'), Meteor.subscribe('sorted_color_admin'), Meteor.subscribe('filter_admin'), Meteor.subscribe('field_form')];
    }                                                                  //
});                                                                    //
                                                                       //
/* every modules with pictures */                                      //
PictureController = HomeController.extend({                            // 135
    onBeforeAction: function () {                                      // 136
        if (!redirect(true)) this.next();                              // 137
    },                                                                 //
    data: function () {                                                // 139
        var data = PictureController.__super__.data.call(this);        // 140
        return data;                                                   // 141
    },                                                                 //
    waitOn: function () {                                              // 143
        return [Meteor.subscribe('picture_upload')];                   // 144
    }                                                                  //
});                                                                    //
                                                                       //
FormController = HomeController.extend({                               // 150
    onBeforeAction: function () {                                      // 151
        if (!redirect(true)) this.next();                              // 152
    },                                                                 //
    data: function () {                                                // 154
        var data = PictureController.__super__.data.call(this);        // 155
        return data;                                                   // 156
    },                                                                 //
    waitOn: function () {                                              // 158
        var currentUser = Meteor.user();                               // 159
        return [Meteor.subscribe('survey'), Meteor.subscribe('user', currentUser, false, true)];
    }                                                                  //
});                                                                    //
                                                                       //
ThanksController = HomeController.extend({                             // 168
    waitOn: function () {                                              // 169
        var currentUser = Meteor.user();                               // 170
        var userId = this.params.idUser;                               // 171
        return [Meteor.subscribe('survey', currentUser), Meteor.subscribe('module_survey'), Meteor.subscribe('picture_admin'), Meteor.subscribe('instruction'), Meteor.subscribe('info_txt'), Meteor.subscribe('sorted_color_admin'), Meteor.subscribe('filter_admin'), Meteor.subscribe('field_form'), Meteor.subscribe('user', currentUser, userId), Meteor.subscribe('correction_profile_picture'), Meteor.subscribe('correction_profile_result'), Meteor.subscribe('filter'), Meteor.subscribe('picture'), Meteor.subscribe('target')];
    }                                                                  //
});                                                                    //
                                                                       //
/***************                                                       //
 * Admin panel *                                                       //
 ***************/                                                      //
                                                                       //
LoginAdminController = HomeController.extend({                         // 196
    onBeforeAction: function () {                                      // 197
        var currentUser = Meteor.user();                               // 198
        if (currentUser && currentUser.username === "admin") {         // 199
            Router.go("Dashboard");                                    // 200
        } else {                                                       //
            this.next();                                               // 202
        }                                                              //
    },                                                                 //
    waitOn: function () {                                              // 205
        return Meteor.subscribe("admin");                              // 206
    }                                                                  //
});                                                                    //
                                                                       //
AdminController = HomeController.extend({                              // 210
    onBeforeAction: function () {                                      // 211
        var currentUser = Meteor.user();                               // 212
        if (currentUser && currentUser.username === "admin") {         // 213
            this.next();                                               // 214
        } else {                                                       //
            Router.go("Login");                                        // 216
        }                                                              //
    },                                                                 //
    waitOn: function () {                                              // 219
        var currentUser = Meteor.user();                               // 220
        return [Meteor.subscribe('survey', currentUser), Meteor.subscribe('module_survey'), Meteor.subscribe('picture_admin'), Meteor.subscribe('instruction'), Meteor.subscribe('info_txt'), Meteor.subscribe('sorted_color_admin'), Meteor.subscribe('filter_admin'), Meteor.subscribe('field_form')];
    }                                                                  //
});                                                                    //
                                                                       //
/* every modules in admin panel with pictures */                       //
PictureAdminController = AdminController.extend({                      // 235
    data: function () {                                                // 236
        var data = PictureAdminController.__super__.data.call(this);   // 237
        return data;                                                   // 238
    },                                                                 //
    waitOn: function () {                                              // 240
        var waitOn = AdminMockController.__super__.waitOn.call(this);  // 241
        return [waitOn, Meteor.subscribe('picture_upload')];           // 242
    }                                                                  //
});                                                                    //
                                                                       //
AdminMockController = AdminController.extend({                         // 249
    onBeforeAction: function () {                                      // 250
        var onBeforeAction = AdminMockController.__super__.onBeforeAction.call(this);
        return onBeforeAction;                                         // 252
    },                                                                 //
    waitOn: function () {                                              // 254
        var waitOn = AdminMockController.__super__.waitOn.call(this);  // 255
        return waitOn;                                                 // 256
    }                                                                  //
});                                                                    //
                                                                       //
DashboardController = AdminController.extend({                         // 260
    onBeforeAction: function () {                                      // 261
        var onBeforeAction = DashboardController.__super__.onBeforeAction.call(this);
        return onBeforeAction;                                         // 263
    },                                                                 //
    waitOn: function () {                                              // 265
        var currentUser = Meteor.user();                               // 266
        var waitOn = DashboardController.__super__.waitOn.call(this);  // 267
        return [waitOn, Meteor.subscribe('user', currentUser), Meteor.subscribe('correction_profile_picture'), Meteor.subscribe('correction_profile_result'), Meteor.subscribe('filter'), Meteor.subscribe('picture'), Meteor.subscribe('target')];
    }                                                                  //
});                                                                    //
                                                                       //
ProfileController = AdminController.extend({                           // 281
    onBeforeAction: function () {                                      // 282
        var onBeforeAction = ProfileController.__super__.onBeforeAction.call(this);
        return onBeforeAction;                                         // 284
    },                                                                 //
    waitOn: function () {                                              // 286
        var currentUser = Meteor.user();                               // 287
        var userId = this.params.idUser;                               // 288
        var waitOn = ProfileController.__super__.waitOn.call(this);    // 289
        return [waitOn, Meteor.subscribe('user', currentUser, userId), Meteor.subscribe('correction_profile_picture'), Meteor.subscribe('correction_profile_result'), Meteor.subscribe('filter'), Meteor.subscribe('picture'), Meteor.subscribe('target')];
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=route_controller.js.map
