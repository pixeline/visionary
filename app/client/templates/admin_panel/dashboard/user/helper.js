/* Using informations of the user in the template Thanks */
Template.DashboardUser.helpers({
    user: function() {
        return user.findOne();
    }
});