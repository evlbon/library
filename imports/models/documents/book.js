import { Class } from 'meteor/jagi:astronomy';

const Author = Class.create({
    name: "BookAuthor",
    fields : {
        name: {
            type: String
        },

    }
})


export const Books = Class.create({
    name: "Books",
    collection: new Meteor.Collection('books'),
    fields: {
        authors:{
            type: [Author],
        },
        title:{
            type: String,
        },
        publisher:{
            type: String,
        },
        edition:{
            type: String,
        },
        year:{
            type: Number,
        },
    },


})


