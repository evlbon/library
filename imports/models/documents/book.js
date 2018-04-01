import { Class } from 'meteor/jagi:astronomy'; // Importing from our extension library "astronomy"
import {Document} from "./document";
import {User} from "../users/user";           // Importing from our docs

export const Books = Document.inherit({        // A book inherits from Document because the relation id "is a"
    name: "Books",
    collection: new Meteor.Collection('book'),  // Link with MongoDB
    fields: {                                   // Our class attributes
        publisher:{                             // The publisher field is reserved as a string which indicates
            type: String,                       // the full name of the author
            optional: true
        },
        edition:{                               // Edition of the Book reserved by a string which indicates the version of the edition
            type: String,
            optional: true
        },
        bestseller: {
            type: Boolean                       // Indicates whether the book was a bestseller or not
        }
    },

    helpers: {
        edit: function () {
            this.title = "nigga"
        },
    },
});


