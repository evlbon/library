import { Class } from 'meteor/jagi:astronomy';          // Importing extension library astronomy

export const Log = Class.create({                    // Creating Author class
    name: 'Log',
    collection: new Meteor.Collection('logs'),       // Creating a collection of authors in database
    fields: {                                           // Fields that authors will have and the type of this field
        event: {
            type: String
        }
    }
});