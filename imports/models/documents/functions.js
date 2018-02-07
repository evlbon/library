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