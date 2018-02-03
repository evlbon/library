import { Class } from 'meteor/jagi:astronomy';
import {Patron} from "./patron";

const WorkPosition = Class.create({
    name: 'work_position',
    identifiers: ['Professor', 'Instructor', 'TA']
});

export const Faculty = Patron.inherit({
    name: 'Faculty',
    collection: new Meteor.Collection('faculties'),
    fields: {
        position: {
            type: WorkPosition
        }
    }
});
