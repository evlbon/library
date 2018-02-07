import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { User} from "../users/user";
import { Librarian} from "../users/librarian";
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy, Document } from "./document"
import { JournalArticle } from "./journal_article";
import { User } from "../users/user";
import Article from "../../ui/Article";

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
});

Meteor.methods({
    'documents.delBook' ({ id }) {
        Books.remove(id);
    },
});


Meteor.methods({
    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);
    },

    'addLibrarian' ({ id }) {
        Librarian.insert({
            libraryID: id
        })
    },
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


