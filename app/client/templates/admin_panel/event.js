Template.Sidebar.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});