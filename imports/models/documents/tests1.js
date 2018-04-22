import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { User } from "../users/user";
import { Copy, Document } from "./document"

/**
 * Methods for adding / deletion docs
 */
Meteor.methods({


    'test12345'() {
        Meteor.call('clr_bd');
        let librarian1 = Meteor.call('addLibrarian',{name:Name, password:pass, phone:0, address:"None"});

        let student1 = Meteor.call('addStudent', {id: 's1', name: 'p'});

        let book1 = Meteor.call('documents.addBook', {
            title: 'Touch of Class', price: 999999, bestseller: false, copies:
                [
                    new Copy({reference: false, usersID: []}),
                    new Copy({reference: false, usersID: []}),
                ]
        });

        Meteor.call('checkOut', {userID: student1, documentID: book1});
    },
    'test7697'(){
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

    },

    'test8' () {
        Meteor.call('clr_bd');

        let faculty1 = Meteor.call('addFaculty', {id: 'f1', name: 'f'});
        let student1 = Meteor.call('addStudent', {id: 's1', name: 's'});

        let book1 = Meteor.call('documents.addBook', {title: 'Touch of Class', price: 999999, bestseller: false, copies:
                [
                    new Copy ({reference: false, usersID: []}),
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

        Meteor.call('checkOut', {userID: student1, documentID: book1});

    }
});