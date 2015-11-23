/*    Init sAlert module at the startup of client application 
 *    Insert an admin user if no one exist
 */
Meteor.startup(function () { 
      
      sAlert.config({
      effect: 'stackslide',
      position: 'top-right',
      timeout: 2000,
      html: false,
      onRouteClose: true,
      stack: true
      });
      
});