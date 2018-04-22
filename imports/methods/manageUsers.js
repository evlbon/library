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

    // 'addFaculty' ({ id,name  }) {
    //     Faculty.insert({
    //         libraryID: id,
    //         name: name,
    //         login:name,
    //         group:"Faculty",
    //         address:"None",
    //         phone:-1,
    //     });
    //     return id;
    // },


    // FACULTY members
    'addInstructor' ({ id,name  }) {
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

            Meteor.users.remove(ID2);
            User.remove({libraryID:ID2});

        } catch (e) {
            // handle this however you want

            throw new Meteor.Error('self-delete', 'Failed to remove yourself');
        }
    },
});