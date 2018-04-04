import { Class } from 'meteor/jagi:astronomy';      // Importing extension library astronomy
import { User } from "./user";                      // Importing users

export const VP = User.inherit({                // Creating a class patron which is inherited from User
    name: 'Visiting Professor',
    fields: {
        // In progress...

    }
});
