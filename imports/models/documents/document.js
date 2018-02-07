import { Class } from 'meteor/jagi:astronomy';
import { Faculty } from "../users/faculty";
import { Student } from "../users/student";

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

            if (Faculty.findOne({_id: renterID})) {
                duration = 4*7;
            } else {
                duration = this.bestseller ? 2*7 : 3*7;
            }

            return (Date() - copy.checked_out_date + duration).getDay();
        },
        renters: function () {
            let renters = [];
            this.copies.forEach(o => {
                if (o.checked_out_date) {

                    let renterID = o.usersID[o.usersID.length - 1];
                    let renter;

                    if (renter = Faculty.findOne({_id: renterID})) {
                    } else {
                        renter = Student.findOne({_id: renterID});
                    }

                    renters.push({name: renter.name, tillDeadline: this.tillDeadline(userId)})
                }
            });
            return renters;
        },
        userHas(userID) {
            return this.copies.find(o => !o.reference && o.checked_out_date && (o.usersID[o.usersID.length - 1] === userID));
        },
        canCheckOut(userID) {
            return !this.userHas(userID) && this.available()
        },
        checkOut(userID) {
            let copy;
            console.log(this.copies);
            if (copy = this.copies.find(o => !(o.checked_out_date || o.reference)) ) {
                console.log(copy);
                copy.checked_out_date = new Date();
                copy.usersID.push(userID);
                console.log(copy);
                console.log(this.copies); //TODO: странно, в консоли выводится, что массив копий обновился и человек взял книгу,
                // но в бд ничего не меняется
                return true;
            } else
                return false;
        },
        returnDocument(userID) {
            // let copy;
            // if (copy = this.userHas(userID)) {
            //     copy.checked_out_date = null;
            // } else
            //     throw new Error( 'user '+ userID +' didnt have this book' );
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
