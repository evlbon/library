import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";


const Month = Class.create({
    name: 'month',
    identifiers: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
});

const Date = Class.create({
    name: 'date',
    fields: {
        year: {
            type: Number
        },
        month: {
            type: Month,
        }
    }
});

export const JournalArticle = Document.extend({
    name: 'Book',
    collection: new Meteor.Collection('journal_article'),
    fields: {
        journal: {
            type: String,
        },
        editor: {
            type: String,
        },
        date: {
            type: Date,
        }
    },
    // helpers: {
    //
    // },
});
