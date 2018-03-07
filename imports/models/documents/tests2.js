import {Books} from "./book";
import {Meteor} from 'meteor/meteor';
import {User} from "../users/user";
import {Copy, Document} from "./document"
import {Librarian} from "../users/librarian";
import {JournalArticle} from "./journal_article";
import {AVs} from "./av"
import * as functions from "./functions";


Meteor.methods({

    'clr_bd'() {
        Meteor.users.remove({});
        User.remove({});
        JournalArticle.remove({});
        Books.remove({});
        AVs.remove({});
    },

    'test1'() {
        Meteor.call('clr_bd');

        let name1 = "Librarian";
        let pass1 = "123456";
        let HumbleUser1 = Meteor.call('addUser', ({name: name1, password: pass1}));
        let userId1 = Meteor.users.findOne({username:name1})._id;
        let librarian1 = Meteor.call('ModifyUser', ({id:userId1,S:1}));

        let book1 = Meteor.call('documents.addBook', {
            title: 'Book1', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });
        let book2 = Meteor.call('documents.addBook', {
            title: 'Book2', price: 999999, bestseller: false, number_of_copies:2,number_of_references:0
        });
        let book3 = Meteor.call('documents.addBook', {
            title: 'Book3', price: 999999, bestseller: false, number_of_copies:1, number_of_references:0
        });
        let HumbleUser2 = Meteor.call('addUser', ({name: "Student1", password: pass1}));
        let HumbleUser3 = Meteor.call('addUser', ({name: "Student2", password: pass1}));
        let HumbleUser4 = Meteor.call('addUser', ({name: "Student3", password: pass1}));

        let student1 = Meteor.call('ModifyUser', ({id:Meteor.users.findOne({username:"Student1"})._id,S:2}));
        let student2 = Meteor.call('ModifyUser', ({id:Meteor.users.findOne({username:"Student2"})._id,S:2}));
        let student3 = Meteor.call('ModifyUser', ({id:Meteor.users.findOne({username:"Student3"})._id,S:2}));

        let av1 = Meteor.call('documents.addAV', {
            title: 'AV1', price: 999999, bestseller: false, number_of_copies: 1,number_of_references:0
        });

        let av2 = Meteor.call('documents.addAV', {
            title: 'AV2', price: 999999, bestseller: false, number_of_copies: 1,number_of_references:0
        });
    },
    'test2-6'(){

        let name1 = "p1";
        let pass1 = "123456";
        Meteor.call('addUser', ({name: name1, password: pass1}));
        let userId1 = Meteor.users.findOne({username:name1})._id;
        Meteor.call('ModifyUser', ({id:userId1,S:2}));

        let name2 = "p2";
        let pass2 = "123456";
        Meteor.call('addUser', ({name: name2, password: pass2}));
        let userId2 = Meteor.users.findOne({username:name2})._id;
        Meteor.call('ModifyUser', ({id:userId2,S:2}));


        Meteor.call('documents.addBook', {
            title: 'Book1', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });

        Meteor.call('documents.addBook', {
            title: 'Book2', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });

        Meteor.call("checkOut",{userID:userId1, documentID:Books.findOne({title:'Book1'})._id});
        Meteor.call("checkOut",{userID:userId1, documentID:Books.findOne({title:'Book2'})._id});
        Meteor.call("checkOut",{userID:userId2, documentID:Books.findOne({title:'Book1'})._id});

        let p1 = User.findOne({libraryID:userId1});
        let p2 = User.findOne({libraryID:userId2});

        console.log(p1);
        console.log("\n\n\n");
        console.log(functions.getUsersBooks(userId1));
        console.log("\n\n\n");
        console.log(p2);
        console.log("\n\n\n");
        console.log(functions.getUsersBooks(userId2));

    },
    'test2-7'(){
        let name1 = "p1";
        let pass1 = "123456";
        Meteor.call('addUser', ({name: name1, password: pass1}));
        let userId1 = Meteor.users.findOne({username:name1})._id;
        Meteor.call('ModifyUser', ({id:userId1,S:2}));

        let name2 = "p2";
        let pass2 = "123456";
        Meteor.call('addUser', ({name: name2, password: pass2}));
        let userId2 = Meteor.users.findOne({username:name2})._id;
        Meteor.call('ModifyUser', ({id:userId2,S:2}));


        Meteor.call('documents.addBook', {
            title: 'Book1', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });

        Meteor.call('documents.addBook', {
            title: 'Book2', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });

        Meteor.call('documents.addBook', {
            title: 'Book3', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });

        Meteor.call('documents.addAV', {
            title: 'AV1', price: 999999,  number_of_copies: 3,number_of_references:0
        });
        Meteor.call('documents.addAV', {
            title: 'AV2', price: 999999,  number_of_copies: 3,number_of_references:0
        });



        Meteor.call("checkOut",{userID:userId1, documentID:Books.findOne({title:'Book1'})._id});
        Meteor.call("checkOut",{userID:userId1, documentID:Books.findOne({title:'Book2'})._id});
        Meteor.call("checkOut",{userID:userId1, documentID:Books.findOne({title:'Book3'})._id});
        Meteor.call("checkOut",{userID:userId1, documentID:AVs.findOne({title:'AV1'})._id});

        Meteor.call("checkOut",{userID:userId2, documentID:Books.findOne({title:'Book1'})._id});
        Meteor.call("checkOut",{userID:userId2, documentID:Books.findOne({title:'Book2'})._id});
        Meteor.call("checkOut",{userID:userId2, documentID:AVs.findOne({title:'AV2'})._id});

        let p1 = User.findOne({libraryID:userId1});
        let p2 = User.findOne({libraryID:userId2});

        console.log(p1);
        console.log("\n\n\n");
        console.log(functions.getUsersBooks(userId1));
        console.log("\n\n\n");
        console.log(p2);
        console.log("\n\n\n");
        console.log(functions.getUsersBooks(userId2));






    }

});

