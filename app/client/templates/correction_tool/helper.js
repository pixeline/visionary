//root_url of the current application
var root_url = Meteor.settings.public.admin_panel.survey[0].root_url;

/* Use of attributes to reuse in the template Index */
Template.Index.helpers({  
    urlNext : root_url+"/select"
});

/* Use of attributes to reuse in the template Select */
Template.Select.helpers({  
    //information text to select a picture (type of correction to choose) 
    txt : "Choisissez l'image qui vous permet de voir au mieux le chiffre 96.",
    urlNext : root_url+"/adjust"
});

/* Use of attributes to reuse in the template Adjust */
Template.Adjust.helpers({  
    //information text to ajust color for a picture 
    txt : "Ajuster l'image jusqu'à ce que le chiffre soit visuellement agréable pour vous.",
    urlNext : root_url+"/choice"
});

/* Use of attributes to reuse in the template Choice */
Template.Choice.helpers({  
  //information text to ajust color for a picture 
    txt : "Jugez-vous l'image suffisamment claire pour vous?",
    urlNext : root_url+"/test4",
    urlReset : root_url+"/select"
});

/* Use of attributes to reuse in the template Test4 */
Template.Test4.helpers({  
    txt : "Ajuster l'image jusqu'à ce qu'elle soit visuellement agréable pour vous.",
    urlNext : root_url+"/test5"
});

/* Use of attributes to reuse in the template Test5 */
Template.Test5.helpers({  
    txt : "Validation de vos préférences.",
    urlNext : root_url+"/test6",
});

/* Use of attributes to reuse in the template Test6 */
Template.Test6.helpers({  
    txt : "Êtes-vous satisfait avec votre photo?",
    urlNext : root_url+"/form",
    urlReset : root_url+"/select"
});

/* Use of attributes to reuse in the template Form */
Template.Form.helpers({  
    urlNext : root_url,
});