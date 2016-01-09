/* helper of the homepage configuration panel */
Template.Config.helpers ({
    'survey': function(){
        return survey.find();
    },
    'formateDate': function (number) {
        return new Date(number).toLocaleString();
    }
});

/* helper for each input in configuration panel */
Template.InputAdmin.helpers ({
    //to have a particular id for each input field
    'getId': function(id1, id2, id3){
        if (id3) {
            return id1+id2+id3;
        } else if (id2) {
            return id1+id2;
        } else {
            return id1;
        }
    }
});

/* helper for each area text in configuration panel */
Template.TextAreaAdmin.helpers ({
    //to have a particular id for each areatext field
    'getId': function(id1, id2){
        if(id2) {
            return id1+id2;
        } else {
            return id1;
        }
    }
});