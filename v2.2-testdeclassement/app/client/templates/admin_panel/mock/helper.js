/* helper of the mock admin panel (fake data) */
Template.AdminMock.helpers ({
    'survey': function(){
        return survey.find();
    },
    'isNotEmpty': function (object) {
        return (object.fetch().length != 0);
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    }
});