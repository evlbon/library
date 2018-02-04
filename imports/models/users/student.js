import { Class } from 'meteor/jagi:astronomy';
import { Enum } from 'meteor/jagi:astronomy';       // Importing extension library astronomy
import { Patron } from "./patron";                  // Importing patrons

const Degree = Enum.create({                        // Defining the degree of student
    name: 'degree',
    identifiers: ['Bachelor', 'Master']
});

export const Student = Patron.inherit({             // Declaring the student class which is inherited from patron
    name: 'Student',
    fields: {
        degree: {
            type: Degree
        },
        dateOfStudyBeginning: {
            type: Date
        }
    }
});
