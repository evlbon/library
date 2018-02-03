import {Books} from "./book";
import { Meteor } from 'meteor/meteor';


Meteor.methods({
    'documents.addBook' ({ title }) {


        new SimpleSchema({
            title: { type: String }
        }).validate({ title });

        Books.insert({
            authors: [
                {name: 'Clifford Stein'},
            ],
            title: title,
            edition: '3rd',
            publisher: 'MIT Press',
            year: 2009,

        });
    }
})



Meteor.methods({
    'documents.delBook' ({ id }) {


        new SimpleSchema({
            id: { type: String }
        }).validate({ id });

        Books.remove(id);
    }
})