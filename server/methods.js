import {Meteor} from 'meteor/meteor'
import fs from 'fs';

Meteor.methods({ 
    savePost(post){ 
         if(!post || !post.image){
             throw new Meteor.Error("입력 값이 없습니다");
         }
         var tempDir = "C:/Projects/temp/";
         var imageDir = "c:/Projects/images";
         
         var blob = Meteor.wrapAsync(fs.readFile)(tempDir+post.image);

         Meteor.wrapAsync(fs.writeFile)(imageDir+post.image,blob);
         Meteor.wrapAsync(fs.unlink)(tempDir+post.image);
         post.url = "/images/"+post.image;
         return Posts.insert(post);
    },
    removePost(post_id){
        if(!post_id){
            throw new Meteor.Error("입력 값이 없습니다.");
        }
        return Posts.remove({_id:post_id});
    },
    updatePost(post={}){
        if(!post._id || !post.context){
            throw new Meteor.Error("데이터를 확인하세요");
        }
        return Posts.update({_id:post._id},{$set:{context:post.context}});
    },
    saveFile(image={blob:"",name:"",encoding:""}){
        var path = "C:/Projects/temp/";
        var fileName = Random.id();

        var fsWriteFile = Meteor.wrapAsync(fs.writeFile);
        fsWriteFile(path + fileName, image.blob, image.encoding);

        return {fileName:fileName,name:image.name};
    }
});