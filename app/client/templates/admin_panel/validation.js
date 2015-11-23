function checkEmailIsValid (aString) {  
  aString = aString || '';
  return aString.length > 1;
}

function checkPasswordIsValid (aString) {  
  aString = aString || '';
  return aString.length > 7;
}

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
                  Router.go('Admin');
              }
          });
      }
   }
});