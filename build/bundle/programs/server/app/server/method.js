(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// server/method.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
//Insert, Update, Delete in MongoDB                                    //
Meteor.methods({                                                       // 2
    /* Insert Data of User and his Correction Profiles */              //
    insertUserCorrection: function (user, correction_profiles, tab_adaptation_rules) {
        //Check server-side                                            //
        check(user, {                                                  // 6
            name: String,                                              // 7
            firstname: String,                                         // 8
            email: String,                                             // 9
            age: Number,                                               // 10
            sex: Boolean });                                           // 11
        //extend the collection to add some information                //
        //true if Male, false if Female                                //
        user = _.extend(user, {                                        // 14
            createdAt: new Date()                                      // 15
        });                                                            //
        //Insert User Data and return user_id, useful for the link with his correction profile
        var user_id = User.insert(user);                               // 18
                                                                       //
        /* Loop for each correction profile */                         //
        for (i = 0; i < correction_profiles.length; i++) {             // 21
            check(correction_profiles[i], {                            // 22
                type: String,                                          // 23
                isBest: Boolean                                        // 24
            });                                                        //
            //extend the collection to add foreign key                 //
            correction_profiles[i] = _.extend(correction_profiles[i], {
                user_id: user_id                                       // 28
            });                                                        //
            //Insert each user's Correction profile and return the id for the link with each of the adaptation rules
            var correction_profile_id = Correction_profile.insert(correction_profiles[i]);
                                                                       //
            /* Loop for each adaptation rule (teinte, saturation...) of the current correction profile */
            for (j = 0; j < tab_adaptation_rules[i].length; j++) {     // 34
                check(tab_adaptation_rules[i][j], {                    // 35
                    parameter: String,                                 // 36
                    value: Number                                      // 37
                });                                                    //
                //extend the collection to add foreign key             //
                tab_adaptation_rules[i][j] = _.extend(tab_adaptation_rules[i][j], {
                    correction_profile_id: correction_profile_id       // 41
                });                                                    //
                //Insert each adaptation rule                          //
                Adaptation_rule.insert(tab_adaptation_rules[i][j]);    // 44
            }                                                          //
        }                                                              //
                                                                       //
        return {                                                       // 48
            _id: user_id                                               // 49
        };                                                             //
    }                                                                  //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=method.js.map
