import { Class } from 'meteor/jagi:astronomy';


export const User = Class.create({
    name: 'User',
    collection: new Meteor.Collection('user'),
    fields: {
        library_id: {
            type: Number
        },
        name: {
            type: String
        },
        address: {
            type: String
        },
        phone: {
            type: Number
        }
    },

    helpers: {
        getInfo() {

        },
        changeLibraryId() {

        },
        changeName() {

        },
        changeAddress() {

        },
        changePhone() {

        },
    },
});
