import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";
import {User} from "../models/users/user";
import * as functions from "../models/documents/functions"
import {EditBook} from "../api/editBook";

// Book component - represents a single todo item
class Book extends Component {


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

                <div className='boxButtons'>
                    { this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <button className="delete" onClick={this.deleteThisBook.bind(this)}>
                                    Delete
                                </button>
                                : ''
                            :""
                        :""
                    }


                    <br/>

                    { this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <EditBook id={this.props.book._id}/>
                            : ''
                        :""
                    :""}
                    <br/>




                    {  functions.canCheckOut(this.props.currentUser._id,this.props.book._id)?


                            this.props.currentUser ?
                                User.findOne({libraryID : this.props.currentUser._id}) ?
                                    <button className="delete" onClick={this.rentBook.bind(this,this.props.book._id)}
                                        disabled={!(functions.canCheckOut(this.props.currentUser._id,this.props.book._id))}>
                                    Rent
                                </button>
                                    :""
                                :"":
                            this.props.currentUser ?
                                User.findOne({libraryID : this.props.currentUser._id}) ?
                                    <div>
                                    <button className="delete" onClick={this.enqueue.bind(this,this.props.book._id)}
                                                               disabled={this.props.book.queue.in_queue(this.props.currentUser._id)}>
                                        Enqueue
                                    </button>

                                    <button className="delete" onClick={this.dequeue.bind(this,this.props.book._id)}
                                                               disabled={!(this.props.book.queue.in_queue(this.props.currentUser._id))}>
                                        Dequeue
                                    </button>

                                    </div>
                                    :""
                                :""


                    }



                    <br/>

                    { this.props.currentUser ?
                        User.findOne({libraryID : this.props.currentUser._id}) ?
                            <button className="delete" onClick={this.returnBook.bind(this,this.props.book._id)}
                                    disabled={!(functions.hasDocument(this.props.currentUser._id, this.props.book._id))}>
                                Return
                            </button>
                            :""
                        :""
                    }



                </div>




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



                {
                    this.props.currentUser ?
                    Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                            <div className="BOOKBOX2">
                                <h1>Rents</h1><br/>
                                {rents ? <pre>{rents.join("\n")}</pre>
                                    :<p>Nothing</p>}
                            </div>
                            : ''
                        :""
                    :""

                }



                {
                    this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Student" ?
                                <div className="BOOKBOX2">
                                    <h1>RENTS</h1><br/>
                                    {rents2 ? <pre>{rents2.join("\n")}</pre>
                                        :<p>Nothing</p>}
                                </div>
                                : ''
                            :""
                        :""
                }

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Book);
function fun( date )
{
    console.log(date.date);
    if (date.date < 0)
    {
        let ff = - date.date;
        return "Overdue " + ff + " days.";
    }else return date.date + " days left.";
}