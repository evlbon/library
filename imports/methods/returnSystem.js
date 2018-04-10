import {User} from "../models/users/user";
import {Meteor} from "meteor/meteor";

Meteor.methods({
    // 'hasDocument' ({ userID, documentID }) {
    //     let user = User.findOne({libraryID: userID});
    //     let document = Books.findOne({_id: documentID});
    //
    //     if (!(user && document)) throw Error('Incorrect id of user or document');
    //
    //     return document.userHas(userID);
    // },

    'returnDocument' ({ userID, documentID }) {

        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);
        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.returnDocument(userID);
        } else {
            throw Error('User can\'t return a book, because he doesn\'t have it');
        }
    },

    'renewDocument' ({ userID, documentID }) {

        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);
        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.renew(userID);
        } else {
            throw Error('User can\'t renew a book, because he doesn\'t have it');
        }
    },
});