(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/collections/collection.js                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
/***************************************************************************************\
|  collections stored in MongoDB and relations introduced for easy access in templates  |
\***************************************************************************************/
                                                                       //
/*******************                                                   //
 * PROFILER SYSTEM *                                                   //
 *******************/                                                  //
                                                                       //
/* Users who did the correction test for a particular survey */        //
user = new Mongo.Collection('user', {                                  // 11
	transform: function (doc) {                                           // 12
		//correcPic can be called from this in templates allowed by publish-suscribe
		doc.correcPic = correction_profile_picture.find({                    // 14
			user_id: { $in: [doc._id] }                                         // 15
		});                                                                  //
		//correcRes can be called from this in templates allowed by publish-suscribe
		doc.correcRes = correction_profile_result.find({                     // 18
			user_id: { $in: [doc._id] }                                         // 19
		});                                                                  //
		//survey that has been realised by this user                         //
		doc.survey = survey.find({                                           // 22
			_id: { $in: [doc.survey_id] }                                       // 23
		});                                                                  //
		return doc;                                                          // 25
	}                                                                     //
});                                                                    //
                                                                       //
/* user's correction profiles for each picture corrected */            //
correction_profile_picture = new Mongo.Collection('correction_profile_picture', {
	transform: function (doc) {                                           // 31
		//filter can be called from this in templates allowed by publish-suscribe
		doc.filter = filter.find({                                           // 33
			correction_profile_picture_id: { $in: [doc._id] }                   // 34
		});                                                                  //
		//picture can be called from this in templates allowed by publish-suscribe
		doc.picture = picture.find({                                         // 37
			correction_profile_picture_id: { $in: [doc._id] }                   // 38
		});                                                                  //
		return doc;                                                          // 40
	}                                                                     //
});                                                                    //
                                                                       //
/* user's correction profiles resulting */                             //
correction_profile_result = new Mongo.Collection('correction_profile_result', {
	transform: function (doc) {                                           // 46
		//filter can be called from this in templates allowed by publish-suscribe
		doc.filter = filter.find({                                           // 48
			correction_profile_result_id: { $in: [doc._id] }                    // 49
		});                                                                  //
		//target can be called from this in templates allowed by publish-suscribe
		doc.target = target.find({                                           // 52
			correction_profile_result_id: { $in: [doc._id] }                    // 53
		});                                                                  //
		return doc;                                                          // 55
	}                                                                     //
});                                                                    //
                                                                       //
/* target of the user's correction result (type of picture, specific tag, class...) */
target = new Mongo.Collection('target');                               // 60
                                                                       //
/* filters of the user's correction profiles (hue, saturation, visionarized_protanope...) */
filter = new Mongo.Collection('filter');                               // 63
                                                                       //
/* picture collection include all the picture that the user correct in the current survey */
picture = new Mongo.Collection('picture');                             // 66
                                                                       //
/***************                                                       //
 * ADMIN PANEL *                                                       //
 ***************/                                                      //
                                                                       //
survey = new Mongo.Collection('survey', {                              // 73
                                                                       //
	transform: function (doc) {                                           // 75
		//module_survey can be called from survey                            //
		doc.module_survey = module_survey.find({                             // 77
			survey_id: { $in: [doc._id] }                                       // 78
		});                                                                  //
		//picture_admin can be called from survey                            //
		doc.picture_admin = picture_admin.find({                             // 81
			survey_id: { $in: [doc._id] }                                       // 82
		});                                                                  //
		return doc;                                                          // 84
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
module_survey = new Mongo.Collection('module_survey', {                // 89
                                                                       //
	transform: function (doc) {                                           // 91
		//survey parent can be called from picture_admin                     //
		doc.surveyObj = survey.findOne({                                     // 93
			_id: { $in: [doc.survey_id] }                                       // 94
		});                                                                  //
		//info_txt can be called from module_survey                          //
		doc.info_txt = info_txt.find({                                       // 97
			module_survey_id: { $in: [doc._id] }                                // 98
		});                                                                  //
		//sorted_color_admin can be called from module_survey                //
		doc.sorted_color_admin = sorted_color_admin.find({                   // 101
			module_survey_id: { $in: [doc._id] }                                // 102
		});                                                                  //
		//filter_admin can be called from module_survey                      //
		doc.filter_admin = filter_admin.find({                               // 105
			module_survey_id: { $in: [doc._id] }                                // 106
		});                                                                  //
		//field_form can be called from module_survey                        //
		doc.field_form = field_form.find({                                   // 109
			module_survey_id: { $in: [doc._id] }                                // 110
		});                                                                  //
		//instruction can be called from picture_admin                       //
		doc.instruction = instruction.find({                                 // 113
			module_survey_id: { $in: [doc._id] }                                // 114
		});                                                                  //
		return doc;                                                          // 116
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
picture_admin = new Mongo.Collection('picture_admin', {                // 121
                                                                       //
	transform: function (doc) {                                           // 123
		//survey parent can be called from picture_admin                     //
		doc.surveyObj = survey.findOne({                                     // 125
			_id: { $in: [doc.survey_id] }                                       // 126
		});                                                                  //
		//instruction can be called from picture_admin                       //
		doc.instruction = instruction.find({                                 // 129
			picture_admin_id: { $in: [doc._id] }                                // 130
		});                                                                  //
		return doc;                                                          // 132
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
instruction = new Mongo.Collection('instruction', {                    // 137
                                                                       //
	transform: function (doc) {                                           // 139
		//picture parent can be called from instruction                      //
		doc.picObj = picture_admin.findOne({                                 // 141
			_id: { $in: [doc.picture_admin_id] }                                // 142
		});                                                                  //
		//module parent can be called from instruction                       //
		doc.moduleObj = module_survey.findOne({                              // 145
			_id: { $in: [doc.module_survey_id] }                                // 146
		});                                                                  //
		return doc;                                                          // 148
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
info_txt = new Mongo.Collection('info_txt', {                          // 153
                                                                       //
	transform: function (doc) {                                           // 155
		//module parent can be called from info_txt                          //
		doc.module = module_survey.findOne({                                 // 157
			_id: { $in: [doc.module_survey_id] }                                // 158
		});                                                                  //
		return doc;                                                          // 160
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
sorted_color_admin = new Mongo.Collection('sorted_color_admin', {      // 165
                                                                       //
	transform: function (doc) {                                           // 167
		//module parent can be called from sorted_color_admin                //
		doc.module = module_survey.findOne({                                 // 169
			_id: { $in: [doc.module_survey_id] }                                // 170
		});                                                                  //
		return doc;                                                          // 172
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
filter_admin = new Mongo.Collection('filter_admin', {                  // 177
                                                                       //
	transform: function (doc) {                                           // 179
		//module parent can be called from filter_admin                      //
		doc.module = module_survey.findOne({                                 // 181
			_id: { $in: [doc.module_survey_id] }                                // 182
		});                                                                  //
		return doc;                                                          // 184
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
field_form = new Mongo.Collection('field_form', {                      // 189
                                                                       //
	transform: function (doc) {                                           // 191
		//module parent can be called from filter_admin                      //
		doc.module = module_survey.findOne({                                 // 193
			_id: { $in: [doc.module_survey_id] }                                // 194
		});                                                                  //
		return doc;                                                          // 196
	}                                                                     //
                                                                       //
});                                                                    //
                                                                       //
/********************                                                  //
 * Picture uploaded *                                                  //
 ********************/                                                 //
                                                                       //
var pictureStore = new FS.Store.GridFS("picture_upload");              // 206
                                                                       //
picture_upload = new FS.Collection("picture_upload", {                 // 208
	stores: [pictureStore],                                               // 209
	filter: {                                                             // 210
		allow: {                                                             // 211
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}                                                                    //
	}                                                                     //
});                                                                    //
                                                                       //
picture_upload.deny({                                                  // 217
	insert: function () {                                                 // 218
		return false;                                                        // 219
	},                                                                    //
	update: function () {                                                 // 221
		return false;                                                        // 222
	},                                                                    //
	remove: function () {                                                 // 224
		return false;                                                        // 225
	},                                                                    //
	download: function () {                                               // 227
		return false;                                                        // 228
	}                                                                     //
});                                                                    //
                                                                       //
picture_upload.allow({                                                 // 232
	insert: function () {                                                 // 233
		return true;                                                         // 234
	},                                                                    //
	update: function () {                                                 // 236
		return true;                                                         // 237
	},                                                                    //
	remove: function () {                                                 // 239
		return true;                                                         // 240
	},                                                                    //
	download: function () {                                               // 242
		return true;                                                         // 243
	}                                                                     //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=collection.js.map
