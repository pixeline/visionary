<div class="admin-analytics">

    <h1><i class="fa fa-bar-chart" aria-hidden="true"></i> Analytics</h1>


    <h2>Questions</h2>

    <h3>Diagnostique</h3>
    <ul>
        <li>Nombre de tests protanope : <?php echo $protan_count; ?></li>
        <li>Nombre de tests deuteranope : <?php echo $deutan_count; ?></li>
        <li>Nombre de tests tritanope : <?php echo $tritan_count; ?></li>
        <li>Nombre de tests réussi : <?php echo $succeed_count; ?></li>
    </ul>

    <h3>Données</h3>
    <ul>
        <li>Nombre total de tests effectués : <?php echo $tests_count; ?></li>
        <li>Nombre d'utilisateurs ayant effectué le test : <?php echo $distinct_users_count; ?></li>
        <li>Nombre de tests ayant été fini : <?php echo $finished_count; ?></li>
        <li>Nombre de tests ayant été abandoné : <?php echo $tests_count - $finished_count; ?> </li>
        <li>Nombre de tests ayant été sure de la réponse : <?php echo $is_sure_count; ?></li>
    </ul>

    <h3>Temps</h3>
    <ul>
        <li>Temps minimum pour réaliser le test : <?php echo $min_time; ?> </li>
        <li>Temps maximum pour réaliser le test : <?php echo $max_time; ?></li>
    </ul>

    <h3>Taux</h3>
    <ul>
        <li>Taux de tests ayant été fini : <?php echo round((100/$tests_count) * $finished_count, 2) . " / 100%"; ?> </li>
        <li>Taux d'abandon : <?php echo round((100/$tests_count) * ($tests_count - $finished_count), 2) . " / 100%"; ?> </li>

        <li>[work in progress] : Est-ce qu'il y a une pattern d'ordre des tiles par type de daltonisme ?</li>
        <li>[work in progress] : Est-ce qu'il y a une pattern d'ordre des tiles par degré de daltonisme ?</li>
    </ul>

    <h3>Combien de fois par personne ?</h3>
    <ul class="list-inline list-nbr">
        <?php $key=0; foreach (($distinct_users_trials?:array()) as $user): $key++; ?>
            <li><?php echo $user["username"]; ?> : <span><?php echo $user["test_count"]; ?></span>,</li>
        <?php endforeach; ?>
    </ul>


    
    <h2>Tests</h2>

    <div id="controls">
        <!--
        <div>
            <input id="unique-color" type="checkbox" checked>
            <label for="unique-color">Une couleur par catégorie</label>
        </div>
        -->
        <div>
            <input id="unique-line" type="checkbox">
            <label for="unique-line">Line unique par catégorie</label>
            <form class="strengths hide">
                <label><input type="radio" name="filter-strong" value="hight" checked> Degré le plus fort </label> 
                <label><input type="radio" name="filter-strong" value="medium"> Degré moyen</label> 
                <label><input type="radio" name="filter-strong" value="low"> Degré faible</label> 
            </form>

        </div>
        <br>
        <div>
            <input id="protans" type="checkbox" checked>
            <label for="protans">Test diagnostiqué <span class="red">"protanope"</span></label>
        </div>
        <div>
            <input id="deutans" type="checkbox">
            <label for="deutans">Test diagnostiqué <span class="blue">"deuteranope"</span></label>
        </div>
        <div>
            <input id="tritans" type="checkbox">
            <label for="tritans">Test diagnostiqué<span class="green"> "tritanope"</span></label>
        </div>

        <br>

        <form class="filters">
            Filtres : 
            <label><input type="radio" name="filter" value="all" checked> Tout </label> 
            <label><input type="radio" name="filter" value="vetted"> Vetted only </label> 
            <label><input type="radio" name="filter" value="anonymous"> Exclude Anonymous Users</label> 
        </form>

    </div>

    <div class="graph-container" class=""></div>

    <hr>

    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" version="1.1" class="hidden">
        <defs>
            <pattern id="Dot" x="0" y="0" width="100" height="100">
              <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
            </pattern>

            <pattern id="Lines" x="0" y="0" width="0.1" height="0.1">
              <line x1="0" y1="0" x2="100" y2="100" stroke="green" stroke-width="1" />
            </pattern>
      </defs>
    </svg>

    <div class="charts-container"></div>
