import {Instructors} from "../models/users/instructors";
import {Admin} from "../models/users/admin";
import {User} from "../models/users/user";
import {Professors} from "../models/users/professors";
import {Meteor} from "meteor/meteor";
import {Librarian} from "../models/users/librarian";
import {Student} from "../models/users/student";
import {TAs} from "../models/users/TAs";



let cnt = 0;
Meteor.methods({



    'addAdmin' ({ id,name }) {

        Meteor.call('addLog', 'New user "' + name + '" (Admin) was added');

        Admin.insert({
            libraryID: id,
            login:name,
            name: name,
            group:"Admin",
            address:"None",
            phone:-1,
            libId:cnt+1,
        });
        cnt = cnt +1 ;
        return id;
    },

    'addLibrarian' ({ id,name }) {

        Meteor.call('addLog', 'New user "' + name + '" (Librarian) was added');

        Librarian.insert({
            privilege: priv,
            libraryID: id,
            login:name,
            name: name,
            group:"Librarian",
            address:"None",
            phone:-1,
            libId:cnt+1,
        });
        cnt = cnt + 1;
        return id;
    },

    'addHumbleUser' ({ id,name }) {

        Meteor.call('addLog', 'New user "' + name + '" (HumbleUser) was added');

        Librarian.insert({
            libraryID: id,
            login:name,
            name: name,
            group:"HumbleUser",
            address:"None",
            phone:-1,
            libId:cnt+1,
        });
        cnt = cnt +1 ;
        return id;
    },
// PATRONS

    'addStudent' ({ id,name  }) {

        Meteor.call('addLog', 'New user "' + name + '" (Student) was added');

        Student.insert({
            libraryID:id,
            name: name,
            login:name,
            group:"Student",
            address:"None",
            phone:-1,
        });
        return id;
    },

    'addVP' ({ id,name  }) {

        Meteor.call('addLog', 'New user "' + name + '" (Visiting Professor) was added');

        VP.insert({
            libraryID:id,
            name: name,
            login:name,
            group:"Visiting",
            address:"None",
            phone:-1,
        });
        return id;
    },

    // FACULTY members
    'addInstructor' ({ id,name  }) {

        Meteor.call('addLog', 'New user "' + name + '" (Instructor) was added');

        Instructors.insert({
            libraryID:id,
            name: name,
            login:name,
            group:"Instructor",
            address:"None",
            phone:-1,
        });
        return id;
    },

    'addTA' ({ id,name  }) {

        Meteor.call('addLog', 'New user "' + name + '" (Teacher Assistant) was added');

        TAs.insert({
            libraryID:id,
            name: name,
            login:name,
            group:"TA",
            address:"None",
            phone:-1,
        });
        return id;
    },

    'addProfessors' ({ id,name  }) {

        Meteor.call('addLog', 'New user "' + name + '" (Professor) was added');

        Professors.insert({
            libraryID:id,
            name: name,
            login:name,
            group:"Professor",
            address:"None",
            phone:-1,
        });
        return id;
    },


    'Delete'({ID, ID2}) {
        if (!Meteor.isServer) return;
        try {

            Meteor.call('addLog', 'User "' + User.findOne({libraryID:ID2}).name + '" was deleted');

            Meteor.users.remove(ID2);
            User.remove({libraryID:ID2});

        } catch (e) {
            // handle this however you want

            throw new Meteor.Error('self-delete', 'Failed to remove yourself');
        }
    },
});