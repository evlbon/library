import { Class } from 'meteor/jagi:astronomy';
import { Enum } from 'meteor/jagi:astronomy';           // Importing extension library astronomy
import {User} from "./user";                      // Importing patrons

export const VP = User.inherit({                 // Declaring faculty class which is inherited from Patron
    name: 'VP',
    fields: {

    }
});
