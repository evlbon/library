import { Class } from 'meteor/jagi:astronomy';  // Importing extension library astronomy
import { User } from "./user";
import { Enum } from 'meteor/jagi:astronomy';
// Importing users

const priv = Enum.create({                        // Defining the degree of student
    name: 'privilegy',
    identifiers: ['priv1', 'priv2', 'priv3']
});
export const Librarian = User.inherit({         // Creating librarian class which is inherited from User
    name: 'Librarian',
    fields: {
        privilege: {
            type: priv,
            optional: true,

        },

    }
});
