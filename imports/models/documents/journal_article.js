import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";
import {User} from "../users/user";

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

    helpers: {
        tillDeadline: function (userID) {
            if (!this.userHas(userID)) throw new Error('user doesn\'t have the document');

            let copy = this.copies.find(o => o.checked_out_date && (o.userID === userID));

            let renterID = copy.userID;
            let duration;

            if (User.findOne({libraryID: renterID}).group === 'Student') {
                duration = this.bestseller ? 2 * 7 : 3 * 7;
            } else if (User.findOne({libraryID: renterID}).group === 'Instructor') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: renterID}).group === 'TA') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: renterID}).group === 'Visiting') {
                duration = 7;
            } else if (User.findOne({libraryID: renterID}).group === 'Professor') {
                duration = 4 * 7;
            }

            return Math.floor((copy.checked_out_date - new Date()) / 864e5) + duration;
        },

        time: function (userID) {
            let duration=0;

            if (User.findOne({libraryID: userID}).group === 'Student') {
                duration = this.bestseller ? 2 * 7 : 3 * 7;
            } else if (User.findOne({libraryID: userID}).group === 'Instructor') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: userID}).group === 'TA') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: userID}).group === 'Visiting') {
                duration = 7;
            } else if (User.findOne({libraryID: userID}).group === 'Professor') {
                duration = 4 * 7;
            }

            return duration;
        },






    }
});
