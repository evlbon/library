import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";
import {User} from "../models/users/user";
import * as functions from "../models/documents/functions"
import {EditBook} from "../api/editBook";

// Book component - represents a single todo item

class User_in_Queue extends Component{
    render(){
        let user = User.findOne({libraryID: this.props.userID});

        return(
            <a>{this.props.n}){user.name}({user.group})</a>
        )
    }


}

class Book2 extends Component {


    deleteThisBook() {
        Meteor.call('documents.delBook',{id : this.props.book._id, name: ["yury", "jojo" ]})
    }

    rentBook(id){
        Meteor.call("checkOut",{userID:this.props.currentUser._id, documentID:id});
    }
    enqueue(id){
        Meteor.call("enqueue",{userID:this.props.currentUser._id, documentID:id});
    }
    dequeue(id){
        Meteor.call("dequeue",{userID:this.props.currentUser._id, documentID:id});
    }

    returnBook(id){
        Meteor.call("returnDocument",{userID:this.props.currentUser._id, documentID:id});
    }

    accept(){
        Meteor.call("accept",{documentID : this.props.book._id})
    }
    deny(){
        Meteor.call("deny",{documentID : this.props.book._id})
    }


    render_Queue(){
        let queue = this.props.book.queue.get_all_queue();

        return(

            <div>

                {queue.map((id) => (<User_in_Queue key={id} userID={id} n={queue.indexOf(id)+1}/>))}

            </div>
        )

    }


    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS
        let rents = functions.getRenters(this.props.book._id);
        rents ? rents = rents.map(o => (o.name + '" | '+fun({date:o.tillDeadline})+' Fee is '+functions.calculateFee(o.libraryID,this.props.book._id))):"";

        let rents2 = null;

        this.props.currentUser ? rents2 = functions.getRentsViaId(this.props.book._id, this.props.currentUser._id):"";

        rents2 ? rents2 = rents2.map(o =>(fun({date:o.tillDeadline}) )):"";
        return (
            <li >




                {/*Filling the fields for Book description*/}
                <div className="BOOKBOX1">
                <h1>Book</h1><br/>

                <span className="text">Title: {this.props.book.title} </span><br/>
                <span className="text">Authors: {Author.find({ _id: { $in: this.props.book.authorsID} }).map(o => o.name).join(', ')} </span><br/>
                <span className="text">Publisher: {this.props.book.publisher} </span><br/>
                <span className="text">Year: {this.props.book.release_date ? this.props.book.release_date.getFullYear() : 'undefined'} </span><br/>
                <span className="text">Edition: {this.props.book.edition ? this.props.book.edition : 'undefined'} </span><br/>
                <span className="text">Price: {this.props.book.price} </span><br/>
                <span className="text">Tags: {this.props.book.tags.join(', ')} </span><br/>
                <span className="text">Copies available: {this.props.book.available()} / { this.props.book.numberOfCopies()} </span><br/>
                <span className="text">Bestseller: {this.props.book.bestseller ? 'yes' : 'no'} </span><br/>
                </div>







                <div className="BOOKBOX2">
                    <div style={{float:"left"}}>
                        <h1>Queue</h1><br/>
                        {this.render_Queue()}
                    </div>

                    <button className="delete"
                            onClick={this.accept.bind(this)}
                            disabled={functions.canAccept(this.props.book._id)}>Accept</button>
                    <button className="delete" onClick={this.deny.bind(this)}>Deny</button>

                </div>

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Book2);
function fun( date )
{
    console.log(date.date);
    if (date.date < 0)
    {
        let ff = - date.date;
        return "Overdue " + ff + " days.";
    }else return date.date + " days left.";
}