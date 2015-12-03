/*************************
 * Rendering of pictures *
 *************************/

/* Rendering pictures (global rendering for correction_tool) */
Template.Picture.onRendered (function () {
        buildFilters("render");
});

/* Events of template Picture (global event for correction_tool) */
Template.Picture.events({
        
        //adjust rendering (module Adjust)
        'click li.filtreMoins, click li.filtrePlus' : function (event) {
                event.preventDefault();
                var module = getCurrentModule("Adjust");
                var picOrder = parseInt(Router.current().params.img);
                var filter = getPreviousFilter(picOrder);
                var previous_filter_admin = getCurrentFilterByTitle(filter.parameter, getPreviousModule("Adjust"));       
                var filter_admin = getCurrentFilterByOrder(previous_filter_admin.order, module);
                
                var direction;
                //change value
                if(event.target.children[0].children[0].id == "-") {
                        direction = "left";
                        filter.value = filter.value - filter_admin.step;
                } else {    
                        direction = "right";
                        filter.value = filter.value + filter_admin.step;
                }
                
                if(filter.value >= filter_admin.min && filter.value <= filter_admin.max) {
                        //effect slide
                        $("img.visionarized").hide().show("slide", { direction: direction }, 600);
                        
                        //store the correction_profile with new filter
                        saveFilter(picOrder, filter_admin.order, module, filter.value);
                        
                        buildFilters("visionarized");
                } else {
                        sAlert.info("L'ajustement maximum est déjà atteint !");
                }
                
        }
        
});

/* Build filters to render pictures */
function buildFilters(imgClass) {
        //render each picture
        $($("img."+imgClass)).each(function(i, img ) {
                var module = getCurrentModule($(img).attr("template"));
                if(module.title == "Adjust" || module.title == "Choice" || ((module.title == "Select" || module.title == "Select_ligne") && img.id !== 0)) {
                        var filters = [];
                        var filter = {};
                        var filter_admin = {};
                        var picture = document.getElementById(img.id); 
                        
                        //construction of the combined filter depending on correction module
                        if (module.title == "Select" || module.title == "Select_ligne") {
                                filter_admin = getCurrentFilterByOrder(img.id, module);
                                filter.parameter = filter_admin.parameter;
                                filter.value = (filter_admin.init_value + filter_admin.step) * filter_admin.conversion;
                        } else if (module.title == "Adjust") {
                                //if just rendered or adjust
                                if(imgClass == "visionarized") {
                                        //replace content to render on the source picture
                                        var pic_admin = getCurrentPicture(parseInt(Router.current().params.img));
                                        var pictureInput = picture;
                                        pictureInput.className = "nothing";
                                        pictureInput.src = pictureUrl(pic_admin.file_name);
                                        var content = $(picture.parentNode);
                                        content.children()[0].remove();
                                        content.prepend(pictureInput);
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
                        } else if (module.title == "Choice") {
                                //first (previous) filter retrieved
                                filter = getPreviousFilter(parseInt(Router.current().params.img));
                                filter_admin = getCurrentFilterByTitle(previousFilter.parameter, getPreviousModule(module.title));
                                filter.value *= filter_admin.conversion;
                                filters.push(filter);
                                
                                //and add second filter with extreme value
                                if(img.id != 0) {
                                        var secondFilter = {};
                                        filter_admin = getCurrentFilterByOrder(filter_admin.order, module);
                                        secondFilter.parameter = filter_admin.parameter;
                                        secondFilter.value = (filter_admin.init_value + (parseInt(img.id) * filter_admin.step)) * filter_admin.conversion;
                                        filters.push(secondFilter);
                                }
                        }
                        
                        //combined filter
                        filters.push(filter);
                        
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
                filterInput[filter.parameter.split("_")[0]] = filter.value; //TODO
                if(filter.parameter.split("_").length > 1) {
                        filterInput.type = filter.parameter.split("_")[1];
                }
        });
        
        //render the picture with combined filter
        var canvas;
        Visionarize (pictureInput, {
                type:filterInput.type,
                amountVisionarize:filterInput.visionarize,
                amountIntensity:filterInput.intensity,
                amountHue:filterInput.hue,
                amountSaturation:filterInput.saturation,
                callback:function(result){
                        canvas = result; //correction result
                }
        });
        //replace picture by rendered picture
        pictureInput.src = canvas.toDataURL('image/svg');
        pictureInput.className = "visionarized";
        
}