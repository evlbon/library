import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";

// Book component - represents a single todo item
class Users extends Component {

    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS

        return (
            <li >
                {this.props.user instanceof Librarian ? <p>Librarian</p>:<p>Student</p>}

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Users);