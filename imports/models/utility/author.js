import { Class } from 'meteor/jagi:astronomy';

export const Author = Class.create({
    name: 'Author',
    collection: new Meteor.Collection('authors'),
    fields: {
        name: {
            type: String
        }
    }
});