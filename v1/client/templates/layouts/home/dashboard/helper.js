/* Using informations of the users in the template Profiles */
Template.Profiles.helpers({
  users: function() {
    var users = User.find({}, {sort: {createdAt: -1} });
    if(users.fetch().length==0) {
      return;
    }
    return users;
  },
  pic: function(index) {
    var pic = Picture.find({}, {sort: {fileName: 1} });
    if(pic.fetch().length==0) {
      return;
    }
    if(index >= 18) {
      index -= 18;
    }
    console.log(index);
    return pic.fetch()[index].fileName;
  },
  usersEmpty : function(users) {
    if(typeof users == 'undefined') {
      return true;
    } else return false;
  }
});  