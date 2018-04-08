import { Class } from 'meteor/jagi:astronomy';      // Importing extension library astronomy
import {Patron} from "./patron";                     // Importing patron

export const VP = Patron.inherit({                // Creating a class patron which is inherited from User
    name: 'Visiting Professor',
    fields: {
        // In progress...

    }
});
