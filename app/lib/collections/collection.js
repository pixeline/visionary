/* collection stored in MongoDB and 
 * relation introduced for easy access in templates 
 s*/

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