
/* rendered of graphs from d3 js for one user TODO */
Template.DashboardUser.rendered = function () {
    
    var usr = user.findOne();
    var filters = usr.correcRes.fetch()[0].filter.fetch();
    
    var typeFilterResult = {};
    //init filter for stat
    typeFilterResult.undefined = {counter : 0, value:0, intensity:0};
    typeFilterResult.saturation = {counter : 0, value:0, intensity:0};
    typeFilterResult.visionarize_protanope = {counter : 0, value:0, intensity:0};
    typeFilterResult.visionarize_deuteranope = {counter : 0, value:0, intensity:0};
    typeFilterResult.visionarize_tritanope = {counter : 0, value:0, intensity:0};
    //give the value and intensity for the filter resulted
    if(filters[0].parameter == "saturation") {
        typeFilterResult[filters[0].parameter].value += filters[0].value;
    } else if (filters[0].parameter != "undefined") {
        typeFilterResult[filters[0].parameter].value += (filters[0].value + 100);
    }
    if(filters.length > 1) {
        typeFilterResult[filters[0].parameter].intensity = filters[1].value;
    }
    
    //give value for each user's pictures
    var tabFilterPicture = [];
    $.each(usr.correcPic.fetch(), function( index, correcPic ) {
        var filterPicture = {};
        filterPicture.picture = "image " + (index+1);
        switch(correcPic.filter_type) {
            case "saturation":
                filterPicture.color = "#56B5D4";
                break;
            case "visionarize_protanope":
                filterPicture.color = "#0000ff";
                break;
            case "visionarize_deuteranope":
                filterPicture.color = "#02FFF8";
                break;
            case "visionarize_tritanope":
                filterPicture.color = "#ff8000";
                break;
            default: break;
        }
        if(correcPic.filter_type != "undefined") {
            filterPicture.visionarize = correcPic.filter.fetch()[0].value;
            if(correcPic.filter_type != "saturation") {
                filterPicture.visionarize += 100;
            }
            if(correcPic.filter.fetch().length > 1) {
                filterPicture.intensity = correcPic.filter.fetch()[1].value;
            } else {
                filterPicture.intensity = 0;
            }
        } else {
            filterPicture.visionarize = 0;
            filterPicture.intensity = 0;
        }
        tabFilterPicture.push(filterPicture);
    });
    
    //a chart to see the resulted profile of the user
    AmCharts.makeChart("radarChartProfile",
        {
            "type": "radar",
            "categoryField": "filterProfile",
            "startDuration": 1,
            "fontSize": 13,
            "theme": "light",
            "graphs": [
                {
                    "balloonText": "Valeur de visionarization du filtre : [[value]]",
                    "bullet": "round",
                    "bulletSize": 9,
                    "id": "AmGraph-1",
                    "lineAlpha": 1,
                    "lineThickness": 2,
                    "valueField": "value"
                },
                {
                    "balloonText": "Intensité du filtre : [[value]]",
                    "bullet": "round",
                    "bulletSize": 9,
                    "id": "AmGraph-2",
                    "lineAlpha": 1,
                    "lineThickness": 1,
                    "valueField": "intensity"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "axisTitleOffset": 20,
                    "gridType": "circles",
                    "id": "ValueAxis-1",
                    "minimum": -50,
                    "axisAlpha": 0.54,
                    "dashLength": 3,
                    "gridAlpha": 0.51
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Profil de correction résultant"
                }
            ],
            "dataProvider": [
                {
                    "filterProfile": "Saturation",
                    "value": typeFilterResult.saturation.value,
                    "intensity": typeFilterResult.saturation.intensity
                },
                {
                    "filterProfile": "Deuteranope",
                    "value": typeFilterResult.visionarize_deuteranope.value,
                    "intensity": typeFilterResult.visionarize_deuteranope.intensity
                },
                {
                    "filterProfile": "Tritanope",
                    "value": typeFilterResult.visionarize_tritanope.value,
                    "intensity": typeFilterResult.visionarize_tritanope.intensity
                },
                {
                    "filterProfile": "Protanope",
                    "value": typeFilterResult.visionarize_protanope.value,
                    "intensity": typeFilterResult.visionarize_protanope.intensity
                }
            ]
        }
    );
    
    //a chart to see the correction for each picture
    AmCharts.makeChart("chartFilterPic",
        {
            "type": "serial",
            "theme" : "light",
            /*"angle": 30,
            "depth3D": 30,*/
            "categoryField": "picture",
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] de l'[[category]] : [[value]]",
			        "colorField": "color",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "labelText": "[[value]]",
                    "title": "Valeur de visionarization du filtre",
                    "type": "column",
                    "valueField": "visionarize"
                },
                {
                    "balloonText": "[[title]] de l'[[category]] : [[value]]",
                    "bullet": "round",
                    "id": "AmGraph-2",
                    "labelText": "[[value]]",
                    "lineThickness": 2,
                    "title": "Valeur d'intensité du filtre",
                    "valueField": "intensity"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Quantité de filtre"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": true,
                "useGraphSettings": true,
                "align": "left",
                "position": "bottom",
                "labelText": "[[title]]",
                "valueText": "[[value]]",
                "textClickEnabled": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Evolution des filtres choisis pour l'ensemble des images"
                }
            ],
            "dataProvider": tabFilterPicture
        }
    );
    
    $(".amcharts-main-div a").hide();
    
    //To have a tooltip when hover a picture that gives some informations
    $( document ).tooltip({
      track: true
    });
};

/* events of template */
Template.DashboardUser.events ({
    //show picture's information when hover the title of a picture in the graph
    'mouseover #chartFilterPic tspan': function(event){
        var indexPic = parseInt($(event.target).text().split("image ")[1]) - 1;
        var correcPic = user.findOne().correcPic.fetch()[indexPic];
        var pictureToDisplay = correcPic.picture.fetch()[0];
        $(event.target).attr( "title", "• Titre : " + pictureToDisplay.title + 
                                        "\n• Type : " + pictureToDisplay.type + 
                                        "\n• Fichier : " + pictureToDisplay.file_name + 
                                        "\n• Correction de type : " + correcPic.filter_type +
                                        "\n• Nombre de recorrection sur l'image : " + correcPic.reset_counter);
        event.preventDefault();
    }
});