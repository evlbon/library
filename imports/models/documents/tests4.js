import {Books} from "./book";
import {Meteor} from 'meteor/meteor';
import {User} from "../users/user";
import {Copy, Document} from "./document"
import {Librarian} from "../users/librarian";
import {JournalArticle} from "./journal_article";
import {AVs} from "./av"
import Book from "../../ui/book/Book";
import * as functions from "../../methods/functions";
import {Log} from "../utility/log";


Meteor.methods({

    'clr_bd4'() {
        // CLEAR
        Log.remove({});
        Meteor.users.remove({});
        User.remove({});
        JournalArticle.remove({});
        Books.remove({});
        AVs.remove({});
        let pass1 = "123123";

        // ADMIN

        Accounts.createUser({
            username:"admin",
            email : "",
            password : pass1,
            profile  : {
                //publicly visible fields like firstname goes here
            }
        });

        Meteor.call('addAdmin', {id: Meteor.users.findOne({username: "admin"})._id, name: "Admin"})




        // BOOKS

        let d1 = Meteor.call('documents.addBook', {
            title: 'Introduction to Algorithms',
            authors: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"],
            edition: "Third edition",
            publisher: "MIT Press",
            release_date: new Date(2009, 1),
            price: 5000,
            bestseller: false,
            number_of_copies: 3,
            number_of_references: 0
        });
        let d2 = Meteor.call('documents.addBook', {
            title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
            authors: ["Erich Gamma", "Ralph Johnson", "John Vlissides", "Richard Helm"],
            edition: "First edition",
            publisher: "Addison-Wesley Professional",
            release_date: new Date(2003, 1),
            price: 1700,
            bestseller: true,
            number_of_copies: 3,
            number_of_references: 0
        });
        let d3 = Meteor.call('documents.addBook', {
            title: 'Null References: The Billion Dollar Mistake',
            authors: ["Tony Hoare"],
            price: 700,
            bestseller: false,
            number_of_copies: 2,
            number_of_references: 0
        });

        // PROFESSORS


        let HumbleUser2 = Meteor.call('addUser', ({name: "Professor1", password: pass1}));
        let HumbleUser3 = Meteor.call('addUser', ({name: "Professor2", password: pass1}));
        let HumbleUser4 = Meteor.call('addUser', ({name: "Professor3", password: pass1}));

        let Professor1 = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "Professor1"})._id, S: 4}));
        let Professor2 = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "Professor2"})._id, S: 4}));
        let Professor3 = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "Professor3"})._id, S: 4}));

        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "Professor1"})._id,
            name: "Sergey Afonso",
            phone: 30001,
            address: "Via Margutta, 3",
            libId: 1010
        }));
        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "Professor2"})._id,
            name: "Nadia Teixeira",
            phone: 30002,
            address: "Via Sacra, 13",
            libId: 1011
        }));

        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "Professor3"})._id,
            name: "Elvira Espindola",
            phone: 30003,
            address: "Via del Corso, 22",
            libId: 1100
        }));

        // STUDENT AND visiting
        let HumbleUser5 = Meteor.call('addUser', ({name: "Student", password: pass1}));
        let HumbleUser6 = Meteor.call('addUser', ({name: "visiting", password: pass1}));

        let Student = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "Student"})._id, S: 2}));
        let visiting = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "visiting"})._id, S: 3}));

        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "Student"})._id,
            name: "Andrey Velo",
            phone: 30004,
            address: "Avenida Mazatlan 250",
            libId: 1101
        }));
        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "visiting"})._id,
            name: "Veronika Rama",
            phone: 30005,
            address: "Stret Atocha, 27",
            libId: 1110
        }));

    },

    'test4-2'() {
        Meteor.call('clr_bd4');
        let pass1 = "123123";
        Meteor.call('addUser', ({name: "librarian1", password: pass1}));
        Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "librarian1"})._id, S: 1}));
        Meteor.call('ModifyLibrarian', ({id: Meteor.users.findOne({username: "librarian1"})._id, S: 1}));


        Meteor.call('addUser', ({name: "librarian2", password: pass1}));
        Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "librarian2"})._id, S: 1}));
        Meteor.call('ModifyLibrarian', ({id: Meteor.users.findOne({username: "librarian2"})._id, S: 2}));

        Meteor.call('addUser', ({name: "librarian3", password: pass1}));
        Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "librarian3"})._id, S: 1}));
        Meteor.call('ModifyLibrarian', ({id: Meteor.users.findOne({username: "librarian3"})._id, S: 3}));


    },


});
