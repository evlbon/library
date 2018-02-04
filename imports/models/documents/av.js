import { Class } from 'meteor/jagi:astronomy'; // Importing our extension library astronomy
import {Document} from "./document";           // Importing our docs

export const AV = Document.inherit({
    name: 'AV',
    collection: new Meteor.Collection('av'), // Here to Link out DataBase MongoDB with our Project

    // helpers: {
    //
    // },
});
