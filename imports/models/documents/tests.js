import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { User } from "../users/user";
import { Librarian} from "../users/librarian";
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy, Document } from "./document"
import { JournalArticle } from "./journal_article";
import Article from "../../ui/Article";
import { Student } from "../users/student";
import { Faculty } from "../users/faculty";

/**
 * Methods for adding / deletion docs
 */
Meteor.methods({

    'clr_bd'() {
        User.remove({});
        Books.remove({});
    },

    'test1'() {
        Meteor.call('clr_bd');

        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'librarian 1'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'student 1'});

        let book1 = Meteor.call('documents.addBook', {
            title: 'Touch of Class', price: 999999, bestseller: false, copies:
                [
                    new Copy({reference: false, usersID: []}),
                    new Copy({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: student1, documentID: book1});

        console.log('Users who have the document: ');
        console.log(Meteor.call('getRenters', {documentID: book1}));
        console.log('Amount of references of the document: ');
        console.log(Meteor.call('numberOfReferences', {documentID: book1}));
    },



    'test2' (){
        Meteor.call('clr_bd');
        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'librarian 1'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'student 1'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, authors: ['Bertrand Meyer'], bestseller: true, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                    new Copy ({reference: false, usersID: []}),
                ]
        });
        let book2 = Meteor.call('documents.addBook', {title: 'Calculus II', price: 0,authors: ['Nikolay Shilov'], bestseller: false, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                    new Copy ({reference: false, usersID: []}),
                ]
        });
    },

    'test5' (){
        Meteor.call('clr_bd');
        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'librarian 1'});
        let faculty1 = Meteor.call('addFaculty', {id: 'f1', name: 'faculty1'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'student 1'});
        let student2 = Meteor.call('addStudent', {id: 's2', name: 'student 2'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, authors: ['Bertrand Meyer'], bestseller: true, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                    new Copy ({reference: false, usersID: []}),
                ]
        });
        Meteor.call('checkOut', {userID: faculty1, documentID: book1});
        Meteor.call('checkOut', {userID: "Kiweim2rdFGQkYcfF", documentID: "RSJRTCzk5BoBXgtGs"});
        console.log('Student 2 can check out book1:');
        console.log(Meteor.call('canCheckOut',{userID: student2, documentID: book1}));
        Meteor.call('checkOut', {userID: student2, documentID: book1});
    },

    'test6' (){
        Meteor.call('clr_bd');
        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'librarian 1'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'student 1'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, authors: ['Bertrand Meyer'], bestseller: true, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                    new Copy ({reference: false, usersID: []}),
                ]
        });
        Meteor.call('checkOut', {userID: student1, documentID: book1});
        console.log('Student 1 can check out book1:');
        console.log(Meteor.call('canCheckOut',{userID: student1, documentID: book1}));

    },

    'test7' (){
        Meteor.call('clr_bd');
        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'librarian 1'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'student 1'});
        let student2 = Meteor.call('addStudent', {id: 's2', name: 'student 2'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, authors: ['Bertrand Meyer'], bestseller: true, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                    new Copy ({reference: false, usersID: []}),
                ]
        });
        Meteor.call('checkOut', {userID: student1, documentID: book1});
        Meteor.call('checkOut', {userID: student2, documentID: book1});
        console.log('Users who have the document: ');
        console.log(Meteor.call('getRenters', {documentID: book1}));
    },

    'test10' (){
        Meteor.call('clr_bd');
        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'librarian 1'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'student 1'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, authors: ['Bertrand Meyer'], bestseller: true, copies:
                [
                    new Copy ({reference: true, usersID: []}),
                    ]
        });
        let book2 = Meteor.call('documents.addBook', {title: 'Calculus II', price: 0,authors: ['Nikolay Shilov'], bestseller: false, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                ]
        });
        Meteor.call('checkOut', {userID: student1, documentID: book2});
        console.log(Meteor.call('canCheckOut',{userID: student1, documentID: book1}));
        Meteor.call('checkOut', {userID: student1, documentID: book1});
        console.log('Documents that user have:');
        console.log(Meteor.call('getUsersBook', {userID: student1}));

    }


});

