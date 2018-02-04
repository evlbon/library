import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";

export const Books = Document.inherit({
    name: "Books",
    collection: new Meteor.Collection('book'),
    fields: {
        publisher:{
            type: String,
        },
        edition:{
            type: String,
            optional: true
        },
        release_date: {
            type: Date,
        },
        bestseller: {
            type: Boolean
        }
    },
});
