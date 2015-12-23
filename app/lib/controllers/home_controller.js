/* Controller to suscribe on data assiocate with the current route */

HomeController = RouteController.extend({
  
  subscriptions: function() {
  },
  
  waitOn: function () {
  },
  
  data: function () {
  },
  
  onRun: function () {
    this.next();
  },
  onRerun: function () {
    this.next();
  },
  onBeforeAction: function () {
    this.next();
  },
  action: function () {
    this.render();
  },
  onAfterAction: function () {
  },
  onStop: function () {
  }
});


/*****************************
 * Correction Tool Prototype *
 *****************************/
 
/*  
 *  Retrieve informations in local/session storage if previous exit/encoding url 
 *  Redirection to last route if not a valid url or not visited yet,
 *  return false if no need redirection 
 */
function redirect (sessionAndLocal) {
	var lastPicture = parseInt(sessionStorage.getItem("lastPicture"));
	var lastModule = sessionStorage.getItem("lastModule");
    //if there is something in session
    if(lastModule && sessionAndLocal) {
            var paramImg = parseInt(Router.current().params.img);
            var moduleEncoded = getCurrentModule(Router.current().route.getName());
            //if not a valid url
            if(moduleEncoded.title != "Form" && (isNaN(paramImg) || paramImg <= 0)){
                //redirect to last position
                Router.go(lastModule, {img: lastPicture});
            } else {
                Meteor.call('isAdmin', function (error, result) { 
                    if(result) {
                        return false;
                    } else { //if it's not an admin
                        var module = getCurrentModule(lastModule);
                        //pattern of accepted path
                        if( (module.title == "Index" && moduleEncoded.title == "Valid" && paramImg == 1) ||
                            (paramImg < parseInt(lastPicture)) || 
                            ((paramImg == parseInt(lastPicture) && moduleEncoded.order <= module.order + 1)) || 
                            ((paramImg == parseInt(lastPicture) + 1) && (moduleEncoded.title == "Valid" || moduleEncoded.title == "Upload") && (module.title == "Valid" || module.title == "Select" || module.title == "Choose")) ||
                            (isSatis() && ((moduleEncoded.title == "Valid") || (moduleEncoded.title == "Upload") || (moduleEncoded.title == "Form"))) ||
                            (moduleEncoded.title == "Form" && (module.title == "Upload" || module.title == "Valid" || module.title == "Select" || module.title == "Choose")) ) {
                            
                            return false;
                        } else {
                            //redirect to last position only if user want a page not visited yet or not accepted
                            Router.go(lastModule, {img: lastPicture});
                        }
                    }
                });
            }
    } else {
        //only in local
        if(!lastModule) {
            //else retrieve everything from localStorage
            var currentSurvey = JSON.parse(localStorage.getItem("currentSurvey"));
            var correction_profiles = JSON.parse(localStorage.getItem("correction_profiles"));
            var correction_profile_result = JSON.parse(localStorage.getItem("correction_profile_result"));
            lastModule = localStorage.getItem("lastModule");
            lastPicture = parseInt(localStorage.getItem("lastPicture"));
            
            //no local and no session storage
            if(!lastModule) {
                //redirect to index
                Router.go("Index");
            } else {
                //set in session
                sessionStorage.setItem("currentSurvey", JSON.stringify(currentSurvey));
                sessionStorage.setItem("correction_profiles", JSON.stringify(correction_profiles));
                sessionStorage.setItem("correction_profile_result", JSON.stringify(correction_profile_result));
                sessionStorage.setItem("lastModule", lastModule);
                sessionStorage.setItem("lastPicture", lastPicture);
                
                //remove data in local
                localStorage.clear();
                
                //redirect to last position
                Router.go(lastModule, {img: lastPicture});
            }
            
        } else {
            return false;
        }
    }
}

IndexController = HomeController.extend({
    /* redirection if need, or go on if no problem */
    onBeforeAction: function() {
        if(!redirect(false)) this.next();
    },
    data: function() {
        var data = IndexController.__super__.data.call(this);
        return data;
    },
    waitOn : function() { 
        var currentUser = Meteor.user();
        return [
            Meteor.subscribe('survey', currentUser),
            Meteor.subscribe('module_survey'),
            Meteor.subscribe('picture_admin'),
            Meteor.subscribe('instruction'),
            Meteor.subscribe('info_txt'),
            Meteor.subscribe('sorted_color_admin'),
            Meteor.subscribe('filter_admin'),
            Meteor.subscribe('field_form')
        ];
    }
});

