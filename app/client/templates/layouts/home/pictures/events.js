
/* Events of template Pictures */
Template.Pictures.events({
  /* Submit pictures */
  'submit': function(event){
      event.preventDefault();
      alert("Images insérées");
      Meteor.call('insertPictures');
  }

});