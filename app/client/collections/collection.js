/* Collections for client-side (Model) */

Collection = {};

(function() {
        
		/* Collection Survey to be contructed */
        Collection.Survey = function (name, root_url, state, date_created, max_reset_counter) {
			this.name = name;
			this.root_url = root_url;
			this.state = state;
			this.date_created = date_created;
			this.max_reset_counter = max_reset_counter;
		}
		
		/* Collection ModuleSurvey to be contructed (linked with survey) */
        Collection.ModuleSurvey = function (order, title) {
			this.order = order;
			this.title = title;
		}
		
		/* Collection Picture to be contructed (linked with survey and integrated in module which have one/several filter_admin) */
        Collection.PictureAdmin = function (order, title, typePic, file_name) {
			this.order = order;
			this.title = title;
			this.type = typePic;
			this.file_name = file_name;
		}
		
		/* Collection Instruction to be constructed (linked with a picture and a module) */
        Collection.Instruction = function (txt) {
			this.txt = txt;
		}
		
		/* Collection InfoTxt to be contructed (linked with some modules) */
        Collection.InfoTxt = function (title, txt) {
			this.title = title;
			this.txt = txt;
		}
		
		/* Collection SortedColorAdmin to be contructed (linked with module sorted_test) */
        Collection.SortedColorAdmin = function (order, color) {
			this.order = order;
			this.color = color;
		}
		
		/* Collection FilterAdmin to be contructed (linked with some modules - select, select_ligne, adjust, choice) */
        Collection.FilterAdmin = function (order, parameter, init_value, min, max, conversion, step) {
			this.order = order;
			this.parameter = parameter;
			this.init_value = init_value;
			this.min = min;
			this.max = max;
			this.conversion = conversion;
			this.step = step;
		}
		
		/* Collection FieldForm to be contructed (linked with module form) */
        Collection.FieldForm = function (order, typeField, label, name, placeholder, required) {
			this.order = order;
			this.type = typeField;
			this.label = label;
			this.name = name;
			this.placeholder = placeholder;
			this.required = required;
		}
		
})();