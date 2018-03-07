import {Books} from "./book";
import {Meteor} from 'meteor/meteor';
import {User} from "../users/user";
import {Copy, Document} from "./document"
import {Librarian} from "../users/librarian";
import {JournalArticle} from "./journal_article";
import {AVs} from "./av"

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

    'test2-2'(){
        Meteor.call('test1');
        let book1 = Meteor.call('documents.addBook', {
            title: 'Book1', price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });

        let book1 = Meteor.call('\'editBook\'')

        Meteor.call('Delete', ({id:Meteor.users.findOne({username:"Student2"})._id, id:Meteor.users.findOne({username:"Student1"})._id}));
    }
});

