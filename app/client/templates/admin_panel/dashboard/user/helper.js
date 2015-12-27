/* Using informations of the user in the template Thanks */
Template.DashboardUser.helpers({
    user: function() {
        return user.findOne();
    },
    totalResetCounter : function () {
        var totalReset = 0;
        $.each(user.findOne().correcPic.fetch(), function( index, correcPic ) {
            totalReset += correcPic.reset_counter;
        });
        return totalReset;
    }
});