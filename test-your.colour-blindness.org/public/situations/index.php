<?php

//$images = scandir('./images');

$images = array();
$images = glob('images/*.{jpg,png}', GLOB_BRACE);


?><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Situations</title>

    <!-- load fonts from google -->
    <link href="//fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,700%7CRoboto:400,500,700%7CRoboto+Condensed%7CLato:400,700" rel="stylesheet" type="text/css">

    <!-- load css for cubeportfolio -->
    <link rel="stylesheet" type="text/css" href="./cubeportfolio/css/cubeportfolio.min.css">
    <style>
	    .thumb{
		    display:inline-block;
		    width:100px;
		    height:75px;
		    background:#DDD;
		    background-position: center center;
		    background-size: cover;
		    background-repeat: no-repeat;
		    border:1px solid #DDD;
	    }
	    #js-pagination-slider{
		    margin-bottom:30px;	
	    }
    </style>
</head>
<body style="max-width: 760px; width: 97%; margin: 100px auto; min-height: 1000px;">
	    <div id="js-pagination-slider">
	    <?php
foreach($images as $k=> $i){
?>
        <div class="cbp-pagination-item <?php echo ($k==0) ? 'cbp-pagination-active': '' ?> thumb" style="background-image: url(<?php echo $i ?>)">&nbsp;</div>
		<?php
}
?>
    </div>

    <div id="js-grid-slider-thumbnail" class="cbp">

	    <?php
foreach($images as $i){
?>
        <div class="cbp-item">
            <div class="cbp-caption">
                <div class="cbp-caption-defaultWrap">
                    <img src="<?php echo $i ?>" alt="">
                </div>
            </div>
        </div>
		<?php
}
?>
    </div>


    <!-- load jquery -->
    <script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>

    <!-- load cubeportfolio -->
    <script type="text/javascript" src="./cubeportfolio/js/jquery.cubeportfolio.min.js"></script>

    <!-- init cubeportfolio -->
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>
