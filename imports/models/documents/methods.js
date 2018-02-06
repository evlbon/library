import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy, Document } from "./document"
import { JournalArticle } from "./journal_article";
import { User } from "../users/user";

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

        console.log(Books.findOne({title: title})._type);
        console.log(Document.find({copies: {}}))
    },

    'documents.delBook' ({ id }) {
        Books.remove(id);
    },

    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);
    }
});

/**
 * Methods for checking out / returning / calculating fees
 */
Meteor.methods({
    //
    // /**
    //  *
    //  * @param user
    //  * @param document
    //  */
    // 'documents.checkout' ({ user, document }) {
    //     check(user, User);
    //     check(document, Document);
    //
    //     let avaliable = false
    // }
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


