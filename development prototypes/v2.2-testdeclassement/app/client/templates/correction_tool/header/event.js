
Template.Header.events({
	/* Prevent link event */	
    'click a.nolink' : function (event) {
        event.preventDefault();
    },
    'click a.link' : function (event) {
		$(".breadcrumb").toggleClass("active");
    },
	'mouseover header, mouseout header' : function () {
		$(".breadcrumb").toggleClass("active");
	},
	'mouseover .aide, mouseout .aide' : function () {
		$(".boiteAideContextuelle").toggleClass("active");
	}
});