/* every modules with pictures */
PictureController = HomeController.extend({
    onBeforeAction: function() {
        if(!redirect(true)) this.next();
    },
    data: function() {
        var data = PictureController.__super__.data.call(this);
        return data;
    },
    waitOn : function() {
        return [
            Meteor.subscribe('picture_upload')
        ];
    }
});

FormController =  HomeController.extend({
    onBeforeAction: function() {
        if(!redirect(true)) this.next();
    },
    data: function() {
        var data = PictureController.__super__.data.call(this);
        return data;
    },
    waitOn : function() {
        return [
            Meteor.subscribe('survey')
        ];
    }
});


ThanksController = HomeController.extend({
    waitOn: function() {
        var currentUser = Meteor.user();
        var userId = this.params.idUser;
        return [
            Meteor.subscribe('survey', currentUser),
            Meteor.subscribe('module_survey'),
            Meteor.subscribe('picture_admin'),
            Meteor.subscribe('instruction'),
            Meteor.subscribe('info_txt'),
            Meteor.subscribe('sorted_color_admin'),
            Meteor.subscribe('filter_admin'),
            Meteor.subscribe('field_form'),
            
      		Meteor.subscribe('user', currentUser, userId),
      		Meteor.subscribe('correction_profile_picture'),
            Meteor.subscribe('correction_profile_result'),
      		Meteor.subscribe('filter'),
            Meteor.subscribe('picture'),
            Meteor.subscribe('target')
        ];
    }
});

/***************
 * Admin panel *
 ***************/

LoginAdminController = HomeController.extend({
    onBeforeAction : function() {
        var currentUser = Meteor.user();
        if(currentUser && currentUser.username === "admin"){
            Router.go("AdminMock");
        } else {
            this.next();
        }   
    },
    waitOn : function() {
        return Meteor.subscribe("admin");
    }
});

AdminController = HomeController.extend({
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
            Meteor.subscribe('survey', currentUser),
            Meteor.subscribe('module_survey'),
            Meteor.subscribe('picture_admin'),
            Meteor.subscribe('instruction'),
            Meteor.subscribe('info_txt'),
            Meteor.subscribe('sorted_color_admin'),
            Meteor.subscribe('filter_admin'),
            Meteor.subscribe('field_form')
        ];
    }
});

AdminMockController = AdminController.extend({
    onBeforeAction: function() {
        var onBeforeAction = AdminMockController.__super__.onBeforeAction.call(this);
        return onBeforeAction;
    },
    waitOn: function() {
        var waitOn = AdminMockController.__super__.waitOn.call(this);
        return waitOn;
    }
});

DashboardController = AdminController.extend({
    onBeforeAction: function() {
        var onBeforeAction = DashboardController.__super__.onBeforeAction.call(this);
        return onBeforeAction;
    },
    waitOn: function() {
        var currentUser = Meteor.user();
        var waitOn = DashboardController.__super__.waitOn.call(this);
        return [
            waitOn,
      		Meteor.subscribe('user', currentUser),
      		Meteor.subscribe('correction_profile_picture'),
            Meteor.subscribe('correction_profile_result'),
      		Meteor.subscribe('filter'),
            Meteor.subscribe('picture'),
            Meteor.subscribe('target')
        ];
        
    }
});

ProfileController = AdminController.extend({
    onBeforeAction: function() {
        var onBeforeAction = ProfileController.__super__.onBeforeAction.call(this);
        return onBeforeAction;
    },
    waitOn: function() {
        var currentUser = Meteor.user();
        var userId = this.params.idUser;
        var waitOn = ProfileController.__super__.waitOn.call(this);
        return [
            waitOn,
      		Meteor.subscribe('user', currentUser, userId),
      		Meteor.subscribe('correction_profile_picture'),
            Meteor.subscribe('correction_profile_result'),
      		Meteor.subscribe('filter'),
            Meteor.subscribe('picture'),
            Meteor.subscribe('target')
        ];
    }
});