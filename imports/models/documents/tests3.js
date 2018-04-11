import {Books} from "./book";
import {Meteor} from 'meteor/meteor';
import {User} from "../users/user";
import {Copy, Document} from "./document"
import {Librarian} from "../users/librarian";
import {JournalArticle} from "./journal_article";
import {AVs} from "./av"
import Book from "../../ui/book/Book";
import * as functions from "./functions";


Meteor.methods({

    'clr_bd3'() {
        // C    LEAR
        Meteor.users.remove({});
        User.remove({});
        JournalArticle.remove({});
        Books.remove({});
        AVs.remove({});

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

        // USERS

        let name1 = "Librarian";
        let pass1 = "123456";
        let HumbleUser1 = Meteor.call('addUser', ({name: name1, password: pass1}));
        let userID1 = Meteor.users.findOne({username: name1})._id;
        let librarian1 = Meteor.call('ModifyUser', ({id: userID1, S: 1}));

        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "Librarian"})._id,
            name: "Hamna Aslam",
            phone: 88005553535,
            address: "Innopolis",
            libId: 666
        }));


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

        // STUDENT AND VP
        let HumbleUser5 = Meteor.call('addUser', ({name: "Student", password: pass1}));
        let HumbleUser6 = Meteor.call('addUser', ({name: "VP", password: pass1}));

        let Student = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "Student"})._id, S: 2}));
        let VP = Meteor.call('ModifyUser', ({id: Meteor.users.findOne({username: "VP"})._id, S: 3}));

        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "Student"})._id,
            name: "Andrey Velo",
            phone: 30004,
            address: "Avenida Mazatlan 250",
            libId: 1101
        }));
        Meteor.call('ModifyUserProperties', ({
            id: Meteor.users.findOne({username: "VP"})._id,
            name: "Veronika Rama",
            phone: 30005,
            address: "Stret Atocha, 27",
            libId: 1110
        }));

    },
    'test3-1'() {
        Meteor.call('clr_bd3');

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});

        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id, days: -27});

       // Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        // Meteor.call("accept",{documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        // Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});

        //Meteor.call("returnDocument",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
    },

    'test3-2'(){
        Meteor.call('clr_bd3');

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id, date: -27});

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id, date: -27});

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id, date: -27});

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id, date: -27});

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id, date: -27});

        Meteor.call("enqueue",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("accept",{documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"VP"}).id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("shiftCheckOutDate",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id, date: -27});

        // Calculate fines
        },
    'test3-3'(){
        Meteor.call('clr_bd3');

        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});

        /**
         * Professor 1 renew D1
         * Student renew D2
         * VP renew D2
         * check info
         **/
    },

    'test3-4'(){
        Meteor.call('clr_bd3');


        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Design Patterns: Elements of Reusable Object-Oriented Software'})._id});

        /**
         *   Outstanding request on d2
         *   p1 renew d1
         *   s renew d2
         *   vp renew d2
         *   Check info
         */
    },
    'test3-5'(){
        Meteor.call('clr_bd3');
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});

    },
    'test3-6'(){
        Meteor.call('clr_bd3');
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor2"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Student"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"VP"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor3"})._id, documentID:Books.findOne({title:'Null References: The Billion Dollar Mistake'})._id});

    },
    'test3-7'(){
        Meteor.call('test3-6');
        /**
         * Outstanding for d3
         */
    },

    'test3-8'(){
        Meteor.call('test3-6');
        /**
         P2 returns d3
         notification for Student that doc is available
         */
    },
    'test3-9'(){
        Meteor.call('test3-6');
        /**
         * p1 renew d3
         * same Wait list + new deadline
         */
    },
    'test3-10'(){
        Meteor.call('clr_bd3');
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Professor1"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        /**
         * P1 renew D1
         */
        Meteor.call("checkOut",{userID:Meteor.users.findOne({username:"Visiting"})._id, documentID:Books.findOne({title:'Introduction to Algorithms'})._id});
        /**
         * VP renew D1
         */

    }

});
