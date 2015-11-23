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
            Router.go("Admin");
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
    }
});