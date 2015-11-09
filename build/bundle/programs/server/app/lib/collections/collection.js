(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/collection.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/* Collections stored in MongoDB + join functions client-side */       //
                                                                       //
/* Users who did the correction test */                                //
User = new Mongo.Collection('user', {                                  // 4
  //correcObj can be called in templates allowed by publish-suscribe   //
  transform: function (doc) {                                          // 6
    doc.correcObj = Correction_profile.find({                          // 7
      user_id: { $in: [doc._id] }                                      // 8
    });                                                                //
    return doc;                                                        // 10
  }                                                                    //
});                                                                    //
                                                                       //
/* correction profiles of the user */                                  //
Correction_profile = new Mongo.Collection('correction_profile', {      // 15
  //rulesObj can be called in templates allowed by publish-suscribe    //
  transform: function (doc) {                                          // 17
    doc.rulesObj = Adaptation_rule.find({                              // 18
      correction_profile_id: { $in: [doc._id] }                        // 19
    });                                                                //
    return doc;                                                        // 21
  }                                                                    //
});                                                                    //
                                                                       //
/* adaptation rules of the user's correction profiles (tsl, rgb...) */
Adaptation_rule = new Mongo.Collection('adaptation_rule');             // 26
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=collection.js.map
