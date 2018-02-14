import fs from 'fs';
import {Meteor} from 'meteor/meteor'

WebApp.connectHandlers.use("/temp",(req,res,next)=>{
    var filename = req.originalUrl.split("/")[2];
    
    filename = 'C:/Projects/temp/'+filename;
    var fsReadFile = Meteor.wrapAsync(fs.readFile);
    var img = fsReadFile(filename);
    res.writeHead(200);
    res.end(img,'binary');
    /*fs.readFile(filename,function(err,img){
        res.writeHead(200);
        res.end(img,'binary');
    });*/
})

WebApp.connectHandlers.use("/images",(req,res,next)=>{
    var filename = 'C:/Projects/pictureBoard/'+req.originalUrl.split("/")[2];
    
    var img = Meteor.wrapAsync(fs.readFile)(filename);
    
    res.writeHead(200);
    res.end(img,'binary');
    /*fs.readFile(filename,function(err,img){
        res.writeHead(200);
        res.end(img,'binary');
    });*/
})