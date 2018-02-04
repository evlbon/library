import { Class } from 'meteor/jagi:astronomy'; // Importing from our extension library "astronomy"
import {Document} from "./document";           // Importing from our docs

export const Books = Document.inherit({
    name: "Books",
    collection: new Meteor.Collection('book'),  // Link with MongoDB
    fields: {                                   // Our class attributes
        publisher:{                             // The publisher field is reserved as a string which indicates
            type: String,                       // the full name of the author
        },
        edition:{                               // Edition of the Book reserved by a string which indicates the version of the edition
            type: String,
        },
        release_date: {                         // Release Date reserved as the Built_in Data type of "Date"
            type: Date,
        },
        bestseller: {
            type: Boolean                       // Indicates whether the book was a bestseller or not
        }
    },
});
