import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import {JournalArticle} from "./journal_article";




Meteor.methods({
    'documents.addBook' ({ title, authors, publisher,year,edition }) {

        check(authors, Match.Maybe([String]));
        if (authors == null) authors = ['Crowd'];

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })._id
            );
        });

        Books.insert({
            title: title,
            authorsID: authorsID,
            edition: edition,
            publisher: publisher,
            release_date: new Date(year, 3),
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
    'documents.delBook' ({ id }) {
        Books.remove(id);
    }
});


Meteor.methods({
    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);
    }
});


