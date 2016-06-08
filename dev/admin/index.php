<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Colour Blindness</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/TestDeClassement.css">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">

    <meta name="apple-mobile-web-app-title" content="Visionary">
    <meta name="application-name" content="Visionary">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#000000">

    <meta name="viewport" content="width=device-width" />

    <script src="https://use.typekit.net/vyt6ezk.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>

    <style>

     table {
            font-size: 16px;
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
        }

        th {
            padding-top: 11px;
            padding-bottom: 11px;
            background-color: #0277BD;
            color: white;
        }
        td,  th {
            border: 1px solid #ddd;
            text-align: left;
            padding: 8px;
        }
</style>
    
</head>
<body>


<?php
  // start a new session (required for Hybridauth)
  session_start();
 
  // change the following paths if necessary
  $config   = dirname(__FILE__) . '/library/config.php';
  require_once( "library/Hybrid/Auth.php" );
 
  try{
    // create an instance for Hybridauth with the configuration file path as parameter
    $hybridauth = new Hybrid_Auth( $config );
 
    // try to authenticate the user with twitter,
    // user will be redirected to Twitter for authentication,
    // if he already did, then Hybridauth will ignore this step and return an instance of the adapter
    $twitter = $hybridauth->authenticate( "Twitter" );
 
    // get the user profile
    $twitter_user_profile = $twitter->getUserProfile();
 
    echo "Ohai there! U are connected with: <b>{$twitter->id}</b><br />";
    echo "As: <b>{$twitter_user_profile->displayName}</b><br />";
    echo "And your provider user identifier is: <b>{$twitter_user_profile->identifier}</b><br />";
 
    // debug the user profile
    print_r( $twitter_user_profile );
 
    // exp of using the twitter social api: Returns settings for the authenticating user.
    $account_settings = $twitter->api()->get( 'account/settings.json' );
 
    // print recived settings
    echo "Your account settings on Twitter: " . print_r( $account_settings, true );
 
    // disconnect the user ONLY form twitter
    // this will not disconnect the user from others providers if any used nor from your application
    echo "Logging out..";
    $twitter->logout();
  }
  catch( Exception $e ){
    // Display the recived error,
    // to know more please refer to Exceptions handling section on the userguide
    switch( $e->getCode() ){
      case 0 : echo "Unspecified error."; break;
      case 1 : echo "Hybriauth configuration error."; break;
      case 2 : echo "Provider not properly configured."; break;
      case 3 : echo "Unknown or disabled provider."; break;
      case 4 : echo "Missing provider application credentials."; break;
      case 5 : echo "Authentification failed. "
                  . "The user has canceled the authentication or the provider refused the connection.";
               break;
      case 6 : echo "User profile request failed. Most likely the user is not connected "
                  . "to the provider and he should authenticate again.";
               $twitter->logout();
               break;
      case 7 : echo "User not connected to the provider.";
               $twitter->logout();
               break;
      case 8 : echo "Provider does not support this feature."; break;
    }
 
    // well, basically your should not display this to the end user, just give him a hint and move on..
    echo "<br /><br /><b>Original error message:</b> " . $e->getMessage();
  }

  ?>

  <!--
    
    <div id="homeScreen" class="home">
        <div class="center">
            <h1><a href="#"><img src="logo.png" alt="Visionary"></a></h1>
        </div>
        <div class="">
            <div class="main">
                <h2>Veuillez indiquez les information suivantes : </h2>

                <table id="table">
                    <thead>
                        <tr>
                            <th>id</th><th>name</th><th>email</th><th>result</th><th>url</th><th>date</th><th>series</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
    -->



    
    <script src="js/jquery-1.12.0.min.js"></script>
    <script src="js/tinyurl.js"></script>
    <script src="js/tools.js"></script>
    <script src="js/touch-dnd.js"></script>
    <script src="js/velocity.js"></script>
    <script src="js/velocity.ui.js"></script>
    
    <script>
        $(document).ready(function() {
            /*
            var $table = $("#table tbody");
            $.ajax({type: "GET",
              url: "/test/getall",
              dataType: "json",
              success: function(result){

                $("#table tbody").empty();

                $.each(result.data, function(key, obj){
                    var td = "";
                    for (var key in obj) {
                        td += "<td>"+obj[key]+"</td>";
                    }
                    var tr = $("<tr>").html(td);
                    $table.append(tr)
                })

                console.log( result )
                
              }
            });*/
            
        })
    </script>
   
 
</body>
</html>