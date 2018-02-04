import { Class } from 'meteor/jagi:astronomy';

const Copy = Class.create({
    name: 'Copy',
    fields: {
        reference: {
            type: Boolean
        },
        checked_out_date: {
            type: Date
        },
        usersID: {
            type: [String]
        }
    }
});

export const Document = Class.create({
    name: 'Document',
    collection: new Meteor.Collection('documents'),
    fields: {
        title: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 1,
            }]
        },
        authorsID: {
            type: [String]
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
