Template.MasterLayout.helpers({
});

/* events applied for every templates */
Template.MasterLayout.events({
	'mouseover header, mouseout header' : function () {
		$(".breadcrumb").toggleClass("active");
	},
	'mouseover .aide, mouseout .aide' : function () {
		$(".boiteAideContextuelle").toggleClass("active");
	}
});