/* events of template Select */
Template.Select.events({
    'click a': function (event) {
        event.preventDefault();
         
        //store the current path
        var module = getCurrentModule("Select");
        var picOrder = parseInt(Router.current().params.img);
        sessionStorage.setItem("lastModule", module.order);
        sessionStorage.setItem("lastPicture", picOrder);
        
        var nextRoute;
        //image without filter => next picture with current module
        if(event.target.id == 0) {
                saveFilter(picOrder, event.target.id, module, 0);
                nextRoute = getNextModule("Select", false, true);
        } else {
                var filter_admin = getCurrentFilterByOrder(event.target.id, module);
                var val = filter_admin.init_value + filter_admin.step;
                //store the correction_profile with filter chosen
                saveFilter(picOrder, event.target.id, module, val);
                //redirection to next module with current picture
                nextRoute = getNextModule("Select", false, false); 
        }
        Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
    }
});

/* events of template Select_ligne */
Template.Select_ligne.events({
    'click a': function (event) {
        event.preventDefault();
        
        //store the current path
        var module = getCurrentModule("Select_ligne");
        var picOrder = parseInt(Router.current().params.img);
        sessionStorage.setItem("lastModule", module.order);
        sessionStorage.setItem("lastPicture", picOrder);
        
        var nextRoute;
        //image without filter => next picture with current module
        if(event.target.id == 0) {
                nextRoute = getNextModule("Select_ligne", false, true);
        } else {
                var filter_admin = getCurrentFilterByOrder(event.target.id, module);
                var val = filter_admin.init_value + filter_admin.step;
                //store the correction_profile with filter chosen
                saveFilter(picOrder, event.target.id, module, val);
                //redirection to next module with current picture
                nextRoute = getNextModule("Select_ligne", false, false); 
        }
        Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
    }
});