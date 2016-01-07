/* helper of the hompage configuration panel */
Template.Config.helpers ({
    'survey': function(){
        return survey.find();
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    }
});