/* Using informations of the users */
Template.Dashboard.helpers({
    'user': function() {
        return user.find({}, {sort: {date_created: -1} });
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    }
});