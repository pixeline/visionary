/* Using WebGlImagefilter.js
*/
if(!window.Color) Color = { };
if(!window.Color.Vision) Color.Vision = { };

(function() {

	var CVDMatrix = { // Color Vision Deficiency
		"Protanope": [ // reds are greatly reduced (1% men)
			0.0, 2.02344, -2.52581,
			0.0, 1.0,      0.0,
			0.0, 0.0,      1.0
		],
		"Deuteranope": [ // greens are greatly reduced (1% men)
			1.0,      0.0, 0.0,
			0.494207, 0.0, 1.24827,
			0.0,      0.0, 1.0
		],
		"Tritanope": [ // blues are greatly reduced (0.003% population)
			1.0,       0.0,      0.0,
			0.0,       1.0,      0.0,
			-0.395913, 0.801109, 0.0
		]
	};

	var valA = valB = valC = 0.0,
		valD = 0.7,
		valE = 1.0,
		valF = 0.0,
		valG = 0.7,
		valH = 0.0,
		valI = 1.0;

	Color.Vision.Dalto = function(image, options) {

		if(!options) options = { };
		var type = typeof options.type == "string" ? options.type : "Normal", 
			amountDalto = typeof options.amountDalto == "number" ? options.amountDalto : 0.0,
			amountTransf = typeof options.amountTransf == "number" ? options.amountTransf : 0.0;
			amountHue = typeof options.amountHue == "number" ? options.amountHue : 0.0,
			amountSaturation = typeof options.amountSaturation == "number" ? options.amountSaturation : 0.0;
		console.log(amountHue);

		// Apply Daltonization
		var cvd = CVDMatrix["Protanope"];

		var cvda = cvd[0],
			cvdb = cvd[1],
			cvdc = cvd[2],
			cvdd = cvd[3],
			cvde = cvd[4],
			cvdf = cvd[5],
			cvdg = cvd[6],
			cvdh = cvd[7],
			cvdi = cvd[8];

		// amountDalto = 1er slider : Left gives values : -1 ; -1 to Right 0 ; 0 / and more than enhancer : 1 ; 1
		// amountTransf = 2e slider : Left gives values : -0.5 ; 0.5 to Right 0.5 ; -0.5

		var	amountG = amountDalto+amountTransf, 
			amountB = amountDalto-amountTransf;

		var R1 = (valA-(1.44748099512696*valA*cvda)-(0.279715681385635*valA*cvdb)-(0.00242482044796114*valA*cvdc)+2.3337320435016*valA*cvdd+0.45097756096085*valA*cvde+0.0039094683786494*valA*cvdf-(2.0872527906384*valA*cvdg)-(0.4033471517229*valA*cvdh)-(0.0034965662857356*valA*cvdi)+0.1832683754604*valB*cvda+0.035415344789275*valB*cvdb+0.0003070112186461*valB*cvdc-(0.96599520599184*valB*cvdd)-(0.18667188596529*valB*cvde)-(0.00161823535922556*valB*cvdf)+2.0317036543392*valB*cvdg+0.3926126657002*valB*cvdh+0.0034035103616728*valB*cvdi+0.0065323859640912*valC*cvda+0.0012623383637997*valC*cvdb+1.09430542528908e-5*valC*cvdc+0.073704362532456*valC*cvdd+0.0142428578034985*valC*cvde+0.000123469562622454*valC*cvdf-(12.401648348772*valC*cvdg)-(2.39653268668825*valC*cvdh)-(0.020775243755023*valC*cvdi)+1)  ,
			R2 = (-(3.52238668926119*valA*cvda)-(2.19807886050366*valA*cvdb)-(0.0149187902480011*valA*cvdc)+5.6790429124849*valA*cvdd+3.5438994281586*valA*cvde+0.024053137118381*valA*cvdf-(5.0792455801626*valA*cvdg)-(3.1696072356564*valA*cvdh)-(0.021512742953394*valA*cvdi)+valB+0.44597620863935*valB*cvda+0.2783030266059*valB*cvdb+0.0018888969608515*valB*cvdc-(2.35071041825826*valB*cvdd)-(1.46691642155364*valB*cvde)-(0.0099562480663194*valB*cvdf)+4.9440689947988*valB*cvdg+3.0852528416232*valB*cvdh+0.020940213216772*valB*cvdi+0.0158962980837018*valC*cvda+0.0099197844701652*valC*cvdb+6.7327513345842e-5*valC*cvdc+0.179356597011509*valC*cvdd+0.111924095552826*valC*cvde+0.00075965068189921*valC*cvdf-(30.1789116511205*valC*cvdg)-(18.832579607337*valC*cvdh)-(0.127820393544145*valC*cvdi)),
			R3 = (-(0.333438511456865*valA*cvda)-(0.313023512252006*valA*cvdb)-(0.118752790069611*valA*cvdc)+0.53759333721415*valA*cvdd+0.50467882022026*valA*cvde+0.19146171339981*valA*cvdf-(0.4808149232271*valA*cvdg)-(0.45137670317124*valA*cvdh)-(0.17124030871794*valA*cvdi)+0.042217296473225*valB*cvda+0.03963251383919*valB*cvdb+0.015035521012515*valB*cvdc-(0.22252451302971*valB*cvdd)-(0.208900298667924*valB*cvde)-(0.079251213861594*valB*cvdf)+0.4680187473998*valB*cvdg+0.43936398189512*valB*cvdh+0.16668300195972*valB*cvdi+valC+0.0015047859415503*valC*cvda+0.00141265440081732*valC*cvdb+0.00053592348477042*valC*cvdc+0.0169783734732515*valC*cvdd+0.0159388610322866*valC*cvde+0.0060467796955521*valC*cvdf-(2.85681620618675*valC*cvdg)-(2.6819056947317*valC*cvdh)-(1.01744364716145*valC*cvdi)),
			G1 = (valD-(1.44748099512696*valD*cvda)-(0.279715681385635*valD*cvdb)-(0.00242482044796114*valD*cvdc)+2.3337320435016*valD*cvdd+0.45097756096085*valD*cvde+0.0039094683786494*valD*cvdf-(2.0872527906384*valD*cvdg)-(0.4033471517229*valD*cvdh)-(0.0034965662857356*valD*cvdi)+valD*amountG-(1.44748099512696*valD*amountG*cvda)-(0.279715681385635*valD*amountG*cvdb)-(0.00242482044796114*valD*amountG*cvdc)+2.3337320435016*valD*amountG*cvdd+0.45097756096085*valD*amountG*cvde+0.0039094683786494*valD*amountG*cvdf-(2.0872527906384*valD*amountG*cvdg)-(0.4033471517229*valD*amountG*cvdh)-(0.0034965662857356*valD*amountG*cvdi)+0.1832683754604*valE*cvda+0.035415344789275*valE*cvdb+0.0003070112186461*valE*cvdc-(0.96599520599184*valE*cvdd)-(0.18667188596529*valE*cvde)-(0.00161823535922556*valE*cvdf)+2.0317036543392*valE*cvdg+0.3926126657002*valE*cvdh+0.0034035103616728*valE*cvdi+0.1832683754604*valE*amountG*cvda+0.035415344789275*valE*amountG*cvdb+0.0003070112186461*valE*amountG*cvdc-(0.96599520599184*valE*amountG*cvdd)-(0.18667188596529*valE*amountG*cvde)-(0.00161823535922556*valE*amountG*cvdf)+2.0317036543392*valE*amountG*cvdg+0.3926126657002*valE*amountG*cvdh+0.0034035103616728*valE*amountG*cvdi+0.0065323859640912*valF*cvda+0.0012623383637997*valF*cvdb+1.09430542528908e-5*valF*cvdc+0.073704362532456*valF*cvdd+0.0142428578034985*valF*cvde+0.000123469562622454*valF*cvdf-(12.401648348772*valF*cvdg)-(2.39653268668825*valF*cvdh)-(0.020775243755023*valF*cvdi)+0.0065323859640912*valF*amountG*cvda+0.0012623383637997*valF*amountG*cvdb+1.09430542528908e-5*valF*amountG*cvdc+0.073704362532456*valF*amountG*cvdd+0.0142428578034985*valF*amountG*cvde+0.000123469562622454*valF*amountG*cvdf-(12.401648348772*valF*amountG*cvdg)-(2.39653268668825*valF*amountG*cvdh)-(0.020775243755023*valF*amountG*cvdi)),
			G2 = (-(3.52238668926119*valD*cvda)-(2.19807886050366*valD*cvdb)-(0.0149187902480011*valD*cvdc)+5.6790429124849*valD*cvdd+3.5438994281586*valD*cvde+0.024053137118381*valD*cvdf-(5.0792455801626*valD*cvdg)-(3.1696072356564*valD*cvdh)-(0.021512742953394*valD*cvdi)-(3.52238668926119*valD*amountG*cvda)-(2.19807886050366*valD*amountG*cvdb)-(0.0149187902480011*valD*amountG*cvdc)+5.6790429124849*valD*amountG*cvdd+3.5438994281586*valD*amountG*cvde+0.024053137118381*valD*amountG*cvdf-(5.0792455801626*valD*amountG*cvdg)-(3.1696072356564*valD*amountG*cvdh)-(0.021512742953394*valD*amountG*cvdi)+valE+0.44597620863935*valE*cvda+0.2783030266059*valE*cvdb+0.0018888969608515*valE*cvdc-(2.35071041825826*valE*cvdd)-(1.46691642155364*valE*cvde)-(0.0099562480663194*valE*cvdf)+4.9440689947988*valE*cvdg+3.0852528416232*valE*cvdh+0.020940213216772*valE*cvdi+valE*amountG+0.44597620863935*valE*amountG*cvda+0.2783030266059*valE*amountG*cvdb+0.0018888969608515*valE*amountG*cvdc-(2.35071041825826*valE*amountG*cvdd)-(1.46691642155364*valE*amountG*cvde)-(0.0099562480663194*valE*amountG*cvdf)+4.9440689947988*valE*amountG*cvdg+3.0852528416232*valE*amountG*cvdh+0.020940213216772*valE*amountG*cvdi+0.0158962980837018*valF*cvda+0.0099197844701652*valF*cvdb+6.7327513345842e-5*valF*cvdc+0.179356597011509*valF*cvdd+0.111924095552826*valF*cvde+0.00075965068189921*valF*cvdf-(30.1789116511205*valF*cvdg)-(18.832579607337*valF*cvdh)-(0.127820393544145*valF*cvdi)+0.0158962980837018*valF*amountG*cvda+0.0099197844701652*valF*amountG*cvdb+6.7327513345842e-5*valF*amountG*cvdc+0.179356597011509*valF*amountG*cvdd+0.111924095552826*valF*amountG*cvde+0.00075965068189921*valF*amountG*cvdf-(30.1789116511205*valF*amountG*cvdg)-(18.832579607337*valF*amountG*cvdh)-(0.127820393544145*valF*amountG*cvdi)+1),
			G3 = (-(0.333438511456865*valD*cvda)-(0.313023512252006*valD*cvdb)-(0.118752790069611*valD*cvdc)+0.53759333721415*valD*cvdd+0.50467882022026*valD*cvde+0.19146171339981*valD*cvdf-(0.4808149232271*valD*cvdg)-(0.45137670317124*valD*cvdh)-(0.17124030871794*valD*cvdi)-(0.333438511456865*valD*amountG*cvda)-(0.313023512252006*valD*amountG*cvdb)-(0.118752790069611*valD*amountG*cvdc)+0.53759333721415*valD*amountG*cvdd+0.50467882022026*valD*amountG*cvde+0.19146171339981*valD*amountG*cvdf-(0.4808149232271*valD*amountG*cvdg)-(0.45137670317124*valD*amountG*cvdh)-(0.17124030871794*valD*amountG*cvdi)+0.042217296473225*valE*cvda+0.03963251383919*valE*cvdb+0.015035521012515*valE*cvdc-(0.22252451302971*valE*cvdd)-(0.208900298667924*valE*cvde)-(0.079251213861594*valE*cvdf)+0.4680187473998*valE*cvdg+0.43936398189512*valE*cvdh+0.16668300195972*valE*cvdi+0.042217296473225*valE*amountG*cvda+0.03963251383919*valE*amountG*cvdb+0.015035521012515*valE*amountG*cvdc-(0.22252451302971*valE*amountG*cvdd)-(0.208900298667924*valE*amountG*cvde)-(0.079251213861594*valE*amountG*cvdf)+0.4680187473998*valE*amountG*cvdg+0.43936398189512*valE*amountG*cvdh+0.16668300195972*valE*amountG*cvdi+valF+0.0015047859415503*valF*cvda+0.00141265440081732*valF*cvdb+0.00053592348477042*valF*cvdc+0.0169783734732515*valF*cvdd+0.0159388610322866*valF*cvde+0.0060467796955521*valF*cvdf-(2.85681620618675*valF*cvdg)-(2.6819056947317*valF*cvdh)-(1.01744364716145*valF*cvdi)+valF*amountG+0.0015047859415503*valF*amountG*cvda+0.00141265440081732*valF*amountG*cvdb+0.00053592348477042*valF*amountG*cvdc+0.0169783734732515*valF*amountG*cvdd+0.0159388610322866*valF*amountG*cvde+0.0060467796955521*valF*amountG*cvdf-(2.85681620618675*valF*amountG*cvdg)-(2.6819056947317*valF*amountG*cvdh)-(1.01744364716145*valF*amountG*cvdi)),
			B1 = (valG-(1.44748099512696*valG*cvda)-(0.279715681385635*valG*cvdb)-(0.00242482044796114*valG*cvdc)+2.3337320435016*valG*cvdd+0.45097756096085*valG*cvde+0.0039094683786494*valG*cvdf-(2.0872527906384*valG*cvdg)-(0.4033471517229*valG*cvdh)-(0.0034965662857356*valG*cvdi)+valG*amountB-(1.44748099512696*valG*amountB*cvda)-(0.279715681385635*valG*amountB*cvdb)-(0.00242482044796114*valG*amountB*cvdc)+2.3337320435016*valG*amountB*cvdd+0.45097756096085*valG*amountB*cvde+0.0039094683786494*valG*amountB*cvdf-(2.0872527906384*valG*amountB*cvdg)-(0.4033471517229*valG*amountB*cvdh)-(0.0034965662857356*valG*amountB*cvdi)+0.1832683754604*valH*cvda+0.035415344789275*valH*cvdb+0.0003070112186461*valH*cvdc-(0.96599520599184*valH*cvdd)-(0.18667188596529*valH*cvde)-(0.00161823535922556*valH*cvdf)+2.0317036543392*valH*cvdg+0.3926126657002*valH*cvdh+0.0034035103616728*valH*cvdi+0.1832683754604*valH*amountB*cvda+0.035415344789275*valH*amountB*cvdb+0.0003070112186461*valH*amountB*cvdc-(0.96599520599184*valH*amountB*cvdd)-(0.18667188596529*valH*amountB*cvde)-(0.00161823535922556*valH*amountB*cvdf)+2.0317036543392*valH*amountB*cvdg+0.3926126657002*valH*amountB*cvdh+0.0034035103616728*valH*amountB*cvdi+0.0065323859640912*valI*cvda+0.0012623383637997*valI*cvdb+1.09430542528908e-5*valI*cvdc+0.073704362532456*valI*cvdd+0.0142428578034985*valI*cvde+0.000123469562622454*valI*cvdf-(12.401648348772*valI*cvdg)-(2.39653268668825*valI*cvdh)-(0.020775243755023*valI*cvdi)+0.0065323859640912*valI*amountB*cvda+0.0012623383637997*valI*amountB*cvdb+1.09430542528908e-5*valI*amountB*cvdc+0.073704362532456*valI*amountB*cvdd+0.0142428578034985*valI*amountB*cvde+0.000123469562622454*valI*amountB*cvdf-(12.401648348772*valI*amountB*cvdg)-(2.39653268668825*valI*amountB*cvdh)-(0.020775243755023*valI*amountB*cvdi)),
			B2 = (-(3.52238668926119*valG*cvda)-(2.19807886050366*valG*cvdb)-(0.0149187902480011*valG*cvdc)+5.6790429124849*valG*cvdd+3.5438994281586*valG*cvde+0.024053137118381*valG*cvdf-(5.0792455801626*valG*cvdg)-(3.1696072356564*valG*cvdh)-(0.021512742953394*valG*cvdi)-(3.52238668926119*valG*amountB*cvda)-(2.19807886050366*valG*amountB*cvdb)-(0.0149187902480011*valG*amountB*cvdc)+5.6790429124849*valG*amountB*cvdd+3.5438994281586*valG*amountB*cvde+0.024053137118381*valG*amountB*cvdf-(5.0792455801626*valG*amountB*cvdg)-(3.1696072356564*valG*amountB*cvdh)-(0.021512742953394*valG*amountB*cvdi)+valH+0.44597620863935*valH*cvda+0.2783030266059*valH*cvdb+0.0018888969608515*valH*cvdc-(2.35071041825826*valH*cvdd)-(1.46691642155364*valH*cvde)-(0.0099562480663194*valH*cvdf)+4.9440689947988*valH*cvdg+3.0852528416232*valH*cvdh+0.020940213216772*valH*cvdi+valH*amountB+0.44597620863935*valH*amountB*cvda+0.2783030266059*valH*amountB*cvdb+0.0018888969608515*valH*amountB*cvdc-(2.35071041825826*valH*amountB*cvdd)-(1.46691642155364*valH*amountB*cvde)-(0.0099562480663194*valH*amountB*cvdf)+4.9440689947988*valH*amountB*cvdg+3.0852528416232*valH*amountB*cvdh+0.020940213216772*valH*amountB*cvdi+0.0158962980837018*valI*cvda+0.0099197844701652*valI*cvdb+6.7327513345842e-5*valI*cvdc+0.179356597011509*valI*cvdd+0.111924095552826*valI*cvde+0.00075965068189921*valI*cvdf-(30.1789116511205*valI*cvdg)-(18.832579607337*valI*cvdh)-(0.127820393544145*valI*cvdi)+0.0158962980837018*valI*amountB*cvda+0.0099197844701652*valI*amountB*cvdb+6.7327513345842e-5*valI*amountB*cvdc+0.179356597011509*valI*amountB*cvdd+0.111924095552826*valI*amountB*cvde+0.00075965068189921*valI*amountB*cvdf-(30.1789116511205*valI*amountB*cvdg)-(18.832579607337*valI*amountB*cvdh)-(0.127820393544145*valI*amountB*cvdi)),
			B3 = (-(0.333438511456865*valG*cvda)-(0.313023512252006*valG*cvdb)-(0.118752790069611*valG*cvdc)+0.53759333721415*valG*cvdd+0.50467882022026*valG*cvde+0.19146171339981*valG*cvdf-(0.4808149232271*valG*cvdg)-(0.45137670317124*valG*cvdh)-(0.17124030871794*valG*cvdi)-(0.333438511456865*valG*amountB*cvda)-(0.313023512252006*valG*amountB*cvdb)-(0.118752790069611*valG*amountB*cvdc)+0.53759333721415*valG*amountB*cvdd+0.50467882022026*valG*amountB*cvde+0.19146171339981*valG*amountB*cvdf-(0.4808149232271*valG*amountB*cvdg)-(0.45137670317124*valG*amountB*cvdh)-(0.17124030871794*valG*amountB*cvdi)+0.042217296473225*valH*cvda+0.03963251383919*valH*cvdb+0.015035521012515*valH*cvdc-(0.22252451302971*valH*cvdd)-(0.208900298667924*valH*cvde)-(0.079251213861594*valH*cvdf)+0.4680187473998*valH*cvdg+0.43936398189512*valH*cvdh+0.16668300195972*valH*cvdi+0.042217296473225*valH*amountB*cvda+0.03963251383919*valH*amountB*cvdb+0.015035521012515*valH*amountB*cvdc-(0.22252451302971*valH*amountB*cvdd)-(0.208900298667924*valH*amountB*cvde)-(0.079251213861594*valH*amountB*cvdf)+0.4680187473998*valH*amountB*cvdg+0.43936398189512*valH*amountB*cvdh+0.16668300195972*valH*amountB*cvdi+valI+0.0015047859415503*valI*cvda+0.00141265440081732*valI*cvdb+0.00053592348477042*valI*cvdc+0.0169783734732515*valI*cvdd+0.0159388610322866*valI*cvde+0.0060467796955521*valI*cvdf-(2.85681620618675*valI*cvdg)-(2.6819056947317*valI*cvdh)-(1.01744364716145*valI*cvdi)+valI*amountB+0.0015047859415503*valI*amountB*cvda+0.00141265440081732*valI*amountB*cvdb+0.00053592348477042*valI*amountB*cvdc+0.0169783734732515*valI*amountB*cvdd+0.0159388610322866*valI*amountB*cvde+0.0060467796955521*valI*amountB*cvdf-(2.85681620618675*valI*amountB*cvdg)-(2.6819056947317*valI*amountB*cvdh)-(1.01744364716145*valI*amountB*cvdi)+1)

		var colorMatrix =  [
			R1,R2,R3,0,0,
			G1,G2,G3,0,0,
			B1,B2,B3,0,0,
			0,0,0,1,0,
			0,0,0,0,0
		];

		// Example:
		try {
		    var filter = new WebGLImageFilter();
		}
		catch( err ) {
		    console.log(err);
		}

		filter.addFilter('hue', amountHue); //0 to 360
		filter.addFilter('saturation', amountSaturation); //-1 to 10 / can manipulate hue with -1 to -10...
		filter.addFilter('colorMatrix', colorMatrix); //apply the colormatrix 5x5

		if(typeof options.callback == "function") {
			options.callback(filter.apply(image));
		}
	};

})();

