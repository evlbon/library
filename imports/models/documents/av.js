import { Class } from 'meteor/jagi:astronomy'; // Importing our extension library astronomy
import {Document} from "./document";
import {User} from "../users/user";           // Importing our docs

export const AVs = Document.inherit({
    name: 'AV',
    collection: new Meteor.Collection('av'), // Here to Link out DataBase MongoDB with our Project

    helpers: {
        tillDeadline: function (userID) {
            if (!this.userHas(userID)) throw new Error('user doesn\'t have the document');

            let copy = this.copies.find(o => o.checked_out_date && (o.userID === userID));

            let renterID = copy.userID;
            let duration;

            if (User.findOne({libraryID: renterID}).group === 'Student') {
                duration = this.bestseller ? 2 * 7 : 3 * 7;
            } else if (User.findOne({libraryID: renterID}).group === 'Instructor') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: renterID}).group === 'TA') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: renterID}).group === 'Visiting') {
                duration = 7;
            } else if (User.findOne({libraryID: renterID}).group === 'Professor') {
                duration = 4 * 7;
            }

            return Math.floor((copy.checked_out_date - new Date()) / 864e5) + duration;
        },

        time: function (userID) {
            let duration=0;

            if (User.findOne({libraryID: userID}).group === 'Student') {
                duration = this.bestseller ? 2 * 7 : 3 * 7;
            } else if (User.findOne({libraryID: userID}).group === 'Instructor') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: userID}).group === 'TA') {
                duration = 4 * 7;
            } else if (User.findOne({libraryID: userID}).group === 'Visiting') {
                duration = 7;
            } else if (User.findOne({libraryID: userID}).group === 'Professor') {
                duration = 4 * 7;
            }

            return duration;
        },






    }
});
