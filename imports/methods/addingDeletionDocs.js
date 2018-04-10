import {Copy} from "../models/documents/document";
import {Books} from "../models/documents/book";
import {JournalArticle} from "../models/documents/journal_article";
import {check, Match} from "meteor/check";
import {Author} from "../models/utility/author";
import {Meteor} from "meteor/meteor";
import {AVs} from "../models/documents/av";

Meteor.methods({

    'documents.addBook' ({
                             title, authors, edition, publisher, release_date,
                             price, number_of_copies, number_of_references, tags=[], bestseller=false
                         }) {
        check(title, String);
        check(authors, Match.Maybe([String]));
        check(edition, Match.Maybe(String));
        check(publisher, Match.Maybe(String));
        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(number_of_copies, Number);
        check(number_of_references, Number);
        check(tags, Match.Maybe([String]));
        check(bestseller, Boolean);

        if (!authors || authors.length === 0 || authors[0] === '') authors = ['Crowd'];

        let copies = [];
        for (let i=0; i<Math.min(number_of_copies, number_of_references); i++)
            copies.push(new Copy({reference: true}));
        for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
            copies.push(new Copy({reference: false}));

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
            bestseller: bestseller,
            queue_of_students: [],
            queue_of_other: [],
        });
    },

    'documents.addArticle' ({
                                title,authors, editor, release_date,
                                price, number_of_copies, number_of_references, tags=[], journal
                            }){
        if (!authors || authors.length === 0 || authors[0] === '') authors = ['Crowd'];

        let copies = [];
        for (let i=0; i<Math.min(number_of_copies, number_of_references); i++)
            copies.push(new Copy({reference: true}));
        for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
            copies.push(new Copy({reference: false}));


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


    'documents.addAV' ({
                           title,authors=['Crowd'],release_date,
                           price, number_of_copies, number_of_references, tags=[]
                       }){

        if (!authors || authors.length === 0 || authors[0] === '') authors = ['Crowd'];

        let copies = [];
        for (let i=0; i<Math.min(number_of_copies, number_of_references); i++)
            copies.push(new Copy({reference: true}));
        for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
            copies.push(new Copy({reference: false}));


        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })
            );
        });

        return AVs.insert({
            title: title,
            authorsID: authorsID,
            release_date: release_date,
            price: price,
            copies: copies,
            tags: tags
        });

    },

    'documents.delAV' ({ id }) {
        AVs.remove(id);
    },

    'documents.delBook' ({ id }) {
        Books.remove(id);
    },

    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);
    },
});
