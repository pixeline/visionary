Template.AdminMock.helpers ({
    'survey': function(){
        return survey.find();
    },
    'isNotEmpty': function (object) {
        return (object.fetch().length != 0);
    }
});