import { Class } from 'meteor/jagi:astronomy';
import { Enum } from 'meteor/jagi:astronomy';           // Importing extension library astronomy
import { Patron } from "./patron";                      // Importing patrons

const WorkPosition = Enum.create({                      // Defining the profession of faculty
    name: 'work_position',
    identifiers: ['Professor', 'Instructor', 'TA']
});

export const Faculty = Patron.inherit({                 // Declaring faculty class which is inherited from Patron
    name: 'Faculty',
    fields: {
        position: {
            type: WorkPosition
        }
    }
});
