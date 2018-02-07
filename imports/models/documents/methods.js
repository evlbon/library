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
    'addLibrarian' ({ id }) {
        Librarian.insert({
            libraryID: id
        });
        return id;
    },

    'addStudent' ({ id }) {
        Student.insert({
            libraryID: id
        });
        return id;
    },

    'addFaculty' ({ id }) {
        Faculty.insert({
            libraryID: id
        });
        return id;
    },

    'test' () {
        let id_s = 's1';
        let id_l = 'l1';

        Student.insert({libraryID: id_s});
        Librarian.insert({libraryID: id_l});

        //TODO: User имеет коллекцию, другие классы наследуются от него не имея своей коллекции, т.е все хранится в коллекции 'user'
        //как тогда имея id узнать к какой группе относится юзер и вернуть объект с соответсвующими его группе полями?
        console.log(User.findOne({libraryID: id_s}) instanceof Student); //false //но по логике должно быть true
        console.log(Student.findOne({libraryID: id_s}) instanceof Student); //true
        console.log(Student.findOne({libraryID: id_l}) instanceof Student); //true   //??? он даже не должен находить ничего по логике, тк
                                            //ищет среди студентов ид библиотекаря. я понимаю что они в одной коллекции, но это как то тупо
    },
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
    }
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


