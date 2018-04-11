import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Author } from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import {User} from "../../models/users/user";
import * as functions from "../../models/documents/functions"
import {EditBook} from "../../api/editBook";
import { Popover, Button } from 'antd';


class OutUsers extends Component{
    f(){
        Meteor.call('outstandingRequest', {userID: this.props.user.libraryID, documentID: this.props.book._id});
    }

    render(){
        return(

            <div>
                <button style={{width:"150px", margin:"1px"}} onClick={this.f.bind(this)}>{this.props.user.name}</button><br/>
            </div>
        )

    }


}

class UserWithBook extends Component{
    fun( date )
    {
        if (date.date < 0)
        {
            let ff = - date.date;
            return "Overdue " + ff + " days.";
        }else return date.date + " days left.";
    }

    returnBook(){
        Meteor.call("returnDocument",{userID:this.props.user.libraryID, documentID:this.props.book._id});
    }


    render(){
        let o = this.props.user;
        return(
            <div>
                {o.name + ' | '+this.fun({date:o.tillDeadline})+' Fee is '+functions.calculateFee(o.libraryID,this.props.book._id)}
                <button onClick={this.returnBook.bind(this)}
                        disabled={!(functions.hasDocument(o.libraryID, this.props.book._id))}>
                    Return
                </button>
            </div>


        )
    }
}


class Book extends Component {


    deleteThisBook() {
        Meteor.call('documents.delBook',{id : this.props.book._id})
    }

    renderOutUsers(){
        return(
            <div>
                {functions.allPatrons().map((user)=>(<OutUsers key={user.libraryID} user={user} book={this.props.book}/>))}
            </div>
        )
    }


    renderUsers(){
        let users = functions.getRenters(this.props.book._id);
        return(
            <div>
                {users.map((user)=>(<UserWithBook key={user.libraryID} user={user} book={this.props.book}/>))}
            </div>
        )
    }


    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS


        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
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


                <div className="BOOKBOX2">
                    {this.renderUsers()}
                </div>


                <div style={{float:"right"}}>
                    <Popover content={this.renderOutUsers()} placement="bottom" title="Choose User">
                        <Button  type="primary">Outstanding request</Button>
                    </Popover>


                </div>






            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Book);



