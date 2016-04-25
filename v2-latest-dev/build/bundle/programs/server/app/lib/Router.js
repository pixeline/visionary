(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/Router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/* Route configuration */                                              //
Router.configure({                                                     // 2
  layoutTemplate: 'MasterLayout',                                      // 3
  loadingTemplate: 'Loading',                                          // 4
  notFoundTemplate: 'NotFound'                                         // 5
});                                                                    //
                                                                       //
/* Homepage of the application */                                      //
Router.route('/', {                                                    // 9
  name: 'Home',                                                        // 10
  template: 'Home'                                                     // 11
});                                                                    //
                                                                       //
/* Routing to a user profile defined by id*/                           //
Router.route('/profile/:_id', {                                        // 15
  name: 'Profile',                                                     // 16
  template: 'Profile',                                                 // 17
  waitOn: function () {                                                // 18
    return [Meteor.subscribe('User', this.params._id), Meteor.subscribe('Correction_profile', this.params._id), Meteor.subscribe('Adaptation_rule', this.params._id)];
  }                                                                    //
});                                                                    //
                                                                       //
/* Routing to show each user profiles encoded */                       //
Router.route('/profiles/stat', {                                       // 28
  name: 'Profiles',                                                    // 29
  template: 'Profiles',                                                // 30
  waitOn: function () {                                                // 31
    return [Meteor.subscribe('User'), Meteor.subscribe('Correction_profile'), Meteor.subscribe('Adaptation_rule')];
  }                                                                    //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=Router.js.map
