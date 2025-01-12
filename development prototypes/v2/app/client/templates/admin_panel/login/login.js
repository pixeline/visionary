  /********************************************************************************************\
  |  Template of authentification to go on admin panel                                         |
  |   Security have to improved                                                                |
  \********************************************************************************************/

function checkEmailIsValid (aString) {  
  aString = aString || '';
  return aString.length > 1;
}

function checkPasswordIsValid (aString) {  
  aString = aString || '';
  return aString.length > 7;
}

/* Insert admin if no one exist TODO more security */
Template.Login.onRendered (function () {
      if(Meteor.users.find().fetch().length == 0) { 
            Accounts.createUser ({
                  username: "admin", 
                  password : "jenna567",
                  role : 'admin'
            }, function(error){
                  if(error){
                        throw new Meteor.Error("Erreur", "Erreur d'insertion d'un admin.");
                  }
            });
      }
});

/* Login for administrator */
Template.Login.events({  
  'submit #loginForm': function (event, template) {
      event.preventDefault();
      
      var $form = $(event.currentTarget);
      var $loginInput = $form.find('#login').eq(0);
      var $passwordInput = $form.find('#password').eq(0);
  
      var login = $loginInput.val() || '';
      var password = $passwordInput.val() || '';
  
      //trim
      login = login.replace(/^\s*|\s*$/g, '');
      password = password.replace(/^\s*|\s*$/g, '');
  
      //validate
      var isValidLogin = checkEmailIsValid(login);
      var isValidPassword = checkPasswordIsValid(password);
  
      if (!isValidLogin || !isValidPassword) {
          if (!isValidLogin) {
            sAlert.error('Login invalide');
          }
          if (!isValidPassword) {
            sAlert.error('Mot de passe invalide');
          }
      } else {
          //log with meteor account
          Meteor.loginWithPassword(login, password, function (error) {
              if (error) {
                  if(error.reason == "User not found"){
                      sAlert.error('Login invalide');
                  } else {
                      sAlert.error('La connexion à votre compte a échouée.');
                  }
                  if(error.reason == "Incorrect password"){
                      sAlert.error('Mot de passe invalide');
                  } 
              } else {
                  Router.go('Dashboard');
              }
          });
      }
   }
});