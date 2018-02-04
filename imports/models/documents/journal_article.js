import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";

export const JournalArticle = Document.inherit({
    name: 'Book',
    collection: new Meteor.Collection('journal_article'),
    fields: {
        journal: {
            type: String,
        },
        editor: {
            type: String,
        },
        release_date: {
            type: Date,
        }
    },
    // helpers: {
    //
    // },
});
