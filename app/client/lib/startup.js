/*    
 *    Init sAlert module at the startup of client application
 */
Meteor.startup(function () { 
      
      sAlert.config({
            effect: 'stackslide',
            position: 'top-right',
            timeout: 3500,
            html: false,
            onRouteClose: true,
            stack: true
      });
      
});