</div>

<script src="assets/js/jquery-1.12.0.min.js"></script>
<script src="assets/js/d3.min.js"></script>
<script src="assets/js/d3-extended.js"></script>
<script>

function closest(num, arr) {
    var curr = parseInt(arr[0]);
    var diff = Math.abs (num - curr);
    for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs (num - parseInt(arr[val]) );
        if (newdiff < diff) {
            diff = newdiff;
            curr = parseInt(arr[val]); 
        }
    }
    return curr;
}
//{ "value":parseInt(arr[val]), "key":val };

// help : https://www.dashingd3js.com/svg-basic-shapes-and-d3js
var jsonData = <?php echo json_encode($tests); ?>;

var tests_total_count = parseInt("<?php echo $tests_count; ?>");
var distinct_users_count = parseInt("<?php echo $distinct_users_count; ?>");

var protan_count = parseInt("<?php echo $protan_count; ?>");
var deutan_count = parseInt("<?php echo $deutan_count; ?>");
var tritan_count = parseInt("<?php echo $tritan_count; ?>");
var succeed_count = parseInt("<?php echo $succeed_count; ?>");

var finished_count = parseInt("<?php echo $finished_count; ?>");
var abandon_count = parseInt("<?php echo $tests_count - $finished_count; ?>");

var finished_ratio = parseFloat("<?php echo (100/$tests_count) * $finished_count; ?>");
var abandon_ratio = parseFloat("<?php echo (100/$tests_count) * ($tests_count - $finished_count); ?>");
var min_time = "<?php echo $min_time; ?>";
var max_time = "<?php echo $max_time; ?>";
var is_sure_count =  parseInt(" <?php echo $is_sure_count; ?> ");


var chart = function (dataSet, question) {
    var width = 320, //960,
        height = 320, //500,
        radius = Math.min(width, height) / 2;

    var pie = d3.pie()
        .value(function(d) { return d.count; })
        .sort(null);

    var arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);

    var svg = d3.select(".charts-container").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.datum(dataSet).selectAll(".arc")
      .data(pie)
    .enter().append("g")
      .attr("class", "arc");

    g.append("path")
          //.attr("fill", "url(#Lines)")
          .attr("fill", function(d, i) { return d3.schemeCategory10[i]; })
          .attr("d", arc)

    g.append("text")
      .attr("transform", function(d) {
         return "translate(" + arc.centroid(d) +")"; 
      })
      .text(function(d) { return d.data.type; });
}

var daltonism = [
    { "type" : "normal", "count" : succeed_count },
    { "type" : "protan", "count" : protan_count },
    { "type" : "deutan", "count" : deutan_count },
    { "type" : "tritan", "count" : tritan_count }
]

var tests_counting = [
    { "type" : "Total", "count" : tests_total_count },
    { "type" : "Distinct", "count" : distinct_users_count }
]

var abandon = [
    { "type" : "finished", "count" : finished_count },
    { "type" : "abandoned", "count" : abandon_count }
]

var conviction = [
    { "type" : "sure", "count" : is_sure_count },
    { "type" : "not sure", "count" : tests_total_count-is_sure_count }
]

// protan sure ?
// deutan sure ?
// tritan sure ?
// normal sure ?

chart(daltonism);
chart(tests_counting);
chart(abandon);
chart(conviction);


var colour = d3.scaleOrdinal(d3.schemeCategory10);

jsonData.forEach(function(el, i){
    el["color"] = colour(i);
})

var profilesArr = [
    { name : "protans" },
    { name : "deutans" },
    { name : "tritans" }
];

