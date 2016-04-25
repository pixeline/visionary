/* Using informations of the user in the template Thanks */
Template.Thanks.helpers({
    user: function() {
        return user.findOne();
    }
});  