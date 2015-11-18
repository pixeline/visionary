Template.MasterLayout.helpers({
});

Template.MasterLayout.events({
	'mouseover header, mouseout header' : function () {
		$(".breadcrumb").toggleClass("active");
	},
	'mouseover .aide, mouseout .aide' : function () {
		$(".boiteAideContextuelle").toggleClass("active");
	}
});
