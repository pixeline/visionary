/* Use of attributes to reuse in the template Picture */
Template.Picture.helpers({  
    //return a picture
    picture : function() {
        var pic = {};
        var picture = getCurrentPicture(parseInt(Router.current().params.img));
        pic.src = pictureUrl(picture.file_name);
        pic.title = picture.title;
        if(picture.type == "Ishihara") {
            pic.class = " carre";
        }
        return pic;
    }
});