/* 
 * collection stored in MongoDB and 
 * relation introduced for easy access in templates 
 */

/*******************
 * PROFILER SYSTEM *
 *******************/

/* Users who did the correction test for a particular survey */
user = new Mongo.Collection('user', {
	transform: function(doc) {
		//correcPic can be called from this in templates allowed by publish-suscribe
		doc.correcPic = correction_profile_picture.find({
			user_id: { $in: [doc._id] }
		});
		//survey that has been realised by this user
		doc.survey = survey.find({
			_id: { $in: [doc.survey_id] }
		});
		return doc;
	}
});

/* user's correction profiles for each picture corrected */
correction_profile_picture = new Mongo.Collection('correction_profile_picture', {
	transform: function(doc) {
		//filter can be called from this in templates allowed by publish-suscribe
		doc.filter = filter.find({
			correction_profile_picture_id: { $in: [doc._id] }
		}); 
		//picture can be called from this in templates allowed by publish-suscribe
		doc.picture = picture.find({
			correction_profile_picture_id: { $in: [doc._id] }
		}); 
		return doc;
	}
});

/* filters of the user's correction profiles (hue, saturation, visionarized_protanope...) */
filter = new Mongo.Collection('filter');

/* picture collection include all the picture that the user correct in the current survey */
picture = new Mongo.Collection('picture');


/***************
 * ADMIN PANEL *
 ***************/

survey = new Mongo.Collection('survey', {
	
	transform: function(doc) {
		//module_survey can be called from survey
		doc.module_survey = module_survey.find({
			survey_id: { $in: [doc._id] }
		}); 
		//picture_admin can be called from survey
		doc.picture_admin = picture_admin.find({
			survey_id: { $in: [doc._id] }
		});
		return doc;
	}
  
});

module_survey = new Mongo.Collection('module_survey', {
	
	transform: function(doc) {
		//survey parent can be called from picture_admin
		doc.surveyObj = survey.findOne ({
			_id: { $in: [doc.survey_id] }
		}); 
		//info_txt can be called from module_survey
		doc.info_txt = info_txt.find({ 
			module_survey_id: { $in: [doc._id] }
		}); 
		//sorted_color_admin can be called from module_survey
		doc.sorted_color_admin = sorted_color_admin.find({
			module_survey_id: { $in: [doc._id] }
		}); 
		//filter_admin can be called from module_survey
		doc.filter_admin = filter_admin.find({
			module_survey_id: { $in: [doc._id] }
		}); 
		//field_form can be called from module_survey
		doc.field_form = field_form.find({
			module_survey_id: { $in: [doc._id] }
		}); 
		//instruction can be called from picture_admin
		doc.instruction = instruction.find({
			module_survey_id: { $in: [doc._id] }
		}); 
		return doc;
	}
  
});

picture_admin = new Mongo.Collection('picture_admin', {
  
	transform: function(doc) {
		//survey parent can be called from picture_admin
		doc.surveyObj = survey.findOne ({
			_id: { $in: [doc.survey_id] }
		}); 
		//instruction can be called from picture_admin
		doc.instruction = instruction.find({
			picture_admin_id: { $in: [doc._id] }
		}); 
		return doc;
	}
	
});

instruction = new Mongo.Collection('instruction', {
  
	transform: function(doc) {
		//picture parent can be called from instruction
		doc.picObj = picture_admin.findOne ({
			_id: { $in: [doc.picture_admin_id] }
		}); 
		//module parent can be called from instruction
		doc.moduleObj = module_survey.findOne ({
			_id: { $in: [doc.module_survey_id] }
		}); 
		return doc;
	}
	
});

info_txt = new Mongo.Collection('info_txt', {
	
	transform: function(doc) {
		//module parent can be called from info_txt
		doc.module = module_survey.findOne ({
			_id: { $in: [doc.module_survey_id] }
		}); 
		return doc;
	}
	
});

sorted_color_admin = new Mongo.Collection('sorted_color_admin', {
	
	transform: function(doc) {
		//module parent can be called from sorted_color_admin
		doc.module = module_survey.findOne ({
			_id: { $in: [doc.module_survey_id] }
		}); 
		return doc;
	}
	
});

filter_admin = new Mongo.Collection('filter_admin', {
	
	transform: function(doc) {
		//module parent can be called from filter_admin
		doc.module = module_survey.findOne ({
			_id: { $in: [doc.module_survey_id] }
		});
		return doc;
	}
	
});

field_form = new Mongo.Collection('field_form', {
	
	transform: function(doc) {
		//module parent can be called from filter_admin
		doc.module = module_survey.findOne ({
			_id: { $in: [doc.module_survey_id] }
		}); 
		return doc;
	}
	
});


/********************
 * Picture uploaded *
 ********************/
 
var pictureStore = new FS.Store.GridFS("picture_upload");

picture_upload = new FS.Collection("picture_upload", {
  stores: [pictureStore],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});

picture_upload.deny({
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

picture_upload.allow({
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