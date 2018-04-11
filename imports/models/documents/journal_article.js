import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";

export const JournalArticle = Document.inherit({            // JournalArticle is a document "inherits from document"
    name: 'Article',
    collection: new Meteor.Collection('journal_article'),   // linking with our MongODB
    fields: {
        journal: {                                          // the type of the particular journalArticle
            type: String,
        },
        editor: {                                           // the full name of the editor
            type: String,
        },
    },
    // helpers: {
    //
    // },
});
