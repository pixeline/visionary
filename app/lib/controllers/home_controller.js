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

IndexController = HomeController.extend({
    data: function() {
        var data = IndexController.__super__.data.call(this);
        return data;
    }
});

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
})