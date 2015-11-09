
/* Get the filesname and type of all the pictures in the folder correction_tool */
function getAllFilesFromFolder(dir) {
	var filesystem = Npm.require("fs");
	var results = []; 
	var currentDir = "";

	filesystem.readdirSync(dir).forEach(function(file) {
		fileName = file;
		file = dir+'/'+file;
		var stat = filesystem.statSync(file);

		if (stat && stat.isDirectory()) {
			currentDir = fileName;
			results = results.concat(getAllFilesFromFolder(file))
		} else results.push({
			type : dir.split('..//web.browser/app/pictures/correction_tool/')[1], //picture's type (folderName)
			fileName : fileName //name of picture
		});

	});
	return results;
};

//Insert, Update, Delete in MongoDB
Meteor.methods({

	/* Insert Data of User and his Correction Profiles */ 
	insertUserCorrection: function(user, correction_profiles, tab_adaptation_rules){ 
		//Check server-side
		check(user, {
			name : String,
			firstname: String, 
			email: String, 
			age: Number,
			sex: Boolean, //true if Male, false if Female
		});
		//extend the collection to add some information
		user = _.extend(user, {
			createdAt: new Date()
		});
		//Insert User Data and return user_id, useful for the link with his correction profile
		var user_id = User.insert(user);
		/* Every pictures in order of correction profiles */
		var pics = Picture.find({}, {sort: {fileName: 1}}).fetch();
		var iPic;
		var size = correction_profiles.length;

		/* Loop for each correction profile */
		for(i = 0 ; i < size ; i++) {
			check(correction_profiles[i], {
				type : String,
				isBest : Boolean,
				CB_type : String
			});

			if (i >= size/2) iPic = i-size/2; else iPic = i;

			//extend the collection to add foreign key (join with one User and one Picture)
			correction_profiles[i] = _.extend(correction_profiles[i], {
				user_id: user_id,
				picture_id: pics[iPic]._id
			});
			//Insert each user's Correction profile and return the id for the link with each of the adaptation rules
			var correction_profile_id = Correction_profile.insert(correction_profiles[i]);

			/* Loop for each adaptation rule (teinte, saturation...) of the current correction profile */
			for(j = 0 ; j < tab_adaptation_rules[i].length ; j++) {
				check(tab_adaptation_rules[i][j], {
					parameter : String,
					value: Number
				});
				//extend the collection to add foreign key
				tab_adaptation_rules[i][j] = _.extend(tab_adaptation_rules[i][j], {
					correction_profile_id: correction_profile_id
				});
				//Insert each adaptation rule
				Adaptation_rule.insert(tab_adaptation_rules[i][j]);
			}
		}

		return {
			_id: user_id
		};
	},

	/*  Insert each picture's names and types (stored in the public correction_tool folder)
		and all QA collections */
	'insertPictures': function(){
		QA.remove({}); //remove all before new insertions
		var qa = Meteor.settings.public.QA; //collect QA from configuration file
		for(j = 0 ; j < qa.length ; j++) {
			//Insert each Qestions - Answers Collections
			QA.insert(qa[j]);
		}
		var numQA = 0;

		var pictures = getAllFilesFromFolder('..//web.browser/app/pictures/correction_tool');
		Picture.remove({}); //remove all before new insertions

		for(i = 0 ; i < pictures.length ; i++) {

			var pic = pictures[i];
			check(pic, {
				type : String,
				fileName : String
			});
			var qa_id;
			var qa = QA.find().fetch();
			if (pic.type == "Technique" || pic.type == "Ishihara") {
				numQA += 1;
				qa_id = qa[numQA]._id;	//question for Technical pic and Ishihara plates
			} else {
				qa_id = qa[0]._id;		//question by default
			}
			pic = _.extend(pic, { //extend with the qa assiociate with pic
				qa_id: qa_id
			});

			//Insert each picture
			Picture.insert(pic);

		}
	},

	/* Update Questions-answers to put the user's answers */ 
	'updateQA' : function (answersList) {
		var qa = QA.find().fetch();
		for(i = 0 ; i < answersList.length ; i++) {
			var qa_id = qa[i+1]._id;
			QA.update( qa_id, { $set: {answerUser : answersList[i]} } );
        };
	}


});