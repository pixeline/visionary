/* Collections stored in MongoDB + join functions client-side */

/* Users who did the correction test */
User = new Mongo.Collection('user', {
  //correcObj can be called in templates allowed by publish-suscribe
  transform: function(doc) {
    doc.correcObj = Correction_profile.find({
      user_id: { $in: [doc._id] }
    }, {sort: {createdAt: 1} });
    return doc;
  }
});

/* correction profiles of the user */
Correction_profile = new Mongo.Collection('correction_profile', {
  transform: function(doc) {
    //rulesObj can be called in templates allowed by publish-suscribe
    doc.rulesObj = Adaptation_rule.find({
      correction_profile_id: { $in: [doc._id] }
    }); 
    //picObj can be called in templates to retrieve the picture associate
    doc.picObj = Picture.find({
      _id: { $in: [doc.picture_id] }
    });
    return doc;
  }
});

/* adaptation rules of the user's correction profiles (tsl, rgb...) */
Adaptation_rule = new Mongo.Collection('adaptation_rule');

/* Picture collection include all the picture with name and type */
Picture = new Mongo.Collection('picture', {
  //QA can be called in templates to retrieve QA linked with the picture
  transform: function(doc) {
    doc.QA = QA.find({
      _id: { $in: [doc.qa_id] }
    });
    return doc;
  }
});

/* QA collection that contain the questions and answers about a Picture */
QA = new Mongo.Collection('qa');


/* Images collections to upload a picture */
var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});