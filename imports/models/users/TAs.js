import { Class } from 'meteor/jagi:astronomy';      // Importing extension library astronomy
import {Faculty} from "./faculty";                     // Importing patron

export const TAs = Faculty.inherit({                // Creating a class patron which is inherited from User
    name: 'TA',
    fields: {
        // In progress...

    }
});
