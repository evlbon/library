import { Class } from 'meteor/jagi:astronomy';
import {Document} from "./document";

export const AV = Document.extend({
    name: 'AV',
    collection: new Meteor.Collection('av'),

    // helpers: {
    //
    // },
});
