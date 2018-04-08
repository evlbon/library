import { Class } from 'meteor/jagi:astronomy';
import { Faculty } from "../users/faculty";
import { Student } from "../users/student";
import { Books } from "./book";
import { User } from "../users/user";
import {Queue} from "../utility/queue";

export const Copy = Class.create({
    name: 'Copy',
    fields: {
        reference: {
            type: Boolean
        },
        checked_out_date: {
            type: Date,
            optional: true
        },
        acceptance_date: { //when a librarian accepted patron's request. The Patron has 1 day to take the doc in library
            type: Date,
            optional: true
        },
        userID: {
            type: String,
            optional: true
        }
    }
});

export const Document = Class.create({
    name: 'Document',

    fields: {
        title: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 1,
            }]
        },
        authorsID: {
            type: [String]
        },
        tags: {
            type: [String]
        },
        copies: {
            type: [Copy]
        },
        price: {
            type: Number
        },
        release_date: {                         // Release Date reserved as the Built_in Data type of "Date"
            type: Date,
            optional: true,
        },
        queue: {
            type: Queue,
            default: new Queue,
        },
    },

    helpers: {
        numberOfReferences: function () {
            return this.copies.filter(o => (o.reference)).length;
        },
        leftInLibrary: function () {
            return this.copies.filter(o => !(o.checked_out_date || o.acceptance_date)).length;
        },
        available: function () {
            return this.copies.filter(o => !(o.checked_out_date || o.acceptance_date|| o.reference)).length;
        },
        numberOfCopies: function () {
            return this.copies.length;
        },
        checkedOtDate: function (userID) {
            if (!this.userHas(userID)) throw new Error('user doesn\'t have the document');

            let copy = this.copies.find(o => o.checked_out_date && (o.userID === userID));

            return copy.checked_out_date;
        },
        tillDeadline: function (userID) {
            if (!this.userHas(userID)) throw new Error('user doesn\'t have the document');

            let copy = this.copies.find(o => o.checked_out_date && (o.userID === userID));

            let renterID = copy.userID;
            let duration;

            if (User.findOne({libraryID: renterID}).group === 'Faculty') {
                duration = 4*7;
            } else {
                duration = this.bestseller ? 2*7 : 3*7;
            }

            return Math.floor((copy.checked_out_date - new Date()) / 864e5) + duration;
        },
        calculateFee: function (userID) {
            let fee = this.tillDeadline(userID) * 100;
            return Math.max(0, Math.min(fee, this.price));
        },
        renters: function () {
            let renters = [];
            this.copies.forEach(o => {
                if (o.checked_out_date) {

                    let renter = User.findOne({libraryID: o.userID});

                    renters.push({name: renter.name, tillDeadline: this.tillDeadline(o.userID),libraryID:o.userID})
                }
            });
            return renters;
        },
        rentingViaId : function(user){
            let renters = [];
            this.copies.forEach(o => {
                if (o.checked_out_date) {

                    if ( user === o.userID) {
                        renters.push({tillDeadline: this.tillDeadline(o.userID)})
                    }
                }
            });
            return renters;
        },
        userHas(userID) {
            return this.copies.find(o => !o.reference && o.checked_out_date && (o.userID === userID));
        },
        returnDocument(userID) {
            let copy = this.userHas(userID);
            if (!copy) {
                throw new Error('user ' + userID + ' didn\'t have this book');
            }
            copy.checked_out_date = null;
            this.save();
        },




        // TODO NEW

        acceptedRenters: function () {
            let renters = [];
            this.copies.forEach(o => {
                if (o.acceptance_date) {
                    let renter = User.findOne({libraryID: o.userID});
                    renters.push({
                        name: renter.name,
                        tillDeadline: this.tillDeadline - new Date() + 864e5,
                        libraryID: o.userID
                    })
                }
            });
            return renters;
        },
        canAccept() {
            return this.available()
        },
        accept: function (userID) { //new
            let copy = this.copies.find(o => !(o.checked_out_date || o.acceptance_date || o.reference));
            if (!copy) {
                throw new Error( 'Not possible to accept a book if there is no free left, fix UI' );
            }
            copy.acceptance_date = new Date();
            copy.userID = userID;
            this.save();
            return true;
        },
        checkOut(userID) {  //new. librarian executes it when a patron finally comes to take a book
            let copy = this.copies.find(o => (o.acceptance_date || o.usersID === userID));
            if (!copy) {
                throw new Error( 'Trying to checkout a book but the user weren\'t accepted or smth' );
            }
            copy.checked_out_date = new Date();
            copy.acceptance_date = null;
            this.save();
            return true;
        },
        renew(userID) {
            let copy = this.userHas(userID);
            if (!copy) {
                throw new Error('user ' + userID + ' didn\'t have this book');
            }
            copy.checked_out_date = new Date();
            this.save();
        },


        // todo OBSOLETE HELPERS \/ don't delete em to not fuck up the project. Will be deleted when there is no links to obsolete methods/helpers
        // canCheckOut(userID) {
        //     return !this.userHas(userID) && this.available()
        // },
        // checkOut(userID) {
        //     let copy = this.copies.find(o => !(o.checked_out_date || o.reference));
        //     if (copy) {
        //         copy.checked_out_date = new Date();
        //         copy.userID = userID;
        //         this.save();
        //         return true;
        //     } else
        //         return false;
        // },
    },
});