profilesArr[0].data = jsonData.filter(function(data){
    if(data.diag_result == "protan" && data.diag_serie){ return true; }
})
profilesArr[1].data = jsonData.filter(function(data){
    if(data.diag_result == "deutan" && data.diag_serie){ return true; }
})
profilesArr[2].data = jsonData.filter(function(data){
    if(data.diag_result == "tritan" && data.diag_serie){ return true; }
})

var sortByRatio = function(a, b){
    return parseInt(b.diag_ratio) - parseInt(a.diag_ratio);
}
profilesArr.forEach(function(obj, k){
    obj.data.sort(sortByRatio);
})

profilesArr.forEach(function(obj, k){
    
    var key = Math.floor(obj.data.length/2);
    var addition = 0;
    var arr = [];

    obj.data.forEach(function(user, i){
        var int = parseInt(user.diag_ratio);
        addition += int;
        arr.push(int);
    })

    var close = closest( addition/obj.data.length, arr);
    for (var i = 0; i < obj.data.length; i++) {
        if(parseInt(obj.data[i].diag_ratio) == close){
            obj.data[i].isMedium = true;
            break;
        }
    }
    for (var i = 0; i < obj.data.length; i++) {
        if( i == obj.data.length-1){
            obj.data[i].isLast = true;
        }
    }
})


