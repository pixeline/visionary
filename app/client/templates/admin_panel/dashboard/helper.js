/* Using informations of the user in the template Thanks */
Template.Dashboard.helpers({
    'user': function() {
        return user.find({}, {sort: {date_created: -1} });
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    }
});