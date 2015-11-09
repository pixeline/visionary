(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/publish.js                                                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
	Publish only informations of the current user if userId is an input   //
*/                                                                     //
Meteor.publish('User', function (userId) {                             // 4
	if (userId) {                                                         // 5
		return User.find({ _id: userId });                                   // 6
	}                                                                     //
	//every users                                                         //
	return User.find();                                                   // 9
});                                                                    //
                                                                       //
Meteor.publish('Correction_profile', function (userId) {               // 12
	//corrections profiles of the user only                               //
	if (userId) {                                                         // 14
		var corr_profiles = Correction_profile.find({                        // 15
			user_id: {                                                          // 16
				$in: [userId]                                                      // 17
			}                                                                   //
		});                                                                  //
		return corr_profiles;                                                // 20
	}                                                                     //
	//every correction profiles in DB                                     //
	return Correction_profile.find();                                     // 23
});                                                                    //
                                                                       //
Meteor.publish('Adaptation_rule', function (userId) {                  // 26
	//adaptation rules of the user's correction profiles only             //
	if (userId) {                                                         // 28
		var corr_profiles = Correction_profile.find({                        // 29
			user_id: {                                                          // 30
				$in: [userId]                                                      // 31
			}                                                                   //
		});                                                                  //
		var corr_profiles_id = [];                                           // 34
		var i = 0;                                                           // 35
		corr_profiles.forEach(function (doc) {                               // 36
			corr_profiles_id[i] = doc._id;                                      // 37
			i++;                                                                // 38
		});                                                                  //
		return Adaptation_rule.find({                                        // 40
			correction_profile_id: {                                            // 41
				$in: corr_profiles_id                                              // 42
			}                                                                   //
		});                                                                  //
	}                                                                     //
	//every adaptation rules in DB                                        //
	return Adaptation_rule.find();                                        // 47
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=publish.js.map
