import { Class } from 'meteor/jagi:astronomy';
import { Faculty } from "../users/faculty";
import { Student } from "../users/student";
import { Books } from "./book";
import { User } from "../users/user";

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
        usersID: {
            type: [String]
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
        }
    },

    helpers: {
        numberOfReferences: function () {
            return this.copies.filter(o => (o.reference)).length;
        },
        leftInLibrary: function () {
            return this.copies.filter(o => !(o.checked_out_date)).length;
        },
        available: function () {
            return this.copies.filter(o => !(o.checked_out_date || o.reference)).length;
        },
        numberOfCopies: function () {
            return this.copies.length;
        },
        tillDeadline: function (userID) {
            if (!this.userHas(userID)) throw new Error('user doesn\'t have the document');

            let copy = this.copies.find(o => o.checked_out_date && (o.usersID[o.usersID.length-1] === userID));

            let renterID = copy.usersID[copy.usersID.length - 1];
            let duration;

            if (User.findOne({libraryID: renterID}).group === 'Faculty') {
                duration = 4*7;
            } else {
                duration = this.bestseller ? 2*7 : 3*7;
            }

            return Math.floor((new Date() - copy.checked_out_date) / 864e5) + duration;
        },
        renters: function () {
            let renters = [];
            this.copies.forEach(o => {
                if (o.checked_out_date) {

                    let renterID = o.usersID[o.usersID.length - 1];
                    let renter;

                    renter = User.findOne({libraryID: renterID});

                    renters.push({name: renter.name, tillDeadline: this.tillDeadline(renterID)})
                }
            });
            return renters;
        },
        rentingViaId : function(cuser){
            let renters = [];
            this.copies.forEach(o => {
                if (o.checked_out_date) {

                    let renterID = o.usersID[o.usersID.length - 1];
                    console.log(renterID);
                    console.log(cuser);
                    if ( cuser === renterID) {

                        renters.push({tillDeadline: this.tillDeadline(renterID)})
                    }
                }
            });
            return renters;
        }
        ,
        userHas(userID) {
            return this.copies.find(o => !o.reference && o.checked_out_date && (o.usersID[o.usersID.length - 1] === userID));
        },
        canCheckOut(userID) {
            return !this.userHas(userID) && this.available()
        },
        checkOut(userID) {
            let copy = this.copies.find(o => !(o.checked_out_date || o.reference));
            if (copy) {
                copy.checked_out_date = new Date();
                copy.usersID.push(userID);
                this.save();
                return true;
            } else
                return false;
        },
        return(userID) {
            let copy = this.userHas(userID);
            if (copy) {
                copy.checked_out_date = null;
                this.save();
            } else
                throw new Error( 'user '+ userID +' didnt have this book' );
        },
        addAuthor(author) {

        },
        addNewCopy(documentID) {

        },
        switchReference(documentID, boolean) {

        },
        getOverdueDocuments() {

        },
    },
});
