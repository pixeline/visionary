/*************************
 * Rendering of pictures *
 *************************/

/* Rendering pictures (global rendering for correction_tool) */
Template.Picture.onRendered (function () {
        buildFilters("render");
        $("div.zoomContainer").remove();
        $.removeData($('img'), 'elevateZoom');//remove zoom instance from image    
});

/* Zoom and select picture */
Template.Picture.events ({
       'mouseover img.render, mouseover img.visionarized' : function(event) {
                var picture_admin = getCurrentPicture(parseInt(Router.current().params.img));
                if($(event.target).attr('template') == "Select" || (event.target.id == 1 && ($(event.target).attr('template') == "Adjust"))) {                      
                        $.removeData($('img'), 'data-zoom-image');//remove zoom instance from image
                        $("div.zoomContainer").remove();
                        //zoom on current picture
                        if(picture_admin.type != "Ishihara") {
                                $(event.target).data('zoom-image', event.target.src).elevateZoom({
                                        cursor: 'pointer',
                                        lensShape : "round", 
                                        lensSize : 160,
                                        scrollZoom : true,
                                        zoomType : "lens" //inner, lens or window
                                }); 
                        } 
                }
        }
});

//to hide the step - or + if min or max reached
var minReach, maxReach;

/* Events of template Picture (global event for correction_tool) */
Template.Adjust.events({
        //adjust rendering (module Adjust)
        'click li.filtreMoins, click li.filtrePlus' : function (event) {
                event.preventDefault();
                var operation = event.target.children[0].children[0].id;
                var module = getCurrentModule("Adjust");
                var picOrder = parseInt(Router.current().params.img);
                var filter = getPreviousFilter(picOrder);
                var previous_filter_admin = getCurrentFilterByTitle(filter.parameter, getPreviousModule("Adjust"));       
                var filter_admin = getCurrentFilterByOrder(previous_filter_admin.order, module);
                
                //change value
                if((filter.value > filter_admin.min && operation == "-") || (filter.value < filter_admin.max && operation == "+")) {                      
                        $('li').css({
                            "visibility":"visible"
                        });
                        minReach = maxReach = false;
                        if(operation == "-") {
                                filter.value = filter.value - filter_admin.step;
                        } else {    
                                filter.value = filter.value + filter_admin.step;
                        }
                        //disable if min or max reached
                        if(filter.value <= filter_admin.min) {
                                /*$(event.target).css({
                                    "visibility":"hidden"
                                });*/
                                filter.value = filter_admin.min;
                                minReach = true;
                        } else if (filter.value >= filter_admin.max) {
                                /*$(event.target).css({
                                    "visibility":"hidden"
                                });*/
                                filter.value = filter_admin.max;
                                maxReach = true;
                        }
                        //store the correction_profile with new filter
                        saveFilter(picOrder, filter_admin.order, module, filter.value);
                        buildFilters("visionarized");
                } else if(operation == "-") {
                        sAlert.info("L'ajustement minimum est déjà atteint !");
                } else {
                        sAlert.info("L'ajustement maximum est déjà atteint !");
                }
        }
});

//add a spinner during waiting time to load picture for adjust template
var spinner;

