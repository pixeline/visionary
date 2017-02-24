<?php


// future translation

$default_lang = "fr";
$lang = $default_lang;
function setLanguage($name = NULL){
	global $lang, $default_lang;

	//if lang not setted
	if($name != NULL) {
		$lang = $name;
	}else{
		//if lang getted
		if(isset($_GET['lang'])){
			$lang = $_GET['lang'];

		}else{
			//if session sessted
			if(isset($_SESSION['lang'])){
				$lang = $_SESSION['lang'];
			}else{
				//use default language
				$lang = $default_lang;
			}

		}
	}

	if ($lang != 'fr' && $lang != 'en') {
		$lang = $default_lang;
	}

	$_SESSION['lang'] = $lang;

	if($lang == "fr"){
		$language = 'fra_FRA';
		$domain = $lang;
		putenv("LANG=$language");
		setlocale(LC_ALL, $language);
		bindtextdomain($domain, "./lang");
		textdomain($domain);
	}
}

setLanguage();
