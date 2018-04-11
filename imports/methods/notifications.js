import {User} from "../models/users/user";
import {Meteor} from "meteor/meteor";

Meteor.methods({
    'addNotification'({body,title,userID}) {

        let user = User.findOne({libraryID: userID});
        user.addNotification(body,title);
        user.save();

    },

    'delNotification'({title,userID}) {

        let user = User.findOne({libraryID: userID});
        user.delNotification(title);
        user.save();

    },

    'delAllNotification'({userID}) {

        let user = User.findOne({libraryID: userID});
        user.delAllNotification();
        user.save();

    },


});