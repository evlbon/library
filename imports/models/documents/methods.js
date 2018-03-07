import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { User } from "../users/user";
import { Librarian} from "../users/librarian";
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy, Document } from "./document"
import { JournalArticle } from "./journal_article";
import { Student } from "../users/student";
import { Faculty } from "../users/faculty";

/**
 * Methods for adding / deletion docs مراجل
 */

Meteor.methods({

    'documents.addBook' ({
                             title, authors, edition, publisher, release_date,
                             price, number_of_copies, number_of_references, tags=[], bestseller=false
    }) {
        check(title, String);
        check(authors, [String]);
        check(edition, Match.Maybe(String));
        check(publisher, Match.Maybe(String));
        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(number_of_copies, Number);
        check(number_of_references, Number);
        check(tags, [String]);
        check(bestseller, Boolean);

        if (authors.length === 0 || authors[0] === '') authors = ['Crowd'];

        let copies = [];
        for (let i=0; i<Math.min(number_of_copies, number_of_references); i++)
            copies.push(new Copy({reference: true}));
        for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
            copies.push(new Copy({reference: false}));

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })
            );
        });

        return Books.insert({
            title: title,
            authorsID: authorsID,
            edition: edition,
            publisher: publisher,
            release_date: release_date,
            price: price,
            copies: copies,
            tags: tags,
            bestseller: bestseller
        });
    },

    'documents.addArticle' ({
                             title,authors=['Crowd'], editor, release_date,
                             price, copies=[], tags=[], journal
                         }){

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })
            );
        });

        return JournalArticle.insert({
            title: title,
            authorsID: authorsID,
            journal: journal,
            editor: editor,
            release_date: release_date,
            price: price,
            copies: copies,
            tags: tags
        });

    },

    'documents.delBook' ({ id }) {
        Books.remove(id);
    },

    'documents.delArticle' ({ id }) {
        JournalArticle.remove(id);
    },
});


/**
 * Manage users
 */
