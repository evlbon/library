import {Books} from "../models/documents/book";
import {Copy} from "../models/documents/document";
import {JournalArticle} from "../models/documents/journal_article";
import {check, Match} from "meteor/check";
import {Author} from "../models/utility/author";
import {Meteor} from "meteor/meteor";
import {AVs} from "../models/documents/av";

Meteor.methods({

    'getDocument' (documentID) {

        let document = Books.findOne({_id: documentID});
        if(!document) document = JournalArticle.findOne({_id:documentID}); // new
        if(!document) document = AVs.findOne({_id:documentID}); // new

        return document;
    },

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

        let log = '"' + document.title + '" was changed. ';
        if (document.title !== title) log += ' Title ("' + document.title + '" -> "' + title + '") ';
        if (JSON.stringify(document.authorsID) !== JSON.stringify(authorsID)) log += ' Authors ("' +
            Author.find({ _id: { $in: document.authorsID} }).map(o => o.name).join(',')
            + '" -> "' +
            Author.find({ _id: { $in: authorsID} }).map(o => o.name).join(',') + '") ';
        if (document.edition !== edition) log += ' Edition ("' + document.edition + '" -> "' + edition + '") ';
        if (document.publisher !== publisher) log += ' Publisher ("' + document.publisher + '" -> "' + publisher + '") ';
        if (document.release_date.getFullYear() !== release_date.getFullYear()) log += ' ReleaseDate ("' + document.release_date.getFullYear() + '" -> "' + release_date.getFullYear() + '") ';
        if (document.price !== price) log += ' Price ("' + document.price + '" -> "' + price + '") ';
        if (JSON.stringify(document.tags) !== JSON.stringify(tags)) log += ' Tags ("' + document.tags.join(',') + '" -> "' + tags.join(',') + '") ';
        if (document.copies.length !== number_of_copies) log += ' Copies ("' + document.copies.length + '" -> "' + number_of_copies + '") ';
        if (document.bestseller !== bestseller) log += ' Bestseller ("' + document.bestseller + '" -> "' + bestseller + '") ';

        Meteor.call('addLog', log);

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
        title, authors=['Crowd'], editor, journal, release_date,
        price, number_of_copies, number_of_references, tags=[], bestseller=false
    }) {

        check(title, String);
        check(authors, [String]);
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
        document.editor = editor;
        document.journal = journal;
        document.release_date = release_date;
        document.price = price;
        document.copies = new_reference.concat(new_available).concat(new_checked);
        document.tags = tags;
        document.bestseller = bestseller;

        document.save();
    },

    'editAV' (documentID, {
        title, authors=['Crowd'],  release_date,
        price, number_of_copies, number_of_references, tags=[]
    }) {

        check(title, String);
        check(authors, [String]);

        check(release_date, Match.Maybe(Date));
        check(price, Match.Maybe(Number));
        check(number_of_copies, Number);
        check(number_of_references, Number);
        check(tags, [String]);

        let document = AVs.findOne({_id:documentID}); // new
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
        document.release_date = release_date;
        document.price = price;
        document.copies = new_reference.concat(new_available).concat(new_checked);
        document.tags = tags;

        document.save();
        document.save();
    }
});
