import {Books} from "./book";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'documents.addBook' ({ title }) {

        new SimpleSchema({
            title: { type: String }
        }).validate({ title });

        Books.insert({
            title: title,
            authors: [
                {name: 'Clifford Stein'},
            ],
            edition: '3rd',
            publisher: 'MIT Press',
            year: 2009,
            price: 3000,
            copies: [
                {id: 13, checked_out: false},
                {id: 49, checked_out: true}
            ],
            tags: ['Nigga', 'niGGA']
        });
    }
});

Meteor.methods({
    'documents.delBook' ({ id }) {

        new SimpleSchema({
            id: { type: String }
        }).validate({ id });

        Books.remove(id);
    }
});
