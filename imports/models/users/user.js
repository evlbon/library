import { Class } from 'meteor/jagi:astronomy';      // Importing extension library astronomy
import { Enum } from 'meteor/jagi:astronomy';

export  const Notification = Class.create({
    name: "Notification",
    fields:{
        body:{
            type: String,
        },
        title:{
            type: String,
        }

    },

});

export const User = Class.create({                  // Main class of users
    name: 'User',
    collection: new Meteor.Collection('user'),    // Creating the collection of users in database

    fields: {// fields that users will have and the type of this field

        libraryID: {
            type: String,
        },
        group: {
            type: String,
        },
        login:{
            type: String,
        },
        name: {
            type: String,
            optional: true,

        },
        libId: {
            type: Number,
        },
        address: {
            type: String,
            optional: true,
        },
        phone: {
            type: Number,
            optional: true,
        },
        notifications:{
            type: [Notification],
            default: [],
        }
    },

    helpers: {                                      // Commands that can be performed on a user class
        changeGroup(num)
        {
            if(num === 1)
                this.group = "Student";
            else if ( num === 2)
                this.group = "Librarian";
            else this.group = "Faculty";
        },

        addNotification: function (body,title) {
            this.notifications.push(new Notification({body:body,title:title}))
        },

        delNotification: function (title) {
            this.notifications.splice(this.notifications.indexOf({title:title}))
        },
    },
});
