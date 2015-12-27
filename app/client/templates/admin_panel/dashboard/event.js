
/* Events of main dashboard */
Template.Dashboard.events ({
    //go to dashboard for the user selected
    'click #userTab tr': function(event){
        event.preventDefault();
        var idUser = $(event.target.parentNode).attr('id');
        Router.go("DashboardUser", {idUser: idUser});
    }
});

/* rendered of graphs from d3 js TODO */
Template.Dashboard.rendered = function () {
    
    /* Real-time
	Deps.autorun(function(){
	});*/
    
    //counter for user per sex
    var nbrUserMale = user.find({sex: true}).count();
    var nbrUserFemale = user.find({sex: false}).count();
    
    var users = user.find({}).fetch();
    //counter and value for users per filter
    var typeFilterResult = {};
    //init filter for stat
    typeFilterResult.undefined = {counter : 0, value:0, intensity:0};
    typeFilterResult.saturation = {counter : 0, value:0, intensity:0};
    typeFilterResult.visionarize_protanope = {counter : 0, value:0, intensity:0};
    typeFilterResult.visionarize_deuteranope = {counter : 0, value:0, intensity:0};
    typeFilterResult.visionarize_tritanope = {counter : 0, value:0, intensity:0};
    //increment the filter result for the current user and add value for this filter
    $.each(users, function( index, user ) {
        var filters = user.correcRes.fetch()[0].filter.fetch();
        typeFilterResult[filters[0].parameter].counter ++;
        if(filters[0].parameter == "saturation") {
            typeFilterResult[filters[0].parameter].value += filters[0].value;
        } else if (filters[0].parameter != "undefined") {
            typeFilterResult[filters[0].parameter].value += (filters[0].value + 100);
        }
        if(filters.length > 1) {
            typeFilterResult[filters[0].parameter].intensity += filters[1].value;
        } else {
            typeFilterResult[filters[0].parameter].intensity += 0;
        }
    });
    //give the average amount for each filter result for every users
    for (var parameter in typeFilterResult) {
        if(typeFilterResult[parameter].counter !== 0) {
            typeFilterResult[parameter].value /= typeFilterResult[parameter].counter;
            typeFilterResult[parameter].intensity /= typeFilterResult[parameter].counter;
        }
    }
    
    //a chart to see the proportion of person who is male or female
    AmCharts.makeChart("pieChartSex",
        {
            "type": "pie",
            "balloonText": "[[title]]<br><span style='font-size:10px'><b>[[value]]</b> ([[percents]]%)</span>",
            "startRadius": "200%",
            "autoMarginOffset": 0,
            "angle": 30,
            "depth3D": 30,
            "marginRight": 0,
            "marginTop": -40,
            "marginLeft": 0,
            "marginBot": -50,
            "pullOutDuration": 1,
            "pullOutEffect": "easeOutSine",
            "startEffect": "easeOutSine",
            "titleField": "Genre",
            "valueField": "numberPers",
            "fontSize": 8,
            "theme": "light",
            "allLabels": [],
            "balloon": {
                "animationDuration": 0,
                "fadeOutDuration": 0
            },
            "legend": {
                "align": "center",
                "position": "bottom",
                "markerType": "circle",
                "labelText": "[[title]]",
                "valueText": "[[value]]",
                "textClickEnabled": true
            },
            "titles": [
                {
                    "text": "Proportion d'hommes et de femmes",
                    "size": 15
                }
            ],
            "dataProvider": [
                {
                    "Genre": "Homme",
                    "numberPers": nbrUserMale
                },
                {
                    "Genre": "Femme",
                    "numberPers": nbrUserFemale
                }
            ]
        }
	);
    
    //a chart to see the proportion of person who choose a specific type of filter
    AmCharts.makeChart("pieChartTypeFilter",
        {
            "type": "pie",
            "balloonText": "[[title]]<br><span style='font-size:10px'><b>[[value]]</b> ([[percents]]%)</span>",
            "startRadius": "200%",
            "autoMarginOffset": 0,
            "angle": 30,
            "depth3D": 30,
            "marginRight": 0,
            "marginTop": -40,
            "marginLeft": 0,
            "marginBot": -50,
            "pullOutDuration": 1,
            "pullOutEffect": "easeOutSine",
            "startEffect": "easeOutSine",
            "titleField": "Type de filtre",
            "valueField": "numberPers",
            "fontSize": 8,
            "theme": "light",
            "allLabels": [],
            "balloon": {
                "animationDuration": 0,
                "fadeOutDuration": 0
            },
            "legend": {
                "align": "center",
                "position": "bottom",
                "markerType": "circle",
                "labelText": "[[title]]",
                "valueText": "[[value]]",
                "textClickEnabled": true
            },
            "titles":  [
                {
                    "text": "Proportion des types de correction",
                    "size": 15
                }
            ],
            "dataProvider": [
                {
                    "Type de filtre": "Indéfini",
                    "numberPers": typeFilterResult.undefined.counter
                },
                {
                    "Type de filtre": "Saturation",
                    "numberPers": typeFilterResult.saturation.counter
                },
                {
                    "Type de filtre": "Protanope",
                    "numberPers": typeFilterResult.visionarize_protanope.counter
                },
                {
                    "Type de filtre": "Deuteranope",
                    "numberPers": typeFilterResult.visionarize_deuteranope.counter
                },
                {
                    "Type de filtre": "Tritanope",
                    "numberPers": typeFilterResult.visionarize_tritanope.counter
                }
            ]
        }
    );
    
    //a chart to see the average of value and intensity of each filter for every users
    AmCharts.makeChart("chartValueFilterResult",
        {
            "type": "serial",
            "categoryField": "typeFilter",
            "rotate": true,
            "autoMarginOffset": 40,
            "marginRight": 60,
            "marginTop": 60,
            "startDuration": 1,
            "fontSize": 13,
            "theme": "light",
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] de [[category]] : [[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "labelText": "",
                    "title": "Valeur de visionarization",
                    "type": "column",
                    "valueField": "value"
                },
                {
                    "balloonText": "[[title]] de [[category]] : [[value]]",
                    "bullet": "round",
                    "id": "AmGraph-2",
                    "labelText": "",
                    "lineThickness": 2,
                    "title": "Intensité",
                    "valueField": "intensity"
                }
            ],
            "legend": {
                "useGraphSettings": true,
                "align": "left",
                "position": "bottom",
                "markerType": "circle",
                "labelText": "[[title]]",
                "valueText": "[[value]]",
                "textClickEnabled": true
            },
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Quantité"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles":  [
                {
                    "text": "Moyenne de valeur et intensité des filtres",
                    "size": 15
                }
            ],
            "dataProvider": [
                {
                    "typeFilter": "Saturation",
                    "value": typeFilterResult.saturation.value,
                    "intensity": typeFilterResult.saturation.intensity
                },
                {
                    "typeFilter": "Protanope",
                    "value": typeFilterResult.visionarize_protanope.value,
                    "intensity": typeFilterResult.visionarize_protanope.intensity
                },
                {
                    "typeFilter": "Deuteranope",
                    "value": typeFilterResult.visionarize_deuteranope.value,
                    "intensity": typeFilterResult.visionarize_deuteranope.intensity
                },
                {
                    "typeFilter": "Tritanope",
                    "value": typeFilterResult.visionarize_tritanope.value,
                    "intensity": typeFilterResult.visionarize_tritanope.intensity
                }
            ]
        }
    );
            
    $(".amcharts-main-div a").hide();
};