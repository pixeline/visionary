/* events of template Select */
Template.Adjust.events({
        
        //go to next module
        'click #nextPage': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule("Adjust");
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.order);
                sessionStorage.setItem("lastPicture", picOrder);
                
                //redirection to next module with current picture
                var nextRoute = getNextModule("Adjust", false, false);
                Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
        }
        
});