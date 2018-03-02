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
    Delete(ID) {
        if (!Meteor.isServer) return;
        try {
            console.log(ID);
            Meteor.users.remove("8vxAs3udADpb52cyo");


        } catch (e) {
            // handle this however you want

            throw new Meteor.Error('self-delete', 'Failed to remove yourself');
        }
    },
});
Meteor.methods({
    'documents.addBook' ({
                             title, authors=['Crowd'], edition, publisher, release_date,
                             price, copies=[], tags=[], bestseller=false
    }) {
        check(title, String);
        check(authors, [String]);
        check(edition, Match.Maybe(String));
        check(publisher, Match.Maybe(String));
        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(copies, Match.Maybe([Copy]));
        check(tags, [String]);
        check(bestseller, Boolean);

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })
            );
        });

        return Books.insert({
            title: title,
            authorsID: authorsID,
            edition: edition,
            publisher: publisher,
            release_date: release_date,
            price: price,
            copies: copies,
            tags: tags,
            bestseller: bestseller
        });
    },

    'documents.addArticle' ({
                             title,authors=['Crowd'], editor, release_date,
                             price, copies=[], tags=[], journal
                         }){

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })
            );
        });

        return JournalArticle.insert({
            title: title,
            authorsID: authorsID,
            journal: journal,
            editor: editor,
            release_date: release_date,
            price: price,
            copies: copies,
            tags: tags
        });

    },

    'documents.delBook' ({ id }) {
        Books.remove(id);
    },

    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);
    },
});


/**
 * Manage users
 */
Meteor.methods({
    'addLibrarian' ({ id,name }) {
        Librarian.insert({
            libraryID: id,
            name: name,
            group:"Librarian",
        });
        return id;
    },

    'addStudent' ({ id,name  }) {
        Student.insert({
            libraryID: id,
            name: name,
            group:"Student"
        });
        return id;
    },
    'DeleteUser' ({ id}) {
      db.removeUser({_id:id});
        return id;
    },

    'addFaculty' ({ id,name  }) {
        Faculty.insert({
            libraryID: id,
            name: name,
            group:"Faculty"
        });
        return id;
    },
});


/**
 * Manage documents
 */
Meteor.methods({
    'editBook' ({
                    title, authors=['Crowd'], edition, publisher, release_date,
                    price, copies=[], tags=[], bestseller=false
                }) {
        check(title, String);
        check(authors, [String]);
        check(edition, Match.Maybe(String));
        check(publisher, Match.Maybe(String));
        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(copies, Match.Maybe([Copy]));
        check(tags, [String]);
        check(bestseller, Boolean);

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({name: name}).count();
            authorsID.push(
                exist ?
                    Author.findOne({name: name})._id :
                    Author.insert({name: name})
            );
        });

        return Books.insert({
            title: title,
            authorsID: authorsID,
            edition: edition,
            publisher: publisher,
            release_date: release_date,
            price: price,
            copies: copies,
            tags: tags,
            bestseller: bestseller
        });
    }
});


/**
 * Checking out system
 */
Meteor.methods({
    'canCheckOut' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});

        if (!(user && document)) throw Error('Incorrect id of user or document');

        return document.canCheckOut(userID);
    },

    'checkOut' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});

        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.canCheckOut(userID)) {
            document.checkOut(userID);
        } else {
            if (document.userHas(userID))
                throw Error('Can\'t check out more than one same book');
            else
                throw Error('No book available');
        }
    },

    'getRenters' ({ documentID }) {
        let document = Books.findOne({_id: documentID});

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
    }
});


/**
 * Return system
 */
Meteor.methods({
    'hasDocument' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});

        if (!(user && document)) throw Error('Incorrect id of user or document');

        return document.userHas(userID);
    },

    'returnDocument' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});

        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.user(userID);
        } else {
            throw Error('User can\'t return a book, because he doesn\'t have it');
        }
    },
});

/*
* METHOD INTERFACES:
*
* addArticle
* addAV
* delAV
* changeTags
* changePrice
* addNewCopy
* removeCopy
* switchBestseller
* changeNumberOfReferences
* checkOut(user, document)
* return(document)
* getUsersOverdueDocuments
* calculateFine(document)
*
* */


