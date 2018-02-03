import { Class } from 'meteor/jagi:astronomy';

export const Empty = Class.create({
    name: 'Empty',
    collection: new Meteor.Collection('empty'),
    fields: {
        nigga: {
            type: String
        }
    }
});
