import { Class } from 'meteor/jagi:astronomy';  // Importing extension library astronomy
import { User } from "./user";                  // Importing users
import { Enum } from 'meteor/jagi:astronomy';

export const Admin = User.inherit({         // Creating librarian class which is inherited from User
    name: 'Admin',
    fields: {

    }
});
