import { Class } from 'meteor/jagi:astronomy';      // Importing extension library astronomy
import { Enum } from 'meteor/jagi:astronomy';

export const User = Class.create({                  // Main class of users
    name: 'User',
    collection: new Meteor.Collection('user'),    // Creating the collection of users in database

    fields: {                                       // fields that users will have and the type of this field
        libraryID: {
            type: String,
        },
        group: {
            type: String,
        },
        name: {
            type: String,
            optional: true,

        },
        address: {
            type: String,
            optional: true,
        },
        phone: {
            type: Number,
            optional: true,
        },
    },

    helpers: {                                      // Commands that can be performed on a user class
        getInfo() {

        },
        changeName() {

        },
        changeAddress() {

        },
        changePhone() {

        },
    },
});