var width = 790,
    height = 720,
    serieMax = [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var getData = function(d){ return d; }

var svg = d3.select(".graph-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "graph")
    .attr("class", "unique-color");
    //.append("g")
    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var letterWidth = 8;
var lineThick = 1;

svg.append("text")
    .attr("x",width-120)
    .attr("y",38)
    .attr("fill","#54a4ce")
    .text("Index de la couleur");


svg.append("text")
    .attr("x", 0)
    .attr("y",710)
    .attr("fill","#54a4ce")
    .text("Index de la séquence");

svg.append("text")
    .attr("x", width-120)
    .attr("y",710)
    .attr("fill","#a4a4a4")
    .text("Séquence correcte");


var xAxis = svg.append("g");
    xAxis.selectAll().data(serieMax)
        .enter()
        .append("text")
        .attr("fill","#54a4ce")
        .attr("x", function(d, i){ return (40-letterWidth) + (i * 40); })
        .attr("y", 40)
        .text(getData); 

var yAxis = svg.append("g");
    yAxis.selectAll().data(serieMax)
        .enter()
        .append("text")
        .attr("fill","#54a4ce")
        .attr("x", 0)
        .attr("y", function(d, i){ return (80+letterWidth/2) + (i * 40); })
        .text(getData); 

var tinyCircleRadius = 4;
var bigCircleRadius = 12;

var matrixGrid = (function(){
    var arr = [];
    for (var i = 0; i < serieMax.length; i++) {
        var arr2 = [];
        for (var j = 0; j < serieMax.length; j++) {
            arr2.push({ 
                x : (40-tinyCircleRadius/2) + (i * 40), 
                y : (80-tinyCircleRadius/2) + (j * 40) 
            });
        }
        arr.push(arr2);
    }
    return arr;
})();


var grid = svg.append("g").attr("class", "grid");
    grid.selectAll()
        .data(matrixGrid)
        .enter()
            .append("g")
            .attr("transform", function (d, i) { return "translate(" + i * 40 + ")" })
            .selectAll()
                .data(getData)
                .enter()
                    .append("circle")
                    .attr("r", tinyCircleRadius)
                    .attr("cx", 40-(tinyCircleRadius/2) )
                    .attr("cy", function(d,i){  return (80-(tinyCircleRadius/2)) + (i * 40); })
                    .style("stroke", "#a4a4a4")
                    .style("stroke-width", 1)
                    .style("fill", "#fff");


var dot = svg.append("g").attr("class", "dots");
    dot.selectAll()
        .data(matrixGrid)
        .enter()
            .append("circle")
            .attr("r", bigCircleRadius)
            .attr("cx", function(d,i) { return d[serieMax[i]].x; })
            .attr("cy", function(d,i) { return d[serieMax[i]].y; })
            .style("stroke", "#bbbbbb")
            .style("stroke-width", 2)
            .style("fill", "transparent");


 var tooltip = d3.select(".graph-container")
        .append("div")
        .attr('class','tooltipdiv')
        .style("position", "absolute")
        .style("top", "15%")
        .style("right", " -40px")
        .style("z-index", "10")
        //.style("visibility", "hidden")
        .text("Passer la souris sur un élément");


var getUserData = function(d, i){
    var user, values, j, k, users = [], serie = [];

    /*
    for (k = 0; k < d.data.length; k++) {
        user = d.data[k];
        values = d.data[k].diag_serie.split(",");
        serie = [];
        for (j = 0; j < values.length; j++) {
            serie.push({
                index : values[j],
                color : user.color
            })
        }
        user.serie = serie;
        users.push(user);
    }*/

    console.log( d )

    //return users;
    return [];
}

var getSerie = function(d, i){
    var values = d.diag_serie.split(",");
    var output = [];
    for (var i = 0; i < values.length; i++) {
        output.push({
            index : values[i],
            color : d.color
        })
    }
    return output;
}

var colors = ["#3781C1","#3583B4","#3B84A7","#39859C","#3B8690","#3F8782","#588473","#6C8164","#837B5D","#907660","#9E6E6F","#9F6D7C","#9C6D89","#927099","#8F6FA4","#8073B2"];

/************************
    TREE
************************/

var profileGroup = svg
    .append("g")
    .attr("class", "profiles");

var profiles = profileGroup.selectAll()
        .data(profilesArr)
        .enter()
        .append("g").attr("class", function(d,i){ 
                var hide = "" 
                if(i>0){ hide = "hide" }; 
                return d.name + " " +hide;
            })
            .selectAll()
            .data(function(d,i){ return d.data; })
            .enter()
            .append("g")
                .attr("class", function(d,i){

                    var classes = ["user"];

                    if(i == 0){
                        classes.push("first");
                    }
                    if(d.vetted == "1"){
                        classes.push("vetted");
                    }
                    if(d.username == "anonymous"){
                        classes.push("anonymous");
                    }
                    if(d.isMedium){
                         classes.push("medium");
                    }

                    if(d.isLast){
                         classes.push("low");
                    }

                    return classes.join(" "); 
                })
                .attr("style", function(d, i){ 
                    var opacity = 0.1;
                    var value = parseInt(d.diag_ratio);
                    if(value > 20){  opacity = 0.2; }
                    if(value > 40){  opacity = 0.6; }
                    if(value > 60){  opacity = 0.8; }
                    if(value > 80){  opacity = 1; }
                    return "opacity:"+opacity+"; fill:"+d.color+";"; //stroke:"+d.color+";
                })
                .on("mouseover", function(data){
                    d3.select(this).moveToFront();
                    d3.select(this).addClass("hover");
                    d3.select(this.parentNode).addClass("hovered");
                  
                    var html = "", list = "", series = [];

                    //if(data.diag_serie && data.diag_serie.length > 0){
                        series = data.diag_serie.split(",");
                        list = "<ul class='color-list'>";
                        for (i = 0; i < series.length; i++) {
                            list += "<li style='background:"+colors[series[i]]+"';></li>"
                        }
                        list+="</ul>";
                    //}

                    //html += "<div>birth_date : "+data.birth_date+"</div>";
                    html += "<div>Niveau : "+data.diag_ratio+"</div>";
                    //html += "<div>finished : "+data.finished+"</div>";
                    //html += "<div>Test ID : "+data.id+", User ID : "+data.users_id+"</div>";
                    html += "<div>Interface : "+data.name+"</div>";
                    html += "<div>Genre : "+(data.gender == "M"? "Homme" : "Femme")+"</div>";
                    //html += "<div>vetted : "+data.vetted+"</div>";
                    html += "<div>Name : "+data.username+"</div>";
                    html += "<div>Email : <a href='mailto:"+data.email+"' target='_blank'> "+data.email+"</a></div>";
                    html += "<div>Temps : "+data.test_duration+"</div>";
                    //html += "<div>users_id : "+data.users_id+"</div>";
                    html += "<div>Lien : <a href='/admin/test/"+data.unique_url+"' target='_blank'>Teste</a></div>";
                    html += "<div>Série : "+data.diag_serie+"</div>";
                    

                    html += "<div>"+list+"</div>";

                    tooltip.style("visibility", "visible").html(html);
                })
                .on("mousemove", function(){
                    /*tooltip
                        .style("top",(d3.event.pageY-10)+"px")
                        .style("left",(d3.event.pageX+10)+"px");
                        */
                })
                .on("mouseout", function(){
                    d3.select(this).removeClass("hover");
                    d3.select(this.parentNode).removeClass("hovered");
                    //tooltip.style("visibility", "hidden");
                });

    profiles.append("polyline")
        .attr("fill", "none")
        .attr("stroke", function(d, i) { return d.color; } )
        /*.attr("style", function(d, i) { 
            var stroke = (parseInt(d.diag_ratio)/100) + 0.2;
            return "stroke-width:"+stroke+"px"; 
        })*/
        .attr("points", function(d, i) { 
            var string = "",
                arr = d.diag_serie.split(",");
            for (var j = 0; j < arr.length; j++) {
                 string += matrixGrid[j][arr[j]].x +","+matrixGrid[j][arr[j]].y+" ";
            }
            return string;
        })

    profiles.selectAll()
        .data(getSerie)
            .enter()
            .append("circle")
                .attr("r", tinyCircleRadius)
                .attr("cx", function(d,i){ return matrixGrid[i][parseInt(d.index)].x; })
                .attr("cy", function(d,i){ return matrixGrid[i][parseInt(d.index)].y; } )
                //.attr("fill", function(d, i) { return d.color; })

   
        $(".strengths input").on("click", function(){

            //console.log( $(this).val() )

            d3.selectAll(".user").addClass("hide");

            switch( $(this).val() ){
                case "hight" :
                    d3.selectAll(".user.first").removeClass("hide");
                break;
                case "medium" :
                    d3.selectAll(".user.medium").removeClass("hide");
                break;
                case "low":
                    d3.selectAll(".user.low").removeClass("hide");
                break;
            }
        })
    

        $(".filters input").on("click", function(){

            switch( $(this).val()){
                case "all" :
                    d3.selectAll(".user").removeClass("hide");
                break;
                case "vetted" :
                    d3.selectAll(".user").addClass("hide");
                    d3.selectAll(".user.vetted").removeClass("hide");
                break;
                case "anonymous":
                    d3.selectAll(".user").removeClass("hide");
                    d3.selectAll(".user.anonymous").addClass("hide");
                break;
            }
        })
    

    

    /*
        INTERRACTIONS
    */

    d3.selectAll("#controls input").on("click", function(){
        var self = this;
        switch(self.id){
            case "protans" : 
            case "deutans" : 
            case "tritans" : 
                if(self.checked){
                    d3.select("."+self.id).removeClass("hide");
                } else {
                    d3.select("."+self.id).addClass("hide");
                }
            break;
            case "unique-color" :
                if(self.checked){
                      d3.select("#graph").addClass("unique-color");
                      d3.select("#color-legend").removeClass("hide");   
                } else {
                    d3.select("#graph").removeClass("unique-color");
                     d3.select("#color-legend").addClass("hide");
                }
            break;
            case "unique-line" :
                if(self.checked){
                    //d3.select("#graph").addClass("unique-line");
                    d3.select(".strengths").removeClass("hide");

                    d3.selectAll(".user").addClass("hide");
                    d3.selectAll(".user.first").removeClass("hide");

                } else {
                    d3.select(".strengths").addClass("hide");
                    d3.selectAll(".user").removeClass("hide");
                    //d3.select("#graph").removeClass("unique-line");
                }
            break;
        }
    })


</script>