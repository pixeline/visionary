	/*
		Publish only informations of the current user if userId is an input
	*/
	Meteor.publish('User', function(userId){
	  if (userId) {
	    return User.find({ _id: userId });
	  }
	  //every users
	  return User.find();
	});

	Meteor.publish('Correction_profile', function(userId){
		  //corrections profiles of the user only
		  if (userId) {
		  	var corr_profiles = Correction_profile.find({
		      	user_id: {
		      		$in: [userId]
		      	}
		    });
			return corr_profiles;
		  }
		  //every correction profiles in DB
	  	return Correction_profile.find(); 
	});

	Meteor.publish('Adaptation_rule', function(userId){
		//adaptation rules of the user's correction profiles only
		if (userId) {
		  	var corr_profiles = Correction_profile.find({
		      	user_id: {
		      		$in: [userId]  
		      	}
		    });
		    var corr_profiles_id = [];
		    var i = 0;
			corr_profiles.forEach(function(doc){
			  corr_profiles_id[i] = doc._id;
			  i++;
			});
		    return Adaptation_rule.find({
		      	correction_profile_id: {
		      		$in: corr_profiles_id
		      	}
		    }); 
	  	}
		  //every adaptation rules in DB
	  	return Adaptation_rule.find();
	});

	/* publish filesname and types of pictures */
	Meteor.publish('Picture', function(){
		  //every pictures in DB
	  	return Picture.find();
	});

	/* publish Questions - Answers linked with Pictures */
	Meteor.publish('QA', function(){
		  //every pictures in DB
	  	return QA.find();
	});

	/* publish uploaded pictures */
 	Meteor.publish("images", function(){
	  	return Images.find();
	});