/**
* Use Pixi js to correct the color vision deficiency
* The values contained in color matrix comes from an algorithm
* which (convert rgb to lms and) add compensations to orinal values 
* of RGB depended on matrix of deficiency 
* and two "amount" values which refines the final render
*	TODO : TRITANOPE 
*/

if(!window.Color) Color = { };
if(!window.Color.Vision) Color.Vision = { };

(function() {

	var CVDMatrix = { // Color Vision Deficiency
		"Protanope": [ // reds are greatly reduced (1% men)
			0.0, 2.02344, -2.52581,
			0.0, 1.0,      0.0,
			0.0, 0.0,      1.0
		],
		"Deuteranope": [ // greens are greatly reduced (1% men)
			1.0,      0.0, 0.0,
			0.494207, 0.0, 1.24827,
			0.0,      0.0, 1.0
		],
		"Tritanope": [ // blues are greatly reduced (0.003% population)
			1.0,       0.0,      0.0,
			0.0,       1.0,      0.0,
			-0.395913, 0.801109, 0.0
		]
	};

	var valA = valB = valC = 0.0,
		valD = 0.7,
		valE = 1.0,
		valF = 0.0,
		valG = 0.7,
		valH = 0.0,
		valI = 1.0;

	Color.Vision.Daltonize = function(image, stage, options) {

		if(!options) options = { };
		var type = typeof options.type == "string" ? options.type : "Normal", 
			amountDalto = typeof options.amountDalto == "number" ? options.amountDalto : 0.0,
			amountTransf = typeof options.amountTransf == "number" ? options.amountTransf : 0.0;

	    // create a renderer instance.
	    var renderer = PIXI.autoDetectRenderer(image.width, image.height);

		// Apply Daltonization
		var cvd = CVDMatrix[type];

		var cvda = cvd[0],
			cvdb = cvd[1],
			cvdc = cvd[2],
			cvdd = cvd[3],
			cvde = cvd[4],
			cvdf = cvd[5],
			cvdg = cvd[6],
			cvdh = cvd[7],
			cvdi = cvd[8];

		// amountDalto = 1er slider : Left gives values : -1 ; -1 to Right 0 ; 0 / and more than enhancer : 1 ; 1
		// amountTransf = 2e slider : Left gives values : -0.5 ; 0.5 to Right 0.5 ; -0.5

		var	amountG = amountDalto+amountTransf, 
			amountB = amountDalto-amountTransf;

		var R1 = (valA-(1.44748099512696*valA*cvda)-(0.279715681385635*valA*cvdb)-(0.00242482044796114*valA*cvdc)+2.3337320435016*valA*cvdd+0.45097756096085*valA*cvde+0.0039094683786494*valA*cvdf-(2.0872527906384*valA*cvdg)-(0.4033471517229*valA*cvdh)-(0.0034965662857356*valA*cvdi)+0.1832683754604*valB*cvda+0.035415344789275*valB*cvdb+0.0003070112186461*valB*cvdc-(0.96599520599184*valB*cvdd)-(0.18667188596529*valB*cvde)-(0.00161823535922556*valB*cvdf)+2.0317036543392*valB*cvdg+0.3926126657002*valB*cvdh+0.0034035103616728*valB*cvdi+0.0065323859640912*valC*cvda+0.0012623383637997*valC*cvdb+1.09430542528908e-5*valC*cvdc+0.073704362532456*valC*cvdd+0.0142428578034985*valC*cvde+0.000123469562622454*valC*cvdf-(12.401648348772*valC*cvdg)-(2.39653268668825*valC*cvdh)-(0.020775243755023*valC*cvdi)+1)  ,
			R2 = (-(3.52238668926119*valA*cvda)-(2.19807886050366*valA*cvdb)-(0.0149187902480011*valA*cvdc)+5.6790429124849*valA*cvdd+3.5438994281586*valA*cvde+0.024053137118381*valA*cvdf-(5.0792455801626*valA*cvdg)-(3.1696072356564*valA*cvdh)-(0.021512742953394*valA*cvdi)+valB+0.44597620863935*valB*cvda+0.2783030266059*valB*cvdb+0.0018888969608515*valB*cvdc-(2.35071041825826*valB*cvdd)-(1.46691642155364*valB*cvde)-(0.0099562480663194*valB*cvdf)+4.9440689947988*valB*cvdg+3.0852528416232*valB*cvdh+0.020940213216772*valB*cvdi+0.0158962980837018*valC*cvda+0.0099197844701652*valC*cvdb+6.7327513345842e-5*valC*cvdc+0.179356597011509*valC*cvdd+0.111924095552826*valC*cvde+0.00075965068189921*valC*cvdf-(30.1789116511205*valC*cvdg)-(18.832579607337*valC*cvdh)-(0.127820393544145*valC*cvdi)),
			R3 = (-(0.333438511456865*valA*cvda)-(0.313023512252006*valA*cvdb)-(0.118752790069611*valA*cvdc)+0.53759333721415*valA*cvdd+0.50467882022026*valA*cvde+0.19146171339981*valA*cvdf-(0.4808149232271*valA*cvdg)-(0.45137670317124*valA*cvdh)-(0.17124030871794*valA*cvdi)+0.042217296473225*valB*cvda+0.03963251383919*valB*cvdb+0.015035521012515*valB*cvdc-(0.22252451302971*valB*cvdd)-(0.208900298667924*valB*cvde)-(0.079251213861594*valB*cvdf)+0.4680187473998*valB*cvdg+0.43936398189512*valB*cvdh+0.16668300195972*valB*cvdi+valC+0.0015047859415503*valC*cvda+0.00141265440081732*valC*cvdb+0.00053592348477042*valC*cvdc+0.0169783734732515*valC*cvdd+0.0159388610322866*valC*cvde+0.0060467796955521*valC*cvdf-(2.85681620618675*valC*cvdg)-(2.6819056947317*valC*cvdh)-(1.01744364716145*valC*cvdi)),
			G1 = (valD-(1.44748099512696*valD*cvda)-(0.279715681385635*valD*cvdb)-(0.00242482044796114*valD*cvdc)+2.3337320435016*valD*cvdd+0.45097756096085*valD*cvde+0.0039094683786494*valD*cvdf-(2.0872527906384*valD*cvdg)-(0.4033471517229*valD*cvdh)-(0.0034965662857356*valD*cvdi)+valD*amountG-(1.44748099512696*valD*amountG*cvda)-(0.279715681385635*valD*amountG*cvdb)-(0.00242482044796114*valD*amountG*cvdc)+2.3337320435016*valD*amountG*cvdd+0.45097756096085*valD*amountG*cvde+0.0039094683786494*valD*amountG*cvdf-(2.0872527906384*valD*amountG*cvdg)-(0.4033471517229*valD*amountG*cvdh)-(0.0034965662857356*valD*amountG*cvdi)+0.1832683754604*valE*cvda+0.035415344789275*valE*cvdb+0.0003070112186461*valE*cvdc-(0.96599520599184*valE*cvdd)-(0.18667188596529*valE*cvde)-(0.00161823535922556*valE*cvdf)+2.0317036543392*valE*cvdg+0.3926126657002*valE*cvdh+0.0034035103616728*valE*cvdi+0.1832683754604*valE*amountG*cvda+0.035415344789275*valE*amountG*cvdb+0.0003070112186461*valE*amountG*cvdc-(0.96599520599184*valE*amountG*cvdd)-(0.18667188596529*valE*amountG*cvde)-(0.00161823535922556*valE*amountG*cvdf)+2.0317036543392*valE*amountG*cvdg+0.3926126657002*valE*amountG*cvdh+0.0034035103616728*valE*amountG*cvdi+0.0065323859640912*valF*cvda+0.0012623383637997*valF*cvdb+1.09430542528908e-5*valF*cvdc+0.073704362532456*valF*cvdd+0.0142428578034985*valF*cvde+0.000123469562622454*valF*cvdf-(12.401648348772*valF*cvdg)-(2.39653268668825*valF*cvdh)-(0.020775243755023*valF*cvdi)+0.0065323859640912*valF*amountG*cvda+0.0012623383637997*valF*amountG*cvdb+1.09430542528908e-5*valF*amountG*cvdc+0.073704362532456*valF*amountG*cvdd+0.0142428578034985*valF*amountG*cvde+0.000123469562622454*valF*amountG*cvdf-(12.401648348772*valF*amountG*cvdg)-(2.39653268668825*valF*amountG*cvdh)-(0.020775243755023*valF*amountG*cvdi)),
			G2 = (-(3.52238668926119*valD*cvda)-(2.19807886050366*valD*cvdb)-(0.0149187902480011*valD*cvdc)+5.6790429124849*valD*cvdd+3.5438994281586*valD*cvde+0.024053137118381*valD*cvdf-(5.0792455801626*valD*cvdg)-(3.1696072356564*valD*cvdh)-(0.021512742953394*valD*cvdi)-(3.52238668926119*valD*amountG*cvda)-(2.19807886050366*valD*amountG*cvdb)-(0.0149187902480011*valD*amountG*cvdc)+5.6790429124849*valD*amountG*cvdd+3.5438994281586*valD*amountG*cvde+0.024053137118381*valD*amountG*cvdf-(5.0792455801626*valD*amountG*cvdg)-(3.1696072356564*valD*amountG*cvdh)-(0.021512742953394*valD*amountG*cvdi)+valE+0.44597620863935*valE*cvda+0.2783030266059*valE*cvdb+0.0018888969608515*valE*cvdc-(2.35071041825826*valE*cvdd)-(1.46691642155364*valE*cvde)-(0.0099562480663194*valE*cvdf)+4.9440689947988*valE*cvdg+3.0852528416232*valE*cvdh+0.020940213216772*valE*cvdi+valE*amountG+0.44597620863935*valE*amountG*cvda+0.2783030266059*valE*amountG*cvdb+0.0018888969608515*valE*amountG*cvdc-(2.35071041825826*valE*amountG*cvdd)-(1.46691642155364*valE*amountG*cvde)-(0.0099562480663194*valE*amountG*cvdf)+4.9440689947988*valE*amountG*cvdg+3.0852528416232*valE*amountG*cvdh+0.020940213216772*valE*amountG*cvdi+0.0158962980837018*valF*cvda+0.0099197844701652*valF*cvdb+6.7327513345842e-5*valF*cvdc+0.179356597011509*valF*cvdd+0.111924095552826*valF*cvde+0.00075965068189921*valF*cvdf-(30.1789116511205*valF*cvdg)-(18.832579607337*valF*cvdh)-(0.127820393544145*valF*cvdi)+0.0158962980837018*valF*amountG*cvda+0.0099197844701652*valF*amountG*cvdb+6.7327513345842e-5*valF*amountG*cvdc+0.179356597011509*valF*amountG*cvdd+0.111924095552826*valF*amountG*cvde+0.00075965068189921*valF*amountG*cvdf-(30.1789116511205*valF*amountG*cvdg)-(18.832579607337*valF*amountG*cvdh)-(0.127820393544145*valF*amountG*cvdi)+1),
			G3 = (-(0.333438511456865*valD*cvda)-(0.313023512252006*valD*cvdb)-(0.118752790069611*valD*cvdc)+0.53759333721415*valD*cvdd+0.50467882022026*valD*cvde+0.19146171339981*valD*cvdf-(0.4808149232271*valD*cvdg)-(0.45137670317124*valD*cvdh)-(0.17124030871794*valD*cvdi)-(0.333438511456865*valD*amountG*cvda)-(0.313023512252006*valD*amountG*cvdb)-(0.118752790069611*valD*amountG*cvdc)+0.53759333721415*valD*amountG*cvdd+0.50467882022026*valD*amountG*cvde+0.19146171339981*valD*amountG*cvdf-(0.4808149232271*valD*amountG*cvdg)-(0.45137670317124*valD*amountG*cvdh)-(0.17124030871794*valD*amountG*cvdi)+0.042217296473225*valE*cvda+0.03963251383919*valE*cvdb+0.015035521012515*valE*cvdc-(0.22252451302971*valE*cvdd)-(0.208900298667924*valE*cvde)-(0.079251213861594*valE*cvdf)+0.4680187473998*valE*cvdg+0.43936398189512*valE*cvdh+0.16668300195972*valE*cvdi+0.042217296473225*valE*amountG*cvda+0.03963251383919*valE*amountG*cvdb+0.015035521012515*valE*amountG*cvdc-(0.22252451302971*valE*amountG*cvdd)-(0.208900298667924*valE*amountG*cvde)-(0.079251213861594*valE*amountG*cvdf)+0.4680187473998*valE*amountG*cvdg+0.43936398189512*valE*amountG*cvdh+0.16668300195972*valE*amountG*cvdi+valF+0.0015047859415503*valF*cvda+0.00141265440081732*valF*cvdb+0.00053592348477042*valF*cvdc+0.0169783734732515*valF*cvdd+0.0159388610322866*valF*cvde+0.0060467796955521*valF*cvdf-(2.85681620618675*valF*cvdg)-(2.6819056947317*valF*cvdh)-(1.01744364716145*valF*cvdi)+valF*amountG+0.0015047859415503*valF*amountG*cvda+0.00141265440081732*valF*amountG*cvdb+0.00053592348477042*valF*amountG*cvdc+0.0169783734732515*valF*amountG*cvdd+0.0159388610322866*valF*amountG*cvde+0.0060467796955521*valF*amountG*cvdf-(2.85681620618675*valF*amountG*cvdg)-(2.6819056947317*valF*amountG*cvdh)-(1.01744364716145*valF*amountG*cvdi)),
			B1 = (valG-(1.44748099512696*valG*cvda)-(0.279715681385635*valG*cvdb)-(0.00242482044796114*valG*cvdc)+2.3337320435016*valG*cvdd+0.45097756096085*valG*cvde+0.0039094683786494*valG*cvdf-(2.0872527906384*valG*cvdg)-(0.4033471517229*valG*cvdh)-(0.0034965662857356*valG*cvdi)+valG*amountB-(1.44748099512696*valG*amountB*cvda)-(0.279715681385635*valG*amountB*cvdb)-(0.00242482044796114*valG*amountB*cvdc)+2.3337320435016*valG*amountB*cvdd+0.45097756096085*valG*amountB*cvde+0.0039094683786494*valG*amountB*cvdf-(2.0872527906384*valG*amountB*cvdg)-(0.4033471517229*valG*amountB*cvdh)-(0.0034965662857356*valG*amountB*cvdi)+0.1832683754604*valH*cvda+0.035415344789275*valH*cvdb+0.0003070112186461*valH*cvdc-(0.96599520599184*valH*cvdd)-(0.18667188596529*valH*cvde)-(0.00161823535922556*valH*cvdf)+2.0317036543392*valH*cvdg+0.3926126657002*valH*cvdh+0.0034035103616728*valH*cvdi+0.1832683754604*valH*amountB*cvda+0.035415344789275*valH*amountB*cvdb+0.0003070112186461*valH*amountB*cvdc-(0.96599520599184*valH*amountB*cvdd)-(0.18667188596529*valH*amountB*cvde)-(0.00161823535922556*valH*amountB*cvdf)+2.0317036543392*valH*amountB*cvdg+0.3926126657002*valH*amountB*cvdh+0.0034035103616728*valH*amountB*cvdi+0.0065323859640912*valI*cvda+0.0012623383637997*valI*cvdb+1.09430542528908e-5*valI*cvdc+0.073704362532456*valI*cvdd+0.0142428578034985*valI*cvde+0.000123469562622454*valI*cvdf-(12.401648348772*valI*cvdg)-(2.39653268668825*valI*cvdh)-(0.020775243755023*valI*cvdi)+0.0065323859640912*valI*amountB*cvda+0.0012623383637997*valI*amountB*cvdb+1.09430542528908e-5*valI*amountB*cvdc+0.073704362532456*valI*amountB*cvdd+0.0142428578034985*valI*amountB*cvde+0.000123469562622454*valI*amountB*cvdf-(12.401648348772*valI*amountB*cvdg)-(2.39653268668825*valI*amountB*cvdh)-(0.020775243755023*valI*amountB*cvdi)),
			B2 = (-(3.52238668926119*valG*cvda)-(2.19807886050366*valG*cvdb)-(0.0149187902480011*valG*cvdc)+5.6790429124849*valG*cvdd+3.5438994281586*valG*cvde+0.024053137118381*valG*cvdf-(5.0792455801626*valG*cvdg)-(3.1696072356564*valG*cvdh)-(0.021512742953394*valG*cvdi)-(3.52238668926119*valG*amountB*cvda)-(2.19807886050366*valG*amountB*cvdb)-(0.0149187902480011*valG*amountB*cvdc)+5.6790429124849*valG*amountB*cvdd+3.5438994281586*valG*amountB*cvde+0.024053137118381*valG*amountB*cvdf-(5.0792455801626*valG*amountB*cvdg)-(3.1696072356564*valG*amountB*cvdh)-(0.021512742953394*valG*amountB*cvdi)+valH+0.44597620863935*valH*cvda+0.2783030266059*valH*cvdb+0.0018888969608515*valH*cvdc-(2.35071041825826*valH*cvdd)-(1.46691642155364*valH*cvde)-(0.0099562480663194*valH*cvdf)+4.9440689947988*valH*cvdg+3.0852528416232*valH*cvdh+0.020940213216772*valH*cvdi+valH*amountB+0.44597620863935*valH*amountB*cvda+0.2783030266059*valH*amountB*cvdb+0.0018888969608515*valH*amountB*cvdc-(2.35071041825826*valH*amountB*cvdd)-(1.46691642155364*valH*amountB*cvde)-(0.0099562480663194*valH*amountB*cvdf)+4.9440689947988*valH*amountB*cvdg+3.0852528416232*valH*amountB*cvdh+0.020940213216772*valH*amountB*cvdi+0.0158962980837018*valI*cvda+0.0099197844701652*valI*cvdb+6.7327513345842e-5*valI*cvdc+0.179356597011509*valI*cvdd+0.111924095552826*valI*cvde+0.00075965068189921*valI*cvdf-(30.1789116511205*valI*cvdg)-(18.832579607337*valI*cvdh)-(0.127820393544145*valI*cvdi)+0.0158962980837018*valI*amountB*cvda+0.0099197844701652*valI*amountB*cvdb+6.7327513345842e-5*valI*amountB*cvdc+0.179356597011509*valI*amountB*cvdd+0.111924095552826*valI*amountB*cvde+0.00075965068189921*valI*amountB*cvdf-(30.1789116511205*valI*amountB*cvdg)-(18.832579607337*valI*amountB*cvdh)-(0.127820393544145*valI*amountB*cvdi)),
			B3 = (-(0.333438511456865*valG*cvda)-(0.313023512252006*valG*cvdb)-(0.118752790069611*valG*cvdc)+0.53759333721415*valG*cvdd+0.50467882022026*valG*cvde+0.19146171339981*valG*cvdf-(0.4808149232271*valG*cvdg)-(0.45137670317124*valG*cvdh)-(0.17124030871794*valG*cvdi)-(0.333438511456865*valG*amountB*cvda)-(0.313023512252006*valG*amountB*cvdb)-(0.118752790069611*valG*amountB*cvdc)+0.53759333721415*valG*amountB*cvdd+0.50467882022026*valG*amountB*cvde+0.19146171339981*valG*amountB*cvdf-(0.4808149232271*valG*amountB*cvdg)-(0.45137670317124*valG*amountB*cvdh)-(0.17124030871794*valG*amountB*cvdi)+0.042217296473225*valH*cvda+0.03963251383919*valH*cvdb+0.015035521012515*valH*cvdc-(0.22252451302971*valH*cvdd)-(0.208900298667924*valH*cvde)-(0.079251213861594*valH*cvdf)+0.4680187473998*valH*cvdg+0.43936398189512*valH*cvdh+0.16668300195972*valH*cvdi+0.042217296473225*valH*amountB*cvda+0.03963251383919*valH*amountB*cvdb+0.015035521012515*valH*amountB*cvdc-(0.22252451302971*valH*amountB*cvdd)-(0.208900298667924*valH*amountB*cvde)-(0.079251213861594*valH*amountB*cvdf)+0.4680187473998*valH*amountB*cvdg+0.43936398189512*valH*amountB*cvdh+0.16668300195972*valH*amountB*cvdi+valI+0.0015047859415503*valI*cvda+0.00141265440081732*valI*cvdb+0.00053592348477042*valI*cvdc+0.0169783734732515*valI*cvdd+0.0159388610322866*valI*cvde+0.0060467796955521*valI*cvdf-(2.85681620618675*valI*cvdg)-(2.6819056947317*valI*cvdh)-(1.01744364716145*valI*cvdi)+valI*amountB+0.0015047859415503*valI*amountB*cvda+0.00141265440081732*valI*amountB*cvdb+0.00053592348477042*valI*amountB*cvdc+0.0169783734732515*valI*amountB*cvdd+0.0159388610322866*valI*amountB*cvde+0.0060467796955521*valI*amountB*cvdf-(2.85681620618675*valI*amountB*cvdg)-(2.6819056947317*valI*amountB*cvdh)-(1.01744364716145*valI*amountB*cvdi)+1)

		var colorMatrix =  [
			R1,R2,R3,0,
			G1,G2,G3,0,
			B1,B2,B3,0,
			0,0,0,1
		];

		var filter = new PIXI.ColorMatrixFilter();
		
		filter.matrix = colorMatrix;
 
		stage.filters = [filter];

		// render the stage   
		renderer.render(stage);

		if(typeof options.callback == "function") {
			options.callback(renderer.view);
		}
	};

})();



