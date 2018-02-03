import { Class } from 'meteor/jagi:astronomy';
import {User} from "./user";

export const Librarian = User.inherit({
    name: 'Librarian',
    collection: new Meteor.Collection('librarians'),
    fields: {

    }
});
