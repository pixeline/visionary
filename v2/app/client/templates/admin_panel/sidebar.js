
  /**************************\
  |  Admin panel's Side bar  |
  \**************************/

Template.Sidebar.events({
    //logout of the admin panel
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.Sidebar.helpers({
    //return true if template is the current template
    isActive : function(currentTemplate, sideBarTemplate){
        if(currentTemplate == sideBarTemplate) {
            return "active open";
        }
    }
});