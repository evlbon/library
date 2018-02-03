import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";

export const Books = Document.inherit({
    name: "Books",
    collection: new Meteor.Collection('books'),
    fields: {
        publisher:{
            type: String,
        },
        edition:{
            type: String,
        },
        year:{
            type: Number,
        }
    },
});
