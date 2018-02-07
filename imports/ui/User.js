import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import * as functions from "../models/documents/functions"
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";

// Book component - represents a single todo item
class Users extends Component {
    renderBook(o) {
        return (
            <p>Book - "{o.title}" | {o.tillDeadline} days left.</p>
        );
    }

    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS
        let books = functions.getUsersBooks(this.props.user.libraryID);

        books ? books = books.map(o => ('Book - "' + o.title + '" | '+o.tillDeadline+' days left.')):"";
        console.log(books);
        return (

            <li >
                <h1>User - {this.props.user.name}</h1>
                {books ? <pre>{books.join("\n")}</pre>
                    :<p>Nothing</p>}
            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Users);