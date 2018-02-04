import { Class } from 'meteor/jagi:astronomy';
import { User } from '../users/user'

const Author = Class.create({
    name: 'Author',
    fields: {
        name: {
            type: String,
        },
    }
});

const Copy = Class.create({
    name: 'Copy',
    fields: {
        reference: {
            type: Boolean
        },
        checked_out_date: {
            type: Date
        },
        users: {
            type: [User]
        }
    }
});

export const Document = Class.create({
    name: 'Document',

    fields: {
        title: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 1,
            }]
        },
        authors: {
            type: [Author],
            validators: [{
                type: 'minLength',
                param: 1,
            }],
        },
        tags: {
            type: [String]
        },
        copies: {
            type: [Copy]
        },
        price: {
            type: Number
        }
    },

    helpers: {
        addAuthor(author) {

        },
        addNewCopy(documentID) {

        },
        switchReference(documentID, boolean) {

        },
        getOverdueDocuments() {

        },
        checkOutDocument(documentID, userID) {

        },
        returnDocument(documentID) {

        }
    },
});
