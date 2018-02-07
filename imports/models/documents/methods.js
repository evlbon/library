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
    'documents.addBook' ({
                             title, authors=['Crowd'], edition, publisher, release_date,
                             price, copies=[], tags=[], bestseller=false
    }) {
        check(title, String);
        check(authors, [String]);
        check(edition, Match.Maybe(String));
        check(publisher, String);
        check(release_date, Date);
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

        Books.insert({
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

        JournalArticle.insert({
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
    'addLibrarian' ({ id }) {
        Librarian.insert({
            libraryID: id
        })
    },

    'addStudent' ({ id }) {
        Student.insert({
            libraryID: id
        })
    },

    'addFaculty' ({ id }) {
        Faculty.insert({
            libraryID: id
        })
    },
});


/**
 * Checking out system
 */
Meteor.methods({
    'checkOut' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        //TODO: искать во всех доках а не только в книге, при Documents.findOne "TypeError: Document.findOne is not a function"
        //документ не имеет своей коллекции, но является родительским классом для других доков
        //чекаут и привязка юзера к группе пока только через браузерную консоль:
        //зарегаться на сайте
        //Method.call('addLibrarian', {id: '<_id добавленного юзера>'})
        //добавить книгу за библиотекаря
        //Method.call('addStudent', {id: 's1'})
        //Method.call('checkOut', {userID: 's1', <_id книги>})
        //
        //PS да я знаю, много говнокода, но без этого никак)
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
        let document = Document.findOne({_id: documentID});

        if (!(document)) throw Error('Incorrect id of user or document');

        return document.renters();
    },

    'getUsersBooks' ({ userID }) {
        let users = [];
        Document.all().forEach( o => {
            if (o.userHas(userID)) users.push({title: o.name, tillDeadline: o.tillDeadline(userID)});
        });
    }
});

/*
* TODO: METHOD INTERFACES:
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


