import { Books } from "./book";
import { Meteor } from 'meteor/meteor';
import { User } from "../users/user";
import { Librarian} from "../users/librarian";
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy, Document } from "./document"
import { JournalArticle } from "./journal_article";
import Article from "../../ui/Article";
import { Student } from "../users/student";
import { Faculty } from "../users/faculty";

export function getUsersBooks(userID) {
    let books = [];
    Books.find().forEach( o => {
        if (o.userHas(userID)) books.push({title: o.title, tillDeadline: o.tillDeadline(userID)});
    });
    console.log(books);
    return books;
}

export function getRenters(documentID) {
    let document = Books.findOne({_id: documentID});

    if (!(document)) throw Error('Incorrect id of user or document');

    return document.renters();
}
export function getRentsViaId(documentID,cuzer){
    let document = Books.findOne({_id: documentID});
    console.log(cuzer);
    return document.rentingViaId(cuzer);
}

export function canCheckOut(userID, documentID) {
    let user = User.findOne({libraryID: userID});
    let document = Books.findOne({_id: documentID});

    if (!(user && document)) throw Error('Incorrect id of user or document');

    return document.canCheckOut(userID);
}

export function hasDocument(userID, documentID){
    let user = User.findOne({libraryID: userID});
    let document = Books.findOne({_id: documentID});

    if (!(user && document)) throw Error('Incorrect id of user or document');

    return document.userHas(userID);
}