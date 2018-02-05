import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy } from "./document"
import {JournalArticle} from "./journal_article";

Meteor.methods({
    'documents.addBook' ({
                             title, authors=['Crowd'], edition, publisher, release_date,
                             price, copies=[], tags=[], bestseller=false
    }) {
        console.log(price);
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
        console.log(authors);
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


