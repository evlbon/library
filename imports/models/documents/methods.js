import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import {JournalArticle} from "./journal_article";

Meteor.methods({
    'documents.addBook' ({ title, authors }) {

        check(authors, Match.Maybe([String]));
        if (authors == null) authors = ['Crowd'];                       // Initial name of author if it is not specified

        let authorsID = [];                                             // ID's of the possible authors of the current document
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();            // Boolean expression represents if a document has an author or it is not yet known by the librarians
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })._id
            );
        });

        Books.insert({                                  /// Insertion method for books
            title: title,
            authorsID: authorsID,
            edition: '3rd',                             /// Initial description of a certain book
            publisher: 'MIT Press',
            release_date: new Date(2009, 3),
            price: 3000,
            copies: [
                {document_id: 13, reference: false, checked_out_date: new Date(), usersID: []}
            ],
            tags: ['Math', 'Equations'],
            bestseller: false
        });
    }
});

Meteor.methods({
    'documents.delBook' ({ id }) {                  // the Delete method "delete a book from MongoDB"
        Books.remove(id);
    }
});


Meteor.methods({
    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);                  // JournalArticle deletion methods
    }
});


