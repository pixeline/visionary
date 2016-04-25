/* Route configuration */
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

/* Homepage of the application */
Router.route('/', {
    name: 'Home',
    template: 'Home',
    waitOn: function() {
      return [ 
          Meteor.subscribe('Picture'),
          Meteor.subscribe('QA')
      ];
    }
});

/* Routing to a interface of modification of the set of pictures */
Router.route('/pictures', {
    name: 'Pictures',
    template: 'Pictures'
});

/* Routing to a user profile defined by id*/
Router.route('/profile/:_id', {
    name: 'Profile',
    template: 'Profile',
  	waitOn: function() {
    	return [
      		Meteor.subscribe('User', this.params._id),
      		Meteor.subscribe('Correction_profile', this.params._id),
      		Meteor.subscribe('Adaptation_rule', this.params._id),
          Meteor.subscribe('Picture'),
          Meteor.subscribe('QA')
    	];
  	}
});

/* Routing to show each user profiles encoded */
Router.route('/profiles/stat', {
    name: 'Profiles',
    template: 'Profiles',
  	waitOn: function() {
    	return [
      		Meteor.subscribe('User'),
      		Meteor.subscribe('Correction_profile'),
      		Meteor.subscribe('Adaptation_rule'),
          Meteor.subscribe('Picture'),
          Meteor.subscribe('QA')
    	];
  	}
});

/* Simulation and correction of color blindness */
Router.route('/daltonize', {
    name: 'Daltonize',
    template: 'Daltonize',
    waitOn: function() {
      return [
          Meteor.subscribe('Picture'),
          Meteor.subscribe('images')
      ]; 
    }
});

Router.onBeforeAction('dataNotFound', {only: 'Profile'});