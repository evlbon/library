import { Class } from 'meteor/jagi:astronomy';
import { Enum } from 'meteor/jagi:astronomy';
import { Patron } from "./patron";

const Degree = Enum.create({
    name: 'degree',
    identifiers: ['Bachelor', 'Master']
});

export const Student = Patron.inherit({
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
