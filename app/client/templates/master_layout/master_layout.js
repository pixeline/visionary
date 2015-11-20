Template.MasterLayout.helpers({
});

/* events to do for every templates */
Template.MasterLayout.events({
	'mouseover header, mouseout header' : function () {
		$(".breadcrumb").toggleClass("active");
	},
	'mouseover .aide, mouseout .aide' : function () {
		$(".boiteAideContextuelle").toggleClass("active");
	}
});
