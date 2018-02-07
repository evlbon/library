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

    'clr_bd' () {
        User.remove({});
        Books.remove({});
    },

    'test1' () {
        Meteor.call('clr_bd');

        let librarian1 = Meteor.call('addLibrarian', {id: 'l1', name: 'l'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 'p'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, bestseller: false, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                    new Copy ({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: student1, documentID: book1});
    },

    'test3' () {
        Meteor.call('clr_bd');

        let faculty1 = Meteor.call('addFaculty', {id: 'f1', name: 'f'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 's'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, bestseller: false, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: faculty1, documentID: book1});
    },

    'test4' () {
        Meteor.call('clr_bd');

        let faculty1 = Meteor.call('addFaculty', {id: 'f1', name: 'f'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 's'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, bestseller: true, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: faculty1, documentID: book1});
    },

    'test8' () {
        Meteor.call('clr_bd');

        let faculty1 = Meteor.call('addFaculty', {id: 'f1', name: 'f'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 's'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, bestseller: false, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: student1, documentID: book1});
    },

    'test9' () {
        Meteor.call('clr_bd');

        let faculty1 = Meteor.call('addFaculty', {id: 'f1', name: 'f'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 's'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, bestseller: true, copies:
                [
                    new Copy ({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: student1, documentID: book1});
    },
});

