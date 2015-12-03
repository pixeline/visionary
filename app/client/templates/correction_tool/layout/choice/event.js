/* Rendering pictures */
Template.Choice.onRendered (function () {
        idChoice = 0;
        //hide the check
        $('a .check').css({ 
            "display": "none",
            "width":"10%",
            "height":"10%",
            "top":"20%",
            "position":"absolute"
        });
        //display check for original picture by default
        $("#0").next().css ({
                "display": "block",
                "left":"55%"
        });
});

//choice of rendered picture
var idChoice;

/* events of template Choice */
Template.Choice.events({
	//select a picture
        'click img': function (event) {
                //register the id of the selected one
                idChoice = event.target.id;
		if(event.target.id != '') {
			//disable css of each picture
			$('a .check').css({ 
				"display": "none"
			});
			//display a check
			$(event.target).next().css ({
				"display": "block",
                                "left":"" + (55 + parseInt(event.target.id)*30) +"%"
			});
		}
        },
        //redirect to the beginning of correction for next picture (or next module if no more)
        'click #nextPage': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule("Choice");
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.order);
                sessionStorage.setItem("lastPicture", picOrder);
                
                if(idChoice != 0) {
                        var previousFilter = getPreviousFilter(parseInt(Router.current().params.img));
                        var previous_filter_admin = getCurrentFilterByTitle(previousFilter.parameter, getPreviousModule("Choice"));                       
                        var filter_admin = getCurrentFilterByOrder(previous_filter_admin.order, module);
                        var val = filter_admin.init_value + (parseInt(idChoice) * filter_admin.step);
                        //store the correction_profile with filter chosen
                        saveFilter(picOrder, filter_admin.order, module, val);
                }
                        
                //route to next page
                var nextRoute = getNextModule("Choice", false, false);
                Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
        },
        //redirect to the beginning of correction for current picture
        'click #resetPic': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule("Choice");
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.order);
                sessionStorage.setItem("lastPicture", picOrder);
                
                //update reset_counter for this picture
                updateResetCounter(picOrder);
                
                //route to first page of correction for this picture
                var nextRoute = getNextModule("Choice", true, false);
                Router.go(nextRoute.mod.title, {img: nextRoute.pic.order});
        }
});