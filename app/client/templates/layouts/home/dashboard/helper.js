/* Using informations of the users in the template Profiles */
Template.Profiles.helpers({
  users: function() {
    var users = User.find({}, {sort: {createdAt: -1} });
    if(users.fetch().length==0) {
      return;
    }
    return users;
  },
  usersEmpty : function(users) {
    if(typeof users == 'undefined') {
      return true;
    } else return false;
  }
});  