import {Books} from "../models/documents/book";
import {User} from "../models/users/user";
import {Meteor} from "meteor/meteor";

Meteor.methods({

    'checkOut' ({ userID, documentID }) {

        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument", documentID);
        if (!(user && document)) throw Error('Incorrect id of user or document');

        document.checkOut(userID);

        Meteor.call('addLog', '"' + document.title + '" was returned by ' + user.name + '(' + user.group + ')');
    },

    'getRenters' ({ documentID }) {
        let document = Meteor.call("getDocument",  documentID);
        if (!(document)) throw Error('Incorrect id of user or document');

        return document.renters();
    },



    'getUsersBooks' ({ userID }) {
        let books = [];
        Books.find().forEach( o => {
            if (o.userHas(userID)) books.push({title: o.title, tillDeadline: o.tillDeadline(userID)});
        });
        return books;
    },

    'numberOfReferences' ({ documentID }) {
        let document = Books.findOne({_id: documentID});

        if (!(document)) throw Error('Incorrect id of user or document');

        return document.numberOfReferences();
    },

    'leftInLibrary' ({ documentID }) {
        let document = Books.findOne({_id: documentID});

        if (!(document)) throw Error('Incorrect id of user or document');

        return document.leftInLibrary();
    },

    'checkedOtDate' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);
        if (!(user && document)) throw Error('Incorrect id of user or document');

        return document.checkedOtDate(userID);
    },
});