/* Algo without PIXI js */

if(!window.Color) Color = { };
if(!window.Color.Vision) Color.Vision = { };

(function() {

/*
  Color.Vision.Daltonize : v0.1
  ------------------------------
  "Analysis of Color Blindness" by Onur Fidaner, Poliang Lin and Nevran Ozguven.
  http://scien.stanford.edu/class/psych221/projects/05/ofidaner/project_report.pdf
  
  "Digital Video Colourmaps for Checking the Legibility of Displays by Dichromats" by FranÃ§oise ViÃ©not, Hans Brettel and John D. Mollon
  http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf

*/

var CVDMatrix = { // Color Vision Deficiency
  "Protanope": [ // reds are greatly reduced (1% men)
    0.0, 2.02344, -2.52581,
    0.0, 1.0,      0.0,
    0.0, 0.0,      1.0
  ],
  "Deuteranope": [ // greens are greatly reduced (1% men)
    1.0,      0.0, 0.0,
    0.494207, 0.0, 1.24827,
    0.0,      0.0, 1.0
  ],
  "Tritanope": [ // blues are greatly reduced (0.003% population)
    1.0,       0.0,      0.0,
    0.0,       1.0,      0.0,
    -0.395913, 0.801109, 0.0
  ]
};

var valA = valB = valC = 0.0,
	valD = 0.7,
	valE = 1.0,
	valF = 0.0,
	valG = 0.7,
	valH = 0.0,
	valI = 1.0;

Color.Vision.Daltonizing = function(image, options) {
  	if(!options) options = { };
  	var type = typeof options.type == "string" ? options.type : "Normal", 
		amountDalto = typeof options.amountDalto == "number" ? options.amountDalto : 0.0,
		amountTransf = typeof options.amountTransf == "number" ? options.amountTransf : 0.0,
	    canvas = document.createElement("canvas"),
	    ctx = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  try {
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
      data = imageData.data;    
  } catch(e) { }

  // Apply Daltonization
  var cvd = CVDMatrix[type];

  $.each(cvd, function( index, value ) {
      cvd[index] = value*1;
  });

  var cvda = cvd[0],
      cvdb = cvd[1],
      cvdc = cvd[2],
      cvdd = cvd[3],
      cvde = cvd[4],
      cvdf = cvd[5],
      cvdg = cvd[6],
      cvdh = cvd[7],
      cvdi = cvd[8];

	// amountDalto = 1st slider : -1 to 0
	// amountTransf = 2d slider : -0.5 to Right 0.5

	var	amountG = amountDalto+amountTransf, 
		amountB = amountDalto-amountTransf;

	//with 1st slider (and 2d = 0) : amountG and amount B from -1 to 1
	//with 2d slider (and 1st = 0) : amountG from -1.5 to -0.5 and amount B from -0.5 to -1.5

    /*  
    Final value for daltonize correction, contains :
     RGB to LMS matrix conversion
     Simulate color blindness
     LMS to RGB matrix conversion
     Isolate invisible colors to color vision deficiency (calculate error matrix)
     Shift colors towards visible spectrum (apply error modifications)
    */
	var R1 = (valA-(1.44748099512696*valA*cvda)-(0.279715681385635*valA*cvdb)-(0.00242482044796114*valA*cvdc)+2.3337320435016*valA*cvdd+0.45097756096085*valA*cvde+0.0039094683786494*valA*cvdf-(2.0872527906384*valA*cvdg)-(0.4033471517229*valA*cvdh)-(0.0034965662857356*valA*cvdi)+0.1832683754604*valB*cvda+0.035415344789275*valB*cvdb+0.0003070112186461*valB*cvdc-(0.96599520599184*valB*cvdd)-(0.18667188596529*valB*cvde)-(0.00161823535922556*valB*cvdf)+2.0317036543392*valB*cvdg+0.3926126657002*valB*cvdh+0.0034035103616728*valB*cvdi+0.0065323859640912*valC*cvda+0.0012623383637997*valC*cvdb+1.09430542528908e-5*valC*cvdc+0.073704362532456*valC*cvdd+0.0142428578034985*valC*cvde+0.000123469562622454*valC*cvdf-(12.401648348772*valC*cvdg)-(2.39653268668825*valC*cvdh)-(0.020775243755023*valC*cvdi)+1)  ,
		R2 = (-(3.52238668926119*valA*cvda)-(2.19807886050366*valA*cvdb)-(0.0149187902480011*valA*cvdc)+5.6790429124849*valA*cvdd+3.5438994281586*valA*cvde+0.024053137118381*valA*cvdf-(5.0792455801626*valA*cvdg)-(3.1696072356564*valA*cvdh)-(0.021512742953394*valA*cvdi)+valB+0.44597620863935*valB*cvda+0.2783030266059*valB*cvdb+0.0018888969608515*valB*cvdc-(2.35071041825826*valB*cvdd)-(1.46691642155364*valB*cvde)-(0.0099562480663194*valB*cvdf)+4.9440689947988*valB*cvdg+3.0852528416232*valB*cvdh+0.020940213216772*valB*cvdi+0.0158962980837018*valC*cvda+0.0099197844701652*valC*cvdb+6.7327513345842e-5*valC*cvdc+0.179356597011509*valC*cvdd+0.111924095552826*valC*cvde+0.00075965068189921*valC*cvdf-(30.1789116511205*valC*cvdg)-(18.832579607337*valC*cvdh)-(0.127820393544145*valC*cvdi)),
		R3 = (-(0.333438511456865*valA*cvda)-(0.313023512252006*valA*cvdb)-(0.118752790069611*valA*cvdc)+0.53759333721415*valA*cvdd+0.50467882022026*valA*cvde+0.19146171339981*valA*cvdf-(0.4808149232271*valA*cvdg)-(0.45137670317124*valA*cvdh)-(0.17124030871794*valA*cvdi)+0.042217296473225*valB*cvda+0.03963251383919*valB*cvdb+0.015035521012515*valB*cvdc-(0.22252451302971*valB*cvdd)-(0.208900298667924*valB*cvde)-(0.079251213861594*valB*cvdf)+0.4680187473998*valB*cvdg+0.43936398189512*valB*cvdh+0.16668300195972*valB*cvdi+valC+0.0015047859415503*valC*cvda+0.00141265440081732*valC*cvdb+0.00053592348477042*valC*cvdc+0.0169783734732515*valC*cvdd+0.0159388610322866*valC*cvde+0.0060467796955521*valC*cvdf-(2.85681620618675*valC*cvdg)-(2.6819056947317*valC*cvdh)-(1.01744364716145*valC*cvdi)),
		G1 = (valD-(1.44748099512696*valD*cvda)-(0.279715681385635*valD*cvdb)-(0.00242482044796114*valD*cvdc)+2.3337320435016*valD*cvdd+0.45097756096085*valD*cvde+0.0039094683786494*valD*cvdf-(2.0872527906384*valD*cvdg)-(0.4033471517229*valD*cvdh)-(0.0034965662857356*valD*cvdi)+valD*amountG-(1.44748099512696*valD*amountG*cvda)-(0.279715681385635*valD*amountG*cvdb)-(0.00242482044796114*valD*amountG*cvdc)+2.3337320435016*valD*amountG*cvdd+0.45097756096085*valD*amountG*cvde+0.0039094683786494*valD*amountG*cvdf-(2.0872527906384*valD*amountG*cvdg)-(0.4033471517229*valD*amountG*cvdh)-(0.0034965662857356*valD*amountG*cvdi)+0.1832683754604*valE*cvda+0.035415344789275*valE*cvdb+0.0003070112186461*valE*cvdc-(0.96599520599184*valE*cvdd)-(0.18667188596529*valE*cvde)-(0.00161823535922556*valE*cvdf)+2.0317036543392*valE*cvdg+0.3926126657002*valE*cvdh+0.0034035103616728*valE*cvdi+0.1832683754604*valE*amountG*cvda+0.035415344789275*valE*amountG*cvdb+0.0003070112186461*valE*amountG*cvdc-(0.96599520599184*valE*amountG*cvdd)-(0.18667188596529*valE*amountG*cvde)-(0.00161823535922556*valE*amountG*cvdf)+2.0317036543392*valE*amountG*cvdg+0.3926126657002*valE*amountG*cvdh+0.0034035103616728*valE*amountG*cvdi+0.0065323859640912*valF*cvda+0.0012623383637997*valF*cvdb+1.09430542528908e-5*valF*cvdc+0.073704362532456*valF*cvdd+0.0142428578034985*valF*cvde+0.000123469562622454*valF*cvdf-(12.401648348772*valF*cvdg)-(2.39653268668825*valF*cvdh)-(0.020775243755023*valF*cvdi)+0.0065323859640912*valF*amountG*cvda+0.0012623383637997*valF*amountG*cvdb+1.09430542528908e-5*valF*amountG*cvdc+0.073704362532456*valF*amountG*cvdd+0.0142428578034985*valF*amountG*cvde+0.000123469562622454*valF*amountG*cvdf-(12.401648348772*valF*amountG*cvdg)-(2.39653268668825*valF*amountG*cvdh)-(0.020775243755023*valF*amountG*cvdi)),
		G2 = (-(3.52238668926119*valD*cvda)-(2.19807886050366*valD*cvdb)-(0.0149187902480011*valD*cvdc)+5.6790429124849*valD*cvdd+3.5438994281586*valD*cvde+0.024053137118381*valD*cvdf-(5.0792455801626*valD*cvdg)-(3.1696072356564*valD*cvdh)-(0.021512742953394*valD*cvdi)-(3.52238668926119*valD*amountG*cvda)-(2.19807886050366*valD*amountG*cvdb)-(0.0149187902480011*valD*amountG*cvdc)+5.6790429124849*valD*amountG*cvdd+3.5438994281586*valD*amountG*cvde+0.024053137118381*valD*amountG*cvdf-(5.0792455801626*valD*amountG*cvdg)-(3.1696072356564*valD*amountG*cvdh)-(0.021512742953394*valD*amountG*cvdi)+valE+0.44597620863935*valE*cvda+0.2783030266059*valE*cvdb+0.0018888969608515*valE*cvdc-(2.35071041825826*valE*cvdd)-(1.46691642155364*valE*cvde)-(0.0099562480663194*valE*cvdf)+4.9440689947988*valE*cvdg+3.0852528416232*valE*cvdh+0.020940213216772*valE*cvdi+valE*amountG+0.44597620863935*valE*amountG*cvda+0.2783030266059*valE*amountG*cvdb+0.0018888969608515*valE*amountG*cvdc-(2.35071041825826*valE*amountG*cvdd)-(1.46691642155364*valE*amountG*cvde)-(0.0099562480663194*valE*amountG*cvdf)+4.9440689947988*valE*amountG*cvdg+3.0852528416232*valE*amountG*cvdh+0.020940213216772*valE*amountG*cvdi+0.0158962980837018*valF*cvda+0.0099197844701652*valF*cvdb+6.7327513345842e-5*valF*cvdc+0.179356597011509*valF*cvdd+0.111924095552826*valF*cvde+0.00075965068189921*valF*cvdf-(30.1789116511205*valF*cvdg)-(18.832579607337*valF*cvdh)-(0.127820393544145*valF*cvdi)+0.0158962980837018*valF*amountG*cvda+0.0099197844701652*valF*amountG*cvdb+6.7327513345842e-5*valF*amountG*cvdc+0.179356597011509*valF*amountG*cvdd+0.111924095552826*valF*amountG*cvde+0.00075965068189921*valF*amountG*cvdf-(30.1789116511205*valF*amountG*cvdg)-(18.832579607337*valF*amountG*cvdh)-(0.127820393544145*valF*amountG*cvdi)+1),
		G3 = (-(0.333438511456865*valD*cvda)-(0.313023512252006*valD*cvdb)-(0.118752790069611*valD*cvdc)+0.53759333721415*valD*cvdd+0.50467882022026*valD*cvde+0.19146171339981*valD*cvdf-(0.4808149232271*valD*cvdg)-(0.45137670317124*valD*cvdh)-(0.17124030871794*valD*cvdi)-(0.333438511456865*valD*amountG*cvda)-(0.313023512252006*valD*amountG*cvdb)-(0.118752790069611*valD*amountG*cvdc)+0.53759333721415*valD*amountG*cvdd+0.50467882022026*valD*amountG*cvde+0.19146171339981*valD*amountG*cvdf-(0.4808149232271*valD*amountG*cvdg)-(0.45137670317124*valD*amountG*cvdh)-(0.17124030871794*valD*amountG*cvdi)+0.042217296473225*valE*cvda+0.03963251383919*valE*cvdb+0.015035521012515*valE*cvdc-(0.22252451302971*valE*cvdd)-(0.208900298667924*valE*cvde)-(0.079251213861594*valE*cvdf)+0.4680187473998*valE*cvdg+0.43936398189512*valE*cvdh+0.16668300195972*valE*cvdi+0.042217296473225*valE*amountG*cvda+0.03963251383919*valE*amountG*cvdb+0.015035521012515*valE*amountG*cvdc-(0.22252451302971*valE*amountG*cvdd)-(0.208900298667924*valE*amountG*cvde)-(0.079251213861594*valE*amountG*cvdf)+0.4680187473998*valE*amountG*cvdg+0.43936398189512*valE*amountG*cvdh+0.16668300195972*valE*amountG*cvdi+valF+0.0015047859415503*valF*cvda+0.00141265440081732*valF*cvdb+0.00053592348477042*valF*cvdc+0.0169783734732515*valF*cvdd+0.0159388610322866*valF*cvde+0.0060467796955521*valF*cvdf-(2.85681620618675*valF*cvdg)-(2.6819056947317*valF*cvdh)-(1.01744364716145*valF*cvdi)+valF*amountG+0.0015047859415503*valF*amountG*cvda+0.00141265440081732*valF*amountG*cvdb+0.00053592348477042*valF*amountG*cvdc+0.0169783734732515*valF*amountG*cvdd+0.0159388610322866*valF*amountG*cvde+0.0060467796955521*valF*amountG*cvdf-(2.85681620618675*valF*amountG*cvdg)-(2.6819056947317*valF*amountG*cvdh)-(1.01744364716145*valF*amountG*cvdi)),
		B1 = (valG-(1.44748099512696*valG*cvda)-(0.279715681385635*valG*cvdb)-(0.00242482044796114*valG*cvdc)+2.3337320435016*valG*cvdd+0.45097756096085*valG*cvde+0.0039094683786494*valG*cvdf-(2.0872527906384*valG*cvdg)-(0.4033471517229*valG*cvdh)-(0.0034965662857356*valG*cvdi)+valG*amountB-(1.44748099512696*valG*amountB*cvda)-(0.279715681385635*valG*amountB*cvdb)-(0.00242482044796114*valG*amountB*cvdc)+2.3337320435016*valG*amountB*cvdd+0.45097756096085*valG*amountB*cvde+0.0039094683786494*valG*amountB*cvdf-(2.0872527906384*valG*amountB*cvdg)-(0.4033471517229*valG*amountB*cvdh)-(0.0034965662857356*valG*amountB*cvdi)+0.1832683754604*valH*cvda+0.035415344789275*valH*cvdb+0.0003070112186461*valH*cvdc-(0.96599520599184*valH*cvdd)-(0.18667188596529*valH*cvde)-(0.00161823535922556*valH*cvdf)+2.0317036543392*valH*cvdg+0.3926126657002*valH*cvdh+0.0034035103616728*valH*cvdi+0.1832683754604*valH*amountB*cvda+0.035415344789275*valH*amountB*cvdb+0.0003070112186461*valH*amountB*cvdc-(0.96599520599184*valH*amountB*cvdd)-(0.18667188596529*valH*amountB*cvde)-(0.00161823535922556*valH*amountB*cvdf)+2.0317036543392*valH*amountB*cvdg+0.3926126657002*valH*amountB*cvdh+0.0034035103616728*valH*amountB*cvdi+0.0065323859640912*valI*cvda+0.0012623383637997*valI*cvdb+1.09430542528908e-5*valI*cvdc+0.073704362532456*valI*cvdd+0.0142428578034985*valI*cvde+0.000123469562622454*valI*cvdf-(12.401648348772*valI*cvdg)-(2.39653268668825*valI*cvdh)-(0.020775243755023*valI*cvdi)+0.0065323859640912*valI*amountB*cvda+0.0012623383637997*valI*amountB*cvdb+1.09430542528908e-5*valI*amountB*cvdc+0.073704362532456*valI*amountB*cvdd+0.0142428578034985*valI*amountB*cvde+0.000123469562622454*valI*amountB*cvdf-(12.401648348772*valI*amountB*cvdg)-(2.39653268668825*valI*amountB*cvdh)-(0.020775243755023*valI*amountB*cvdi)),
		B2 = (-(3.52238668926119*valG*cvda)-(2.19807886050366*valG*cvdb)-(0.0149187902480011*valG*cvdc)+5.6790429124849*valG*cvdd+3.5438994281586*valG*cvde+0.024053137118381*valG*cvdf-(5.0792455801626*valG*cvdg)-(3.1696072356564*valG*cvdh)-(0.021512742953394*valG*cvdi)-(3.52238668926119*valG*amountB*cvda)-(2.19807886050366*valG*amountB*cvdb)-(0.0149187902480011*valG*amountB*cvdc)+5.6790429124849*valG*amountB*cvdd+3.5438994281586*valG*amountB*cvde+0.024053137118381*valG*amountB*cvdf-(5.0792455801626*valG*amountB*cvdg)-(3.1696072356564*valG*amountB*cvdh)-(0.021512742953394*valG*amountB*cvdi)+valH+0.44597620863935*valH*cvda+0.2783030266059*valH*cvdb+0.0018888969608515*valH*cvdc-(2.35071041825826*valH*cvdd)-(1.46691642155364*valH*cvde)-(0.0099562480663194*valH*cvdf)+4.9440689947988*valH*cvdg+3.0852528416232*valH*cvdh+0.020940213216772*valH*cvdi+valH*amountB+0.44597620863935*valH*amountB*cvda+0.2783030266059*valH*amountB*cvdb+0.0018888969608515*valH*amountB*cvdc-(2.35071041825826*valH*amountB*cvdd)-(1.46691642155364*valH*amountB*cvde)-(0.0099562480663194*valH*amountB*cvdf)+4.9440689947988*valH*amountB*cvdg+3.0852528416232*valH*amountB*cvdh+0.020940213216772*valH*amountB*cvdi+0.0158962980837018*valI*cvda+0.0099197844701652*valI*cvdb+6.7327513345842e-5*valI*cvdc+0.179356597011509*valI*cvdd+0.111924095552826*valI*cvde+0.00075965068189921*valI*cvdf-(30.1789116511205*valI*cvdg)-(18.832579607337*valI*cvdh)-(0.127820393544145*valI*cvdi)+0.0158962980837018*valI*amountB*cvda+0.0099197844701652*valI*amountB*cvdb+6.7327513345842e-5*valI*amountB*cvdc+0.179356597011509*valI*amountB*cvdd+0.111924095552826*valI*amountB*cvde+0.00075965068189921*valI*amountB*cvdf-(30.1789116511205*valI*amountB*cvdg)-(18.832579607337*valI*amountB*cvdh)-(0.127820393544145*valI*amountB*cvdi)),
		B3 = (-(0.333438511456865*valG*cvda)-(0.313023512252006*valG*cvdb)-(0.118752790069611*valG*cvdc)+0.53759333721415*valG*cvdd+0.50467882022026*valG*cvde+0.19146171339981*valG*cvdf-(0.4808149232271*valG*cvdg)-(0.45137670317124*valG*cvdh)-(0.17124030871794*valG*cvdi)-(0.333438511456865*valG*amountB*cvda)-(0.313023512252006*valG*amountB*cvdb)-(0.118752790069611*valG*amountB*cvdc)+0.53759333721415*valG*amountB*cvdd+0.50467882022026*valG*amountB*cvde+0.19146171339981*valG*amountB*cvdf-(0.4808149232271*valG*amountB*cvdg)-(0.45137670317124*valG*amountB*cvdh)-(0.17124030871794*valG*amountB*cvdi)+0.042217296473225*valH*cvda+0.03963251383919*valH*cvdb+0.015035521012515*valH*cvdc-(0.22252451302971*valH*cvdd)-(0.208900298667924*valH*cvde)-(0.079251213861594*valH*cvdf)+0.4680187473998*valH*cvdg+0.43936398189512*valH*cvdh+0.16668300195972*valH*cvdi+0.042217296473225*valH*amountB*cvda+0.03963251383919*valH*amountB*cvdb+0.015035521012515*valH*amountB*cvdc-(0.22252451302971*valH*amountB*cvdd)-(0.208900298667924*valH*amountB*cvde)-(0.079251213861594*valH*amountB*cvdf)+0.4680187473998*valH*amountB*cvdg+0.43936398189512*valH*amountB*cvdh+0.16668300195972*valH*amountB*cvdi+valI+0.0015047859415503*valI*cvda+0.00141265440081732*valI*cvdb+0.00053592348477042*valI*cvdc+0.0169783734732515*valI*cvdd+0.0159388610322866*valI*cvde+0.0060467796955521*valI*cvdf-(2.85681620618675*valI*cvdg)-(2.6819056947317*valI*cvdh)-(1.01744364716145*valI*cvdi)+valI*amountB+0.0015047859415503*valI*amountB*cvda+0.00141265440081732*valI*amountB*cvdb+0.00053592348477042*valI*amountB*cvdc+0.0169783734732515*valI*amountB*cvdd+0.0159388610322866*valI*amountB*cvde+0.0060467796955521*valI*amountB*cvdf-(2.85681620618675*valI*amountB*cvdg)-(2.6819056947317*valI*amountB*cvdh)-(1.01744364716145*valI*amountB*cvdi)+1)

  for(var id = 0, length = data.length; id < length; id += 4) {
    
      var r = data[id],
          g = data[id + 1],
          b = data[id + 2];

      //  Add compensation to original values

      R = R1 * r + R2 * g + R3 * b
      G = G1 * r + G2 * g + G3 * b
      B = B1 * r + B2 * g + B3 * b

      // Clamp values
      if(R < 0) R = 0;
      if(R > 255) R = 255;
      if(G < 0) G = 0;
      if(G > 255) G = 255;
      if(B < 0) B = 0;
      if(B > 255) B = 255;
      // Record color
      data[id] = R >> 0;
      data[id + 1] = G >> 0;
      data[id + 2] = B >> 0;

  }

  // Record data
  ctx.putImageData(imageData, 0, 0);
  if(typeof options.callback == "function") {
    options.callback(canvas);
  }
};

})();