Meteor.methods({
    'addLibrarian' ({ id,name }) {
        Librarian.insert({
            libraryID: id,
            login:name,
            name: name,
            group:"Librarian",
            address:"None",
            phone:-1,
        });

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
        });

        return id;
    },

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


    'addFaculty' ({ id,name  }) {
        Faculty.insert({
            libraryID: id,
            name: name,
            login:name,
            group:"Faculty",
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

/**Modify users*/
Meteor.methods({
    'addUser'({name,password,phone,address}){


        Accounts.createUser({
            username:name,
            email : "",
            password : password,
            profile  : {
                //publicly visible fields like firstname goes here
            }
        });
        let LID  =Meteor.users.findOne({username:name})._id;
        let S = 2;
        Meteor.call('addHumbleUser', {id: LID, name: name});
        S = 0;
        Meteor.call('ModifyUser',{id:LID,S:S});
    },
    'ModifyUser' ({ id,S}) {
        let str = "";
        if(S===0)
            str = "HumbleUser";
        else
       str = S===1? "Librarian":S===2?"Student":"Faculty";
        User.update({libraryID:id},{$set:{group:str}});
        return id;
    },
    'ModifyUserProperties' ({id,name,group,phone,address}){
        if(name.length)
            User.update({libraryID:id},{$set:{name:name}});
        if(group.length)
            User.update({libraryID:id},{$set:{group:group}});
        if(phone.length)
            User.update({libraryID:id},{$set:{phone:Number(phone)}});
        if(address.length)
            User.update({libraryID:id},{$set:{address:address}});
    },
});

/**
 * Manage documents
 */


Meteor.methods({
    'canEditDocument' (documentID, number_of_copies, number_of_references) {
        return (document.numberOfCopies() - document.leftInLibrary() <= number_of_copies - number_of_references)
    },

    'editBook' (documentID, {
                    title, authors=['Crowd'], edition, publisher, release_date,
                    price, number_of_copies, number_of_references, tags=[], bestseller=false
                }) {
        check(title, String);
        check(authors, [String]);
        check(edition, Match.Maybe(String));
        check(publisher, Match.Maybe(String));
        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(number_of_copies, Number);
        check(number_of_references, Number);
        check(tags, [String]);
        check(bestseller, Boolean);

        let document = Books.findOne({_id: documentID});
        if (!document) throw Error('Incorrect id of a document');

        if (document.numberOfCopies() - document.leftInLibrary() > number_of_copies - number_of_references)
            throw Error('Number of already checked out books can\'t be more than available books after the change');

        let old_reference = document.copies.filter(o => o.reference);
        let old_available = document.copies.filter(o => !o.checked_out_date && !o.reference);

        let new_checked = document.copies.filter(o => o.checked_out_date && !o.reference);

        let number_of_available = number_of_copies - number_of_references - new_checked.length;

        let new_reference = old_reference.splice(0, number_of_references);
        let new_available = old_available.splice(0, number_of_available);

        old_reference = old_reference.map(function(o){o.reference=false; return o});
        old_available = old_available.map(function(o){o.reference=true; return o});

        new_reference = new_reference.concat(old_available.splice(0, number_of_references - new_reference.length));
        new_available = new_available.concat(old_reference.splice(0, number_of_available - new_available.length));

        for (let i = new_reference.length; i < number_of_references; i++)
            new_reference.push(new Copy({reference: true}));
        for (let i = new_available.length; i < number_of_available; i++)
            new_available.push(new Copy({reference: false}));

        let authorsID = [];

        authors.forEach(name => {
            let exist = Author.find({name: name}).count();
            authorsID.push(
                exist ?
                    Author.findOne({name: name})._id :
                    Author.insert({name: name})
            );
        });

        document.title = title;
        document.authorsID = authorsID;
        document.edition = edition;
        document.publisher = publisher;
        document.release_date = release_date;
        document.price = price;
        document.copies = new_reference.concat(new_available).concat(new_checked);
        document.tags = tags;
        document.bestseller = bestseller;

        document.save();
    },

    'editArticle' (documentID, {
        title, editors=['Crowd'], editor, journal, release_date,
        price, number_of_copies, number_of_references, tags=[], bestseller=false
    }) {
        check(title, String);
        check(editors, [String]);
        check(editor, Match.Maybe(String));
        check(journal, Match.Maybe(String));
        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(number_of_copies, Number);
        check(number_of_references, Number);
        check(tags, [String]);
        check(bestseller, Boolean);

        let document = JournalArticle.findOne({_id:documentID}); // new
        if (!document) throw Error('Incorrect id of a document');

        if (document.numberOfCopies() - document.leftInLibrary() > number_of_copies - number_of_references)
            throw Error('Number of already checked out books can\'t be more than available books after the change');

        let old_reference = document.copies.filter(o => o.reference);
        let old_available = document.copies.filter(o => !o.checked_out_date && !o.reference);

        let new_checked = document.copies.filter(o => o.checked_out_date && !o.reference);

        let number_of_available = number_of_copies - number_of_references - new_checked.length;

        let new_reference = old_reference.splice(0, number_of_references);
        let new_available = old_available.splice(0, number_of_available);

        old_reference = old_reference.map(function(o){o.reference=false; return o});
        old_available = old_available.map(function(o){o.reference=true; return o});

        new_reference = new_reference.concat(old_available.splice(0, number_of_references - new_reference.length));
        new_available = new_available.concat(old_reference.splice(0, number_of_available - new_available.length));

        for (let i = new_reference.length; i < number_of_references; i++)
            new_reference.push(new Copy({reference: true}));
        for (let i = new_available.length; i < number_of_available; i++)
            new_available.push(new Copy({reference: false}));

        let authorsID = [];

        editors.forEach(name => {
            let exist = Author.find({name: name}).count();
            authorsID.push(
                exist ?
                    Author.findOne({name: name})._id :
                    Author.insert({name: name})
            );
        });

        document.title = title;
        document.authorsID = authorsID;
        document.editor = editor;
        document.journal = journal;
        document.release_date = release_date;
        document.price = price;
        document.copies = new_reference.concat(new_available).concat(new_checked);
        document.tags = tags;
        document.bestseller = bestseller;

        document.save();
    }
});


/**
 * Checking out system
 */
Meteor.methods({
    'canCheckOut' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});

        if (!(user && document)) throw Error('Incorrect id of user or document');

        return document.canCheckOut(userID);
    },

    'checkOut' ({ userID, documentID }) {

        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});
        if(!(document)) document = JournalArticle.findOne({_id:documentID}); // new
        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.canCheckOut(userID)) {
            document.checkOut(userID);
        } else {
            if (document.userHas(userID))
                throw Error('Can\'t check out more than one same book');
            else
                throw Error('No book available');
        }
    },

    'getRenters' ({ documentID }) {
        let document = Books.findOne({_id: documentID});
        if(!(document)) document = JournalArticle.findOne({_id:documentID}); // new
        if (!(document)) throw Error('Incorrect id of user or document');

        return document.renters();
    },

    'getUsersBooks' ({ userID }) {/// needs editing
        let books = [];
        Books.find().forEach( o => {
            if (o.userHas(userID)) books.push({title: o.title, tillDeadline: o.tillDeadline(userID)});
        });
        return books;
    },

    'numberOfReferences' ({ documentID }) {
        let document = Books.findOne({_id: documentID});

        if (!(document)) throw Error('Incorrect id of user or document');

        return document.numberOfReferences();
    },

    'leftInLibrary' ({ documentID }) {
        let document = Books.findOne({_id: documentID});

        if (!(document)) throw Error('Incorrect id of user or document');

        return document.leftInLibrary();
    }
});


/**
 * Return system
 */
Meteor.methods({
    'hasDocument' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});

        if (!(user && document)) throw Error('Incorrect id of user or document');

        return document.userHas(userID);
    },
    'returnDocument' ({ userID, documentID }) {

        let user = User.findOne({libraryID: userID});
        let document = Books.findOne({_id: documentID});
        if(!(document)) document = JournalArticle.findOne({_id:documentID}); // new
        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.return(userID);
        } else {
            throw Error('User can\'t return a book, because he doesn\'t have it');
        }
    },

});