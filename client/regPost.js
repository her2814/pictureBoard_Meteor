Template.regPost.events({
    "click button[name=writePost]" (evt,tmpl){
        $(tmpl.findAll(".modal-dialog")).toggle();
    }
    ,
    "click button[name=save]" (evt,tmpl){
        var title = tmpl.find("input[type=text]").value;
        var context = tmpl.find("textarea").value;
        var atDate = new Date();
        var post = { title, context, atDate};

        Meteor.call("savePost",post,(err,data)=>{
            if(err){
                alert("서버에러 => " + err.error);
            }else{
                console.log(data);
            }
        });
    }
});