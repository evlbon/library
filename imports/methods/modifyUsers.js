import {User} from "../models/users/user";
import {Meteor} from "meteor/meteor";

Meteor.methods({
    'addUser'({name,password}) {


        Accounts.createUser({
            username:name,
            email : "",
            password : password,
            profile  : {
                //publicly visible fields like firstname goes here
            }
        });
        let LID = Meteor.users.findOne({username:name})._id;
        let S = 2;
        Meteor.call('addHumbleUser', {id: LID, name: name});
        S = 0;
        Meteor.call('ModifyUser',{id:LID,S:S});
    },
    'ModifyUser' ({ id,S}) {
        let str = "";
        if(S===0)
            str = "HumbleUser";
        else
            str = S===1? "Librarian":S===2?"Student":S===3?"Visiting":S===4?"Professor":S===5?"Instructor":"TA";
        User.update({libraryID:id},{$set:{group:str}});
        return id;
    },
    'ModifyUserProperties' ({id,name,phone,address,libId}){
        if(name)
            User.update({libraryID:id},{$set:{name:name}});
        if(phone)
            User.update({libraryID:id},{$set:{phone:Number(phone)}});
        if(address)
            User.update({libraryID:id},{$set:{address:address}});
        if(libId)
            User.update({libraryID:id},{$set:{libId:Number(libId)}});

    },
});