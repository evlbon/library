import {Books} from "./book";
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'documents.addBook' ({ title }) {

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
                {document_id: 13, reference: false, checked_out: false, checked_out_date: new Date(), users: []},
                {document_id: 49, reference: false, checked_out: true, checked_out_date: new Date(), users: []}
            ],
            tags: ['Nigga', 'niGGA']
        });
    }
});

Meteor.methods({
    'documents.delBook' ({ id }) {

        Books.remove(id);
    }
});
