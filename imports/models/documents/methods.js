import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'

Meteor.methods({
    'documents.addBook' ({ title, authors }) {

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

        console.log("=== " + authorsID);

        Books.insert({
            title: title,
            authorsID: authorsID,
            edition: '3rd',
            publisher: 'MIT Press',
            release_date: new Date(2009, 3),
            price: 3000,
            copies: [
                {reference: false, checked_out_date: null, usersID: []}
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
