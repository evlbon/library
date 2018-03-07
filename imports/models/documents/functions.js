import { Books } from "./book";
import { JournalArticle } from "./journal_article"
import { Meteor } from 'meteor/meteor';
import { User } from "../users/user";
import {AVs} from "./av";
import { Librarian} from "../users/librarian";
import { Author } from "../utility/author";
import { check } from 'meteor/check'
import { Match } from 'meteor/check'
import { Copy, Document } from "./document"
import Article from "../../ui/Article";
import { Student } from "../users/student";
import { Faculty } from "../users/faculty";

export function getUsersBooks(userID) {
    let books = [];
    Books.find().forEach( o => {
        if (o.userHas(userID)) books.push({title: o.title, tillDeadline: o.tillDeadline(userID)});
    });

    // console.log(books);
    return books;
}
export function getUsersArticles(userID)
{
    let jarticles = [];
    JournalArticle.find().forEach( o => {
        if (o.userHas(userID)) jarticles.push({title: o.title, tillDeadline: o.tillDeadline(userID)});
    });

    // console.log(books);
    return jarticles;
}

export function getRenters(documentID) {
    let document = Books.findOne({_id: documentID});
    if(!(document)) document = JournalArticle.findOne({_id:documentID});
    if(!(document)) document = AVs.findOne({_id:documentID});// new
    if (!(document)) throw Error('Incorrect id of user or document');

    return document.renters();
}
export function getRentsViaId(documentID,cuzer){
    let document = Books.findOne({_id: documentID});
    if(!(document)) document = JournalArticle.findOne({_id:documentID});
    if(!(document)) document = AVs.findOne({_id:documentID});// new
    // console.log(cuzer);
    return document.rentingViaId(cuzer);
}

export function canCheckOut(userID, documentID) {
    let user = User.findOne({libraryID: userID});
    let document = Books.findOne({_id: documentID});
    if(!(document)) document = JournalArticle.findOne({_id:documentID});
    if(!(document)) document = AVs.findOne({_id:documentID});// new
    if (!(user && document)) throw Error('Incorrect id of user or document');

    return document.canCheckOut(userID);
}

export function hasDocument(userID, documentID){
    let user = User.findOne({libraryID: userID});
    let document = Books.findOne({_id: documentID});
    if(!(document)) document = JournalArticle.findOne({_id:documentID});
    if(!(document)) document = AVs.findOne({_id:documentID});// new
    if (!(user && document)) throw Error('Incorrect id of user or document');

    return document.userHas(userID);
}

export function calculateFee(userID, documentID) {
    let user = User.findOne({libraryID: userID});
    let document = Books.findOne({_id: documentID});
    if(!(document)) document = JournalArticle.findOne({_id:documentID});
    if(!(document)) document = AVs.findOne({_id:documentID});// new
    if (!(user && document)) throw Error('Incorrect id of user or document');

    return document.calculateFee(userID);
}

export function canEditDocument(documentID, number_of_copies, number_of_references) {
    let document = Books.findOne({_id:documentID});
    if(!(document)) document = JournalArticle.findOne({_id:documentID});
    if(!(document)) document = AVs.findOne({_id:documentID});// new
    return (document.numberOfCopies() - document.leftInLibrary() <= number_of_copies - number_of_references)
}