/* Build filters to render pictures */
function buildFilters(imgClass) {
        //bug fixes for problem of displaying pictures when user encode bad url (<=0 or isNaN); normaly fix at routing but random bug ...
        if(document.getElementsByClassName(imgClass)[0].src === "" || (document.getElementsByClassName(imgClass)[0].src.indexOf("undefined") > -1)) {
                Router.go("Index");
        }
        //render each picture
        $($("img."+imgClass)).each(function(i, img ) {
                var module = getCurrentModule($(img).attr("template"));
                if(module.title == "Valid" || module.title == "Adjust" || module.title == "Choose" || ((module.title == "Select" || module.title == "Select_ligne") && img.id != 0)) {
                        var filters = [];
                        var filter = {};
                        var filter_admin = {};
                        var picture = document.getElementById(img.id); 
                        
                        //construction of the combined filter depending on correction module
                        switch(module.title) {
                                case "Select" || "Select_ligne"  :
                                        filter_admin = getCurrentFilterByOrder(img.id, module);
                                        filter.parameter = filter_admin.parameter;
                                        filter.value = (filter_admin.init_value + filter_admin.step) * filter_admin.conversion;
                                        //combined filter
                                        filters.push(filter);
                                        break;
                                case "Adjust" :
                                        //if just rendered or adjust
                                        if(imgClass == "visionarized") {
                                                //replace content to render on the source picture
                                                var pic_admin = getCurrentPicture(parseInt(Router.current().params.img));
                                                picture.className = "nothing";
                                                var speed = 1000;
                                                //add a waiting icon
                                                if(picture.id == "1") {
                                                        speed = 1000;
                                                        var opts = {
                                                                top: '150px',
                                                                position : 'relative'
                                                        };
                                                        spinner = new Spinner(opts).spin();
                                                        $(picture.parentNode).prepend(spinner.el);
                                                }
                                                //fade out the picture during his loading
                                                if(pic_admin.type == "Ishihara") {
                                                        $(picture).fadeOut(speed);
                                                        picture.src = pictureUrl(pic_admin.file_name);
                                                } else {
                                                        $(picture).fadeOut(speed, function() {
                                                                picture.src = pictureUrl(pic_admin.file_name);
                                                        }); 
                                                }
                                        }
                                        filter = getPreviousFilter(parseInt(Router.current().params.img));
                                        filter_admin = getCurrentFilterByTitle(filter.parameter, module);
                                        if (img.id == "-") {
                                                filter.value = (filter.value - filter_admin.step) * filter_admin.conversion; 
                                        } else if (img.id == "+") {
                                                filter.value = (filter.value + filter_admin.step) * filter_admin.conversion;  
                                        } else {
                                                filter.value = filter.value * filter_admin.conversion;
                                        }
                                        //combined filter
                                        filters.push(filter);
                                        break;
                                case "Choose" :
                                        //first (previous) filter retrieved
                                        filter = getPreviousFilter(parseInt(Router.current().params.img));
                                        filter_admin = getCurrentFilterByTitle(previousFilter.parameter, getPreviousModule(module.title));
                                        filter.value *= filter_admin.conversion;
                                        //combined filter
                                        filters.push(filter);
                                        
                                        //and add second filter with extreme value
                                        if(img.id != 0) {
                                                var secondFilter = {};
                                                filter_admin = getCurrentFilterByOrder(filter_admin.order, module);
                                                secondFilter.parameter = filter_admin.parameter;
                                                secondFilter.value = (filter_admin.init_value + (parseInt(img.id) * filter_admin.step)) * filter_admin.conversion;                                        
                                                //combined filter
                                                filters.push(secondFilter);
                                        }
                                        break;
                                case "Valid" :
                                        var filtersRes = getResultProfile();
                                        //if there is already a resulted profile
                                        if(filtersRes && filtersRes[0].type != "undefined") {
                                            //add filter to render with previous configuration
                                            $(filtersRes[0].filter).each(function( i, input ) {
                                                    filter_admin = getCurrentFilterByTitle(input.parameter, module);
                                                    input.value = input.value * filter_admin.conversion;
                                                    filters.push(input);
                                            });
                                        }
                                        break;
                                default : break;
                        }
                        
                        //render on first load of the picture
                        picture.onload=function(){
                                if(picture.className != "visionarized") {
                                        render(picture, filters);  
                                }
                        };  
                }
        });
}


/*  
 * Render the pictureInput with a filter (combined with filters)
 * which could correct color blindness
 */
function render (pictureInput, filters) {
        var filterInput = {};
        
        filterInput.type = "Normal";
        filterInput.visionarize = -1;
        filterInput.intensity = 0;
        filterInput.hue = 0;
        filterInput.saturation = 0;
                
        //affect a general filter
        $(filters).each(function (i, filter) {
                filterInput[filter.parameter.split("_")[0]] = filter.value;
                if(filter.parameter.split("_").length > 1) {
                        filterInput.type = filter.parameter.split("_")[1];
                }
        });
        
        //retrieve original picture
        var picture = getCurrentPicture(parseInt(Router.current().params.img));
        var pic;
        if(picture.type == "Ishihara") { //some bug with ishihara, than just render input (not good resolution)
                pic = pictureInput;
        } else {
                pic = document.createElement("img");
                pic.src = pictureUrl(picture.file_name);
        }
        
        //render the picture with combined filter
        var canvas;
        Visionarize (pic, {
                type:filterInput.type,
                amountVisionarize:filterInput.visionarize,
                amountIntensity:filterInput.intensity,
                amountHue:filterInput.hue,
                amountSaturation:filterInput.saturation,
                callback:function(result){
                        //replace picture by rendered picture
                        pictureInput.src = result.toDataURL('image/svg');
                        pictureInput.className = "visionarized";
                        if(typeof spinner != "undefined") {
                                $("div.zoomContainer").remove();
                                spinner.stop();
                        }
                        //if(!(pictureInput.id == "-" && minReach) && !(pictureInput.id == "+" && maxReach)) {
                                $(pictureInput).fadeIn(10);
                        //}
                }
        });
}