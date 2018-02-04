import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";

// Book component - represents a single todo item
class Book extends Component {


    deleteThisBook() {
        Meteor.call('documents.delBook',{id : this.props.book._id})

    }

    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS

        return (
            <li >



                { this.props.currentUser ?
                    <button className="delete" onClick={this.deleteThisBook.bind(this)}>
                        &times;
                    </button>
                    : ''
                }

                <h1>Book</h1><br/>

                <span className="text">Title: {this.props.book.title} </span><br/>
                {/*<span className="text">Authors: {this.props.book.authors.map(o => o.name).join(', ')} </span><br/>*/}
                <span className="text">Publisher: {this.props.book.publisher} </span><br/>
                <span className="text">Year: {this.props.book.release_date.getFullYear()} </span><br/>
                <span className="text">Edition: {this.props.book.edition} </span><br/>
            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Book);