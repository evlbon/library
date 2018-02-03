import React, { Component } from 'react';
import { Books } from '../models/documents/book';
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
        const bookClassName = this.props.book.checked ? 'checked' : '';

        return (
            <li className={bookClassName}>



                { this.props.currentUser ?
                    <button className="delete" onClick={this.deleteThisBook.bind(this)}>
                        &times;
                    </button>
                    : ''
                }




                <span className="text">{this.props.book.title} by {this.props.book.publisher} </span>
            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Book);