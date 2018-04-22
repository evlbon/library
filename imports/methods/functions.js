import { Books } from "../models/documents/book";
import { JournalArticle } from "../models/documents/journal_article"
import { User } from "../models/users/user";
import { AVs } from "../models/documents/av";
import { Student } from "../models/users/student";
import { Log } from "../models/utility/log";


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
export function getUsersAVs(userID)
{
    let avs= [];
    AVs.find().forEach( o => {
        if (o.userHas(userID)) avs.push({title: o.title, tillDeadline: o.tillDeadline(userID)});
    });

    // console.log(books);
    return avs;
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



export function allUsers() {
    return User.find()
}

export function allPatrons() {
    return User.find({group: { $in: [ 'Student', 'Professor', 'TA', 'Instructor', 'Visiting' ] }})
}


export function preTime(id,userID) {
    let users = getRenters(id);
    let minT = 9999999;
    users.forEach(function(item) {
        if(item.tillDeadline<minT){
            minT=item.tillDeadline;
        }
    });
    if(users.length===0)
        minT=0;

    let document = Books.findOne({_id:id});
    let queue= document.queue.get_all_queue();
    let index = queue.indexOf(userID);
    let s=0;
    for(let i=0;i<index;i++){
        s+=document.time(queue[i])
    }

    return s+minT;
}

export function getLogs() {
    return Log.find()
}
