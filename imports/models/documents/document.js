import { Class } from 'meteor/jagi:astronomy';

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
        id: {
            type: Number
        },
        checked_out: {
            type: Boolean
        },
        // users: {
        //     type: [User]
        // }
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
    }
    // helpers: {
    //     addAuthor(author) {
    //
    //     }
    // },
});
