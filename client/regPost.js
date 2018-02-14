Template.regPost.onCreated(function(){
    this.tempImage = new ReactiveVar("");
})

Template.regPost.helpers({
    tempImage(){
        return Template.instance().tempImage.get();
    }
});

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
        if(tmpl.tempImage.get()!=""){
            post["image"]=tmpl.tempImage.get();
        }
        Meteor.call("savePost",post,(err,data)=>{
            if(err){
                alert("서버에러 => " + err.error);
            }else{
                console.log(data);
            }
        });
    }
    ,
    'change input[name=file-upload]' (event,tmpl){
        var fileReader = new FileReader();
        var fileName = event.currentTarget.files[0].name;
        var file = event.currentTarget.files[0];

        fileReader.onload = (file)=>{
            var image = {
                blob: file.srcElement.result,
                name : fileName,
                encoding:'binary',
            };
            Meteor.call('saveFile',image,function(err,result){
                if(err){
                    alert(err);
                }
                else{
                    alert("http://localhost:3000/temp/" + result.fileName);
                    tmpl.tempImage.set(result.fileName);
                }
            })
        };
        fileReader.readAsBinaryString(file);
    }
});

Template.regPost.onRendered(function(){
    var element = this.find(".editable");
    this.editor = new MediumEditor(element,{
        spellcheck : false
    });
})