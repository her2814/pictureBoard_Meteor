import {Meteor} from 'meteor/meteor';

Meteor.startup(function() {
    if(Posts.find().count()==0){
        Posts.insert({
            title:"만화로 배우는 리눅스 시스템 관리 1",
            url : "http://image.yes24.com/momo/TopCate0001/kepub/M_535379",
            context : "정말 어마어마하군요",
            atDate : new Date()
        });
        Posts.insert({
            title:"만화로 배우는 리눅스 시스템 관리 2",
            url : "http://image.yes24.com/momo/TopCate991/MidCate008/99071615",
            context : "이렇게 재미있다니 !!",
            atDate : new Date()
        });
    }
});