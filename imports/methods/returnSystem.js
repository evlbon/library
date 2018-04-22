import {User} from "../models/users/user";
import {Meteor} from "meteor/meteor";

Meteor.methods({

    'returnDocument' ({ userID, documentID }) {

        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);
        let log = 'User "' + User.findOne({libraryID: userID}).name + '" returned the document "' + document.title + '"';
        Meteor.call('addLog', log);

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
        let log = 'User "' + User.findOne({libraryID: userID}).name + '" renewed the document "' + document.title + '"';
        Meteor.call('addLog', log);

        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.renew(userID);
        } else {
            throw Error('User can\'t renew a book, because he doesn\'t have it');
        }
    },


    'shiftCheckOutDate' ({ userID, documentID, days }) {
        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);
        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.shiftCheckOutDate(userID, days);
        } else {
            throw Error('We can\'t shift checked_out_date, because the user doesn\'t have the doc');
        }
    },
});