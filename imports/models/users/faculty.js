import { Class } from 'meteor/jagi:astronomy';
import { Patron } from "./patron";
import { Enum } from 'meteor/jagi:astronomy';

const WorkPosition = Enum.create({
    name: 'work_position',
    identifiers: ['Professor', 'Instructor', 'TA']
});

export const Faculty = Patron.inherit({
    name: 'Faculty',
    fields: {
        position: {
            type: WorkPosition
        }
    }
});
