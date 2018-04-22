import {Books} from "../models/documents/book";
import {User} from "../models/users/user";
import {Meteor} from "meteor/meteor";
import * as functions from "./functions";
import {Log} from "../models/utility/log";

Meteor.methods({
    'enqueue' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);
        let queue = document.queue.get_queue(user.group);
        let log = 'User "' + User.findOne({libraryID: userID}).name + '" was enqueued for the document "' + document.title + '"';
        Meteor.call('addLog', log);

        queue.push(user.libraryID);
        document.save();
    },
    'dequeue' ({ userID, documentID }) {
        let user = User.findOne({libraryID: userID});
        let document = Meteor.call("getDocument",  documentID);

        let queue=null;
        let log = 'User "' + User.findOne({libraryID: userID}).name + '" was dequeued from the document "' + document.title + '"';
        Meteor.call('addLog', log);

        if(document.queue.outstanding_requests.indexOf(userID)>=0){
            queue = document.queue.outstanding_requests
        }
        else{
            queue = document.queue.get_queue(user.group);
        }
        queue.splice(queue.indexOf(userID),1);
        document.save();
    },
    'canAccept' ({ documentID }) {  // can accept first person in the queue
        let document = Meteor.call("getDocument",  documentID);
        return document.canAccept();
    },
    'accept' ({ documentID }) {  // accept first person in the queue
        let document = Meteor.call("getDocument",  documentID);
        let userID = document.queue.get_all_queue()[0];
        let log = 'User "' + User.findOne({libraryID: userID}).name + '" was accepted for the document "' + document.title + '"';
        Meteor.call('addLog', log);


        document.accept(userID);
        Meteor.call('dequeue', {userID: userID, documentID: documentID});
        Meteor.call("addNotification",{userID:userID,title:document.title,body:"You should go to library and take your '"+document.title+"'"});
    },
    'deny' ({ documentID }) {  // accept first person in the queue
        let document = Books.findOne({_id: documentID});
        let userID = document.queue.get_all_queue()[0];
        let log = 'User "' + User.findOne({libraryID: userID}).name + '" was denied for the document "' + document.title + '"';
        Meteor.call('addLog', log);


        Meteor.call('dequeue', {userID: userID, documentID: documentID})
    },
    'outstandingRequest'({ userID, documentID }) {

        let document = Meteor.call("getDocument",  documentID);

        let log = 'User "' + User.findOne({libraryID: userID}).name + '" made an outstanding request for the document "' + document.title + '"';
        Meteor.call('addLog', log);


        if(document.available()===0){
            let users = functions.getRenters(document._id);
            users.map((userr)=>( Meteor.call("addNotification",{userID:userr.libraryID,title:"return "+document.title,body:"You should return '"+document.title+"'"})))

        }

        let q = document.queue.getQueueWithoutOutstand();
        q.map((u)=>(Meteor.call("addNotification",{userID:u,title:"r",body:"We have "+(document.queue.outstanding_requests.length+1)+" outstanding requests in "+document.title+" usual queue will return when they get documents"})));

        if(document.queue.in_queue(userID)){
            let user = User.findOne({libraryID: userID});

            let queue=null;
            if(document.queue.outstanding_requests.indexOf(userID)>=0){
                queue = document.queue.outstanding_requests
            }
            else{
                queue = document.queue.get_queue(user.group);
            }
            queue.splice(queue.indexOf(userID),1);
        }

        document.queue.outstanding_requests.push(userID);

        document.save();
    },
});