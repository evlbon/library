import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";


const Month = Class.create({
    name: 'month',
    identifiers: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
});

const ReleaseDate = Class.create({
    name: 'release_date',
    fields: {
        year: {
            type: Number
        },
        month: {
            type: Month,
        }
    }
});

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
            type: ReleaseDate,
        }
    },
    // helpers: {
    //
    // },
});
