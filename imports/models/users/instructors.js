import { Class } from 'meteor/jagi:astronomy';      // Importing extension library astronomy
import {Faculty} from "./faculty";                     // Importing patron

export const Instructors = Faculty.inherit({                // Creating a class patron which is inherited from User
    name: 'Instructors',
    fields: {
        // In progress...

    }
});
