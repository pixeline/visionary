var uploaded = false;

/* Event of template upload */
Template.Upload.events({
        //to upload images
        'change #picUpload': function(event) {
                FS.Utility.eachFile(event, function(file) {
                        picture_upload.insert(file, function (err, result) {
                                if (err){
                                        sAlert.error("Veuillez choisir un fichier de type image.");
                                } else {
                                        uploaded = true;
                                }
                        });
                });
        },
        //redirect to the next module
        'submit': function (event) {
                event.preventDefault();
                
                if(uploaded) {
                        //store the current path
                        var module = getCurrentModule("Upload");
                        var picOrder = parseInt(Router.current().params.img);
                        sessionStorage.setItem("lastModule", module.title);
                        sessionStorage.setItem("lastPicture", picOrder);
                        
                        var picUploaded = {};
                        //last picture uploaded
                        var pic = picture_upload.find({}, {sort: {uploadedAt:-1}}).fetch()[0];
                        picUploaded.order = picOrder;
                        picUploaded.title = pic.name();
                        picUploaded.type = "Upload";
                        picUploaded.file_name = pic.url();
                        //set it in session
                        setUploadedPicture(picUploaded);
                        
                        //route to page of validation
                        Router.go("Valid", {img: picOrder});
                } else {
                        sAlert.error("Veuillez choisir un fichier de type image.");
                }
        },
        //redirect to the beginning of correction for current picture
        'click #end': function (event) {
                event.preventDefault();
                
                //store the current path
                var module = getCurrentModule("Upload");
                var picOrder = parseInt(Router.current().params.img);
                sessionStorage.setItem("lastModule", module.order);
                sessionStorage.setItem("lastPicture", picOrder);
                
                //route to last page
                Router.go("Form");
        }
	
});