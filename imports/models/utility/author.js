import { Class } from 'meteor/jagi:astronomy';          // Importing extension library astronomy

export const Author = Class.create({                    // Creating Author class
    name: 'Author',
    collection: new Meteor.Collection('authors'),       // Creating a collection of authors in database
    fields: {                                           // Fields that authors will have and the type of this field
        name: {
            type: String
        }
    }
});