/* events of template Valid */
Template.Valid.events({
        //redirect to the next module
        'click #nextPage': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule("Valid");
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.order);
                sessionStorage.setItem("lastPicture", picOrder);
                
                //TODO
                saveFilter(picOrder, 0, getCurrentModule("Select"), 0);
                
                //route to next page
                var nextRoute = getNextModule("Valid", false, false);
                Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
        },
        //redirect to the beginning of correction for current picture
        'click #resetPic': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule("Valid");
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.order);
                sessionStorage.setItem("lastPicture", picOrder);
                
                //update reset_counter for this picture
                updateResetCounter(picOrder);
                
                //route to first page of correction for this picture
                var nextRoute = getNextModule("Valid", true, false);
                Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
        }
});