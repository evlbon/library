import { Class } from 'meteor/jagi:astronomy';
import {Patron} from "./patron";

const Degree = Class.create({
    name: 'degree',
    identifiers: ['Bachelor', 'Master']
});

export const Student = Patron.inherit({
    name: 'Student',
    collection: new Meteor.Collection('students'),
    fields: {
        degree: {
            type: Degree
        },
        year_of_study: {
            type: Number
        }
    }
});
