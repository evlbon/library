import {Books} from "./book";
import {Meteor} from 'meteor/meteor';
import {User} from "../users/user";
import {Copy, Document} from "./document"
import {Librarian} from "../users/librarian";
import {JournalArticle} from "./journal_article";
import {AVs} from "./av"
import {Log} from "../utility/log";
import Book from "../../ui/book/Book";
import * as functions from "../../methods/functions";


Meteor.methods({

    'clr_bd'() {
        Log.remove({});
        Meteor.users.remove({});
        User.remove({});
        JournalArticle.remove({});
        Books.remove({});
        AVs.remove({});

    },

    'test2-1'() {
        Meteor.call('clr_bd');

        let name1 = "Librarian";
        let pass1 = "123456";
        let HumbleUser1 = Meteor.call('addUser', ({name: name1, password: pass1}));
        let userID1 = Meteor.users.findOne({username:name1})._id;
        let librarian1 = Meteor.call('ModifyUser', ({id:userID1,S:1}));

        Meteor.call('ModifyUserProperties',({
            id:Meteor.users.findOne({username:"Librarian"})._id,
            name: "Victor Rivera",
            phone: 88005553535,
            address: "Innopolis",
            libId: 666
        }));

        let book1 = Meteor.call('documents.addBook', {
            title: 'Introduction to Algorithms',
            authors: ["Thomas H. Cormen", "Charles E. Leiserson", "Ronald L. Rivest", "Clifford Stein"],edition:"Third edition",
            publisher: "MIT Press", release_date: new Date(2009,1),
            price: 999999, bestseller: false, number_of_copies: 3,number_of_references:0
        });
        let book2 = Meteor.call('documents.addBook', {
            title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
            authors: ["Erich Gamma", "Ralph Johnson", "John Vlissides", "Richard Helm"],edition:"First edition",
            publisher:"Addison-Wesley Professional", release_date: new Date(2003,1),
            price: 999999, bestseller: true, number_of_copies:2,number_of_references:0
        });
        let book3 = Meteor.call('documents.addBook', {
            title: 'The Mythical Man-month',
            authors: ["Brooks", "Jr.", "Frederick P."],edition: "Second edition",
            publisher: ": Addison-Wesley Longman Publishing Co., Inc", release_date: new Date(1995,1),
            price: 999999, bestseller: false, number_of_copies:1, number_of_references:1
        });
        let HumbleUser2 = Meteor.call('addUser', ({name: "Student1", password: pass1}));
        let HumbleUser3 = Meteor.call('addUser', ({name: "Student2", password: pass1}));
        let HumbleUser4 = Meteor.call('addUser', ({name: "Student3", password: pass1}));

        let student1 = Meteor.call('ModifyUser', ({id:Meteor.users.findOne({username:"Student1"})._id,S:3}));
        let student2 = Meteor.call('ModifyUser', ({id:Meteor.users.findOne({username:"Student2"})._id,S:2}));
        let student3 = Meteor.call('ModifyUser', ({id:Meteor.users.findOne({username:"Student3"})._id,S:2}));

        Meteor.call('ModifyUserProperties',({
            id:Meteor.users.findOne({username:"Student1"})._id,
            name: "Sergey Afonso",
            phone: 30001,
            address: "Via Margutta, 3",
            libId: 1010
        }));
        Meteor.call('ModifyUserProperties',({
            id:Meteor.users.findOne({username:"Student2"})._id,
            name: "Nadia Teixeira",
            phone: 30002,
            address: "Via Sacra, 13",
            libId: 1011
        }));

        Meteor.call('ModifyUserProperties',({
            id:Meteor.users.findOne({username:"Student3"})._id,
            name: "Elvira Espindola",
            phone: 30003,
            address: "Via del Corso, 22",
            libId: 1100
        }));



        let av1 = Meteor.call('documents.addAV', {
            title: 'Null References: The Billion Dollar Mistake',
            authors: ["Tony Hoare"],
            price: 999999, bestseller: false, number_of_copies: 1,number_of_references:0
        });

        let av2 = Meteor.call('documents.addAV', {
            title: 'Information Entropy',
            authors: ["Claude Shannon"],
            price: 999999, bestseller: false, number_of_copies: 1,number_of_references:0
        });
    },

    'test2-2'() {
        Meteor.call('test2-1');

        let book1 = Books.findOne({title: 'Introduction to Algorithms'})._id;
        Meteor.call('editBook', book1, {
            title: "Introduction to Algorithms", price: 999999, bestseller: false, number_of_copies: 1,number_of_references:0
        });

        let book3 = Books.findOne({title: "The Mythical Man-month"})._id;
        Meteor.call('editBook', book3, {
            title: "The Mythical Man-month", price: 999999, bestseller: false, number_of_copies:0, number_of_references:0
        });

        let studentId2 = Meteor.users.findOne({username: 'Student2'})._id;
        Meteor.call('Delete', {
            ID: studentId2,
            ID2: studentId2
        });
    },
    'test2-6'(){
        Meteor.call('test2-2');



        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student1"})._id, documentID:Books.findOne({title:"Design Patterns: Elements of Reusable Object-Oriented Software"})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student3"})._id, documentID:Books.findOne({title:"Introduction to Algorithms"})._id});


    },
    'test2-7'(){
        Meteor.call('test2-1');

        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student1"})._id, documentID:Books.findOne({title:"Design Patterns: Elements of Reusable Object-Oriented Software"})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student1"})._id, documentID:Books.findOne({title:"The Mythical Man-month"})._id});
       Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student1"})._id, documentID:AVs.findOne({title:'AV1'})._id});

        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student2"})._id, documentID:Books.findOne({title:"Introduction to Algorithms"})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student2"})._id, documentID:Books.findOne({title:"Design Patterns: Elements of Reusable Object-Oriented Software"})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student2"})._id, documentID:AVs.findOne({title:'AV2'})._id});





    }

});

