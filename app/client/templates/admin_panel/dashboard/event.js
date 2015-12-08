
/* Events of main dashboard */
Template.Dashboard.events ({
    //remove survey
    'click #userTab tr': function(event){
        event.preventDefault();
        var idUser = $(event.target.parentNode).attr('id');
        Router.go("DashboardUser", {idUser: idUser});
    }
});