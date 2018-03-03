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
 * Methods for adding / deletion docs
 */

Meteor.methods({
    'documents.addBook' ({
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

        let copies = [];
        for (let i=0; i<Math.min(number_of_copies, number_of_references); i++)
            copies.push(new Copy({reference: true, usersID: []}));
        for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
            copies.push(new Copy({reference: false, usersID: []}));

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
            group:"Faculty",
            address:"None",
            phone:-1,
        });
        return id;
    },
    'Delete'({ID, ID2}) {
        if (!Meteor.isServer) return;
        try {

            Meteor.users.remove(ID);
            User.remove({libraryID:ID2});

        } catch (e) {
            // handle this however you want

            throw new Meteor.Error('self-delete', 'Failed to remove yourself');
        }
    },
});

/**Modify users*/
Meteor.methods({
    'ModifyUser' ({ id,S}) {
       let str = S===1? "Librarian":S===2?"Student":"Faculty";
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

        let copies = document.copies;

        if (document.numberOfCopies() - document.leftInLibrary() > number_of_copies - number_of_references)
            throw Error('Number of already checked out books can\'t be more than available books after the change');

        // for (let i=0; i<Math.min(number_of_copies, number_of_references); i++)
        //     copies.push(new Copy({reference: true, usersID: []}));
        // for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
        //     copies.push(new Copy({reference: false, usersID: []}));

        let m_reference = document.copies.filter(o => o.reference);
        let m_checked = document.copies.filter(o => o.checked_out_date);
        let m_avaliable = document.copies.filter(o => o.checked_out_date);

            copies.push(new Copy({reference: true, usersID: []}));
        for (let i=Math.min(number_of_copies, number_of_references); i<number_of_copies; i++)
            copies.push(new Copy({reference: false, usersID: []}));

        let authorsID = [];
        authors.forEach(name => {
            let exist = Author.find({ name: name }).count();
            authorsID.push(
                exist ?
                    Author.findOne({ name: name })._id:
                    Author.insert({ name: name })
            );
        });

        document.title = title;
        document.authorsID = authorsID;
        document.edition = edition;
        document.publisher = publisher;
        document.release_date = release_date;
        document.price = price;
        document.copies = copies;
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

        if (!(document)) throw Error('Incorrect id of user or document');

        return document.renters();
    },

    'getUsersBooks' ({ userID }) {
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

        if (!(user && document)) throw Error('Incorrect id of user or document');

        if (document.userHas(userID)) {
            document.return(userID);
        } else {
            throw Error('User can\'t return a book, because he doesn\'t have it');
        }
    },
});

/*
* METHOD INTERFACES:
*
* addArticle
* addAV
* delAV
* changeTags
* changePrice
* addNewCopy
* removeCopy
* switchBestseller
* changeNumberOfReferences
* checkOut(user, document)
* return(document)
* getUsersOverdueDocuments
* calculateFine(document)
*
* */
