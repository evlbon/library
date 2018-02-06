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
        renters: function () {
            let renters = [];
            this.copies.forEach(o => {
                if (o.checked_out_date) {

                    let renterID = o.usersID[o.usersID.length - 1];
                    let renter;
                    let duration;

                    if (renter = Faculty.findOne({_id: renterID})) {
                        duration = 4*7;
                    } else {
                        renter = Student.findOne({_id: renterID});
                        duration = this.bestseller ? 2*7 : 3*7;
                    }

                    renters.push({name: renter.name, tillDeadline: (Date() - o.checked_out_date + duration).getDay()})
                }
            });
            return renters;
        },
        addAuthor(author) {

        },
        addNewCopy(documentID) {

        },
        switchReference(documentID, boolean) {

        },
        getOverdueDocuments() {

        },
        checkOutDocument(documentID, userID) {

        },
        returnDocument(documentID) {

        }
    },
});
