import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import * as functions from "../models/documents/functions"
import {User} from "../models/users/user";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";

// Book component - represents a single todo item
class Users extends Component {

    renderCase(number){

        switch (number) {

            case 1:
                Meteor.call('addLibrarian',{id : this.props.user._id, name : this.props.user.username,});

                break;
            case 2:
                Meteor.call('addStudent',{id : this.props.user._id, name : this.props.user.username,});

                break;
            case 3:
                Meteor.call('addFaculty',{id : this.props.user._id, name : this.props.user.username,});

                break;
            default:
                break;

        }

    }


    renderUsers(user){


        let books = functions.getUsersBooks(user.libraryID);

        books ? books = books.map(o => ('Book - "' + o.title + '" | '+o.tillDeadline+' days left.')):"";


        return(
            <li >
                <h1>User - {user.name}</h1>
                {books.length ? <pre>{books.join("\n")}</pre>
                    :<p>Nothing</p>}
            </li>

    )

    }

    renderNewUser(){

        return(

            <li >
                <div className="USERBOX">
                <h1>User - {this.props.user.username}</h1>

                <div className="delete">

                    <button onClick={this.renderCase.bind(this,1)}>Make Librarian</button><br/>
                    <button onClick={this.renderCase.bind(this, 2)}>Make student</button><br/>
                    <button onClick={this.renderCase.bind(this,3)}>Make faculty</button><br/>

                </div>
                </div>

            </li>
        )

    }



    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS
        const user = User.findOne({libraryID : this.props.user._id});
        console.log(this.props.user);


        return (
            <div>
                {user?
                this.renderUsers(user):this.renderNewUser()
                }
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        wholeUsers: Meteor.users.find({}).fetch(),
    };
})(Users);