Template.Sidebar.events({
    //logout of the admin panel
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});