(function() {

/* 
	Color.Vision.Simulate : v0.1
	-----------------------------
	Freely available for non-commercial use by Matthew Wickline and the
	Human-Computer Interaction Resource Network ( http://hcirn.com/ ).
	
	"Color-Defective Vision and Computer Graphics Displays" by Gary W. Meyer and Donald P. Greenberg
	http://ieeexplore.ieee.org/iel1/38/408/00007759.pdf?arnumber=7759
	
	"Spectral sensitivity of the foveal cone photopigments between 400 and 500 nm" by V.C. Smith, J. Pokorny
	http://www.opticsinfobase.org/abstract.cfm?URI=josaa-22-10-2060
	
	"RGB Working Space Information" by Bruce Lindbloom
	http://www.brucelindbloom.com/WorkingSpaceInfo.html
	
*/

	var ConfusionLines = {
		"Protanope": {
			x: 0.7465,
			y: 0.2535,
			m: 1.273463,
			yint: -0.073894
		},
		"Deuteranope": {
			x: 1.4,
			y: -0.4,
			m: 0.968437,
			yint: 0.003331
		},
		"Tritanope": {
			x: 0.1748,
			y: 0.0,
			m: 0.062921,
			yint: 0.292119
		}
	};

	Color.Vision.Simulate = function(image, options) {
		if(!options) options = { };
		var type = typeof options.type == "string" ? options.type : "Normal", 
			amount = typeof options.amount == "number" ? options.amount : 1.0,
			canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");
		canvas.width = image.width;
		canvas.height = image.height;
		ctx.drawImage(image, 0, 0);
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
			data = imageData.data;
		// Apply simulation
		switch(type) {
			case "Normal":
				$('#imgContent').append(canvas);
				return;
			case "Achromatope":
				for(var id = 0, length = data.length; id < length; id += 4) {
					var sr = data[id], // source-pixel
						sg = data[id + 1],
						sb = data[id + 2],
						// convert to Monochrome using sRGB WhitePoint  
						dr = (sr * 0.212656 + sg * 0.715158 + sb * 0.072186), // destination-pixel
						dg = dr,
						db = dr;
					// Anomylize colors
					dr = sr * (1.0 - amount) + dr * amount; 
					dg = sg * (1.0 - amount) + dg * amount;
					db = sb * (1.0 - amount) + db * amount;
					// Record values
					data[id] = dr >> 0;
					data[id + 1] = dg >> 0;
					data[id + 2] = db >> 0;
				}
				// Record data
				ctx.putImageData(imageData, 0, 0);
				$('#imgContent').append(canvas);
				return;
			case "Custom":
				var confuse_x = options.x,
					confuse_y = options.y, 
					confuse_m = options.m,
					confuse_yint = options.yint;
				break;
			default:
				var line = ConfusionLines[type],
					confuse_x = line.x,
					confuse_y = line.y, 
					confuse_m = line.m,
					confuse_yint = line.yint;
				break;
		}
		// Simulate: Protanope, Deuteranope, or Tritanope
		for(var id = 0, length = data.length; id < length; id += 4) {
			var sr = data[id], // source-pixel
				sg = data[id + 1],
				sb = data[id + 2],
				dr = sr, // destination-pixel
				dg = sg,
				db = sb;
			// Convert source color into XYZ color space
			var pow_r = Math.pow(sr, 2.2),
				pow_g = Math.pow(sg, 2.2),
				pow_b = Math.pow(sb, 2.2);
			var X = pow_r * 0.412424 + pow_g * 0.357579 + pow_b * 0.180464, // RGB->XYZ (sRGB:D65)
				Y = pow_r * 0.212656 + pow_g * 0.715158 + pow_b * 0.0721856,
				Z = pow_r * 0.0193324 + pow_g * 0.119193 + pow_b * 0.950444;
			// Convert XYZ into xyY Chromacity Coordinates (xy) and Luminance (Y)
			var chroma_x = X / (X + Y + Z);
			var chroma_y = Y / (X + Y + Z);
			// Generate the â€œConfusion Line" between the source color and the Confusion Point
			var m = (chroma_y - confuse_y) / (chroma_x - confuse_x); // slope of Confusion Line
			var yint = chroma_y - chroma_x * m; // y-intercept of confusion line (x-intercept = 0.0)
			// How far the xy coords deviate from the simulation
			var deviate_x = (confuse_yint - yint) / (m - confuse_m);
			var deviate_y = (m * deviate_x) + yint;
			// Compute the simulated colorâ€™s XYZ coords
			var X = deviate_x * Y / deviate_y;
			var Z = (1.0 - (deviate_x + deviate_y)) * Y / deviate_y;
			// Neutral grey calculated from luminance (in D65)
			var neutral_X = 0.312713 * Y / 0.329016; 
			var neutral_Z = 0.358271 * Y / 0.329016; 
			// Difference between simulated color and neutral grey
			var diff_X = neutral_X - X;
			var diff_Z = neutral_Z - Z;
			diff_r = diff_X * 3.24071 + diff_Z * -0.498571; // XYZ->RGB (sRGB:D65)
			diff_g = diff_X * -0.969258 + diff_Z * 0.0415557;
			diff_b = diff_X * 0.0556352 + diff_Z * 1.05707;
			// Convert to RGB color space
			dr = X * 3.24071 + Y * -1.53726 + Z * -0.498571; // XYZ->RGB (sRGB:D65)
			dg = X * -0.969258 + Y * 1.87599 + Z * 0.0415557;
			db = X * 0.0556352 + Y * -0.203996 + Z * 1.05707;
			// Compensate simulated color towards a neutral fit in RGB space
			var fit_r = ((dr < 0.0 ? 0.0 : 1.0) - dr) / diff_r;
			var fit_g = ((dg < 0.0 ? 0.0 : 1.0) - dg) / diff_g;
			var fit_b = ((db < 0.0 ? 0.0 : 1.0) - db) / diff_b;
			var adjust = Math.max( // highest value
				(fit_r > 1.0 || fit_r < 0.0) ? 0.0 : fit_r, 
				(fit_g > 1.0 || fit_g < 0.0) ? 0.0 : fit_g, 
				(fit_b > 1.0 || fit_b < 0.0) ? 0.0 : fit_b
			);
			// Shift proportional to the greatest shift
			dr = dr + (adjust * diff_r);
			dg = dg + (adjust * diff_g);
			db = db + (adjust * diff_b);
			// Apply gamma correction
			dr = Math.pow(dr, 1.0 / 2.2);
			dg = Math.pow(dg, 1.0 / 2.2);
			db = Math.pow(db, 1.0 / 2.2);
			// Anomylize colors
			dr = sr * (1.0 - amount) + dr * amount; 
			dg = sg * (1.0 - amount) + dg * amount;
			db = sb * (1.0 - amount) + db * amount;
			// Return values
			data[id] = dr >> 0;
			data[id + 1] = dg >> 0;
			data[id + 2] = db >> 0;
		}
		// Record data
		ctx.putImageData(imageData, 0, 0);
		if(typeof options.callback == "function") {
			options.callback(canvas);
		}
	};

})();