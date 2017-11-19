(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/****************************************************************\
|  Publish data from MongoDB to an authorized suscription (lib)  |     //
\****************************************************************/     //
                                                                       //
/*******************                                                   //
* PROFILER SYSTEM *                                                    //
*******************/                                                   //
                                                                       //
/*                                                                     //
*	Publish informations of users                                        //
*/                                                                     //
Meteor.publish('user', function (currentUser, userId, form) {          // 13
  //Admin can see every users                                          //
  if (currentUser && currentUser.username === "admin") {               // 15
    if (userId) {                                                      // 16
      return user.find({ _id: userId });                               // 17
    } else {                                                           //
      return user.find();                                              // 19
    }                                                                  //
  } else {                                                             //
    if (form) {                                                        // 22
      return user.find();                                              // 23
    } else {                                                           //
      return user.find({ _id: userId });                               // 25
    }                                                                  //
  }                                                                    //
});                                                                    //
                                                                       //
Meteor.publish('correction_profile_picture', function () {             // 30
  //every correction profiles in DB                                    //
  return correction_profile_picture.find();                            // 32
});                                                                    //
                                                                       //
Meteor.publish('correction_profile_result', function () {              // 35
  //every correction profiles in DB                                    //
  return correction_profile_result.find();                             // 37
});                                                                    //
                                                                       //
Meteor.publish('filter', function () {                                 // 40
  //every filters in DB                                                //
  return filter.find();                                                // 42
});                                                                    //
                                                                       //
Meteor.publish('picture', function () {                                // 45
  //every pictures in DB                                               //
  return picture.find();                                               // 47
});                                                                    //
                                                                       //
Meteor.publish('target', function () {                                 // 50
  //every target in DB                                                 //
  return target.find();                                                // 52
});                                                                    //
                                                                       //
/***************                                                       //
* ADMIN PANEL *                                                        //
***************/                                                       //
                                                                       //
//publish of survey                                                    //
Meteor.publish('survey', function (currentUser) {                      // 61
  //Admin can see every surveys                                        //
  if (currentUser && currentUser.username === "admin") {               // 63
    return survey.find();                                              // 64
  } else {                                                             //
    return survey.find({ state: true });                               // 66
  }                                                                    //
});                                                                    //
                                                                       //
//publish of module_survey                                             //
Meteor.publish('module_survey', function () {                          // 71
  return module_survey.find();                                         // 72
});                                                                    //
                                                                       //
//publish of picture_admin                                             //
Meteor.publish('picture_admin', function () {                          // 76
  return picture_admin.find();                                         // 77
});                                                                    //
                                                                       //
//publish of picture_admin                                             //
Meteor.publish('instruction', function () {                            // 81
  return instruction.find();                                           // 82
});                                                                    //
                                                                       //
//publish of info_txt                                                  //
Meteor.publish('info_txt', function () {                               // 86
  return info_txt.find();                                              // 87
});                                                                    //
                                                                       //
//publish of sorted_color_admin                                        //
Meteor.publish('sorted_color_admin', function () {                     // 91
  return sorted_color_admin.find();                                    // 92
});                                                                    //
                                                                       //
//publish of filter_admin                                              //
Meteor.publish('filter_admin', function () {                           // 96
  return filter_admin.find();                                          // 97
});                                                                    //
                                                                       //
//publish of field_form                                                //
Meteor.publish('field_form', function () {                             // 101
  return field_form.find();                                            // 102
});                                                                    //
                                                                       //
//publish of admin                                                     //
Meteor.publish("admin", function () {                                  // 107
  return Meteor.users.find({}, { username: "admin" });                 // 108
});                                                                    //
                                                                       //
/* publish uploaded pictures */                                        //
Meteor.publish("picture_upload", function () {                         // 113
  return picture_upload.find();                                        // 114
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publish.js.map
