import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import * as functions from "../../models/documents/functions"
import {User} from "../../models/users/user";
import {Author} from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import {Admin} from "../../models/users/admin";
import {EditUser} from "../../api/editUser";

// Book component - represents a single todo item
class Users extends Component {

    renderCase(number) {
        console.log(this.props.currentUser.username);
        console.log(this.props.user.login);
        if (this.props.currentUser.username === this.props.user.login) {
            window.alert("You can not modify your self!!!");
            return;
        }

        switch (number) {

            case 1:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian") {
                    window.alert("Only for admin!");
                    return;
                }
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                if (Libxrarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian" &&
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group === "Librarian") {
                    window.alert("You cannot modify librarians!");
                    return;
                }

                else if (Admin.findOne({libraryID: this.props.user.libraryID}).group === "Admin") {
                    window.alert("You cannot modify admin!");
                    return;
                }
                else
                    Meteor.call('ModifyUser', {id: this.props.user.libraryID, S: number});
                // User.update({libraryID:this.props.user.libraryID},{$set:{group:"Librarian"}});
                break;
            case 7:
                console.log(this.props.user._id);
                console.log(this.props.user.libraryID);
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian" &&
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group === "Librarian") {
                    window.alert("You cannot modify librarians!");
                    return;
                }

                else if (Admin.findOne({libraryID: this.props.user.libraryID}).group === "Admin") {
                    window.alert("You cannot modify admin!");
                    return;
                }
                else
                    Meteor.call('Delete', {ID: this.props.user._id, ID2: this.props.user.libraryID});
                break;
            default:
                break;
        }
    }


    renderNewUser() {
        let user = this.props.wholeUsers.findOne({_id: this.props.user.libraryID});
        return (

            <li>
                <div className="USERBOX">
                    <h1>User login: {this.props.user.login}</h1>
                    <p>Name : <strong>{this.props.user.name}</strong></p>
                    <p>Group: <strong>{this.props.user.group}</strong></p>
                    <p>Address:<strong>{this.props.user.address}</strong></p>
                    <p>Phone Number: <strong>{this.props.user.phone}</strong></p>
                    <p>LibraryID: <strong>{this.props.user.libId}</strong></p>
                    Make this User:


                    <button onClick={this.renderCase.bind(this, 1)}>Librarian</button>
                    <button onClick={this.renderCase.bind(this, 2)}>Student</button>
                    <button onClick={this.renderCase.bind(this, 3)}>Visiting Professor</button>
                    <button onClick={this.renderCase.bind(this, 4)}>Professor</button>
                    <button onClick={this.renderCase.bind(this, 5)}>Instructor</button>
                    <button onClick={this.renderCase.bind(this, 6)}>Teaching Assistant</button>

                    <button onClick={this.renderCase.bind(this, 7)}>Delete</button>

                </div>
                <EditUser ID={this.props.user.libraryID}/>
            </li>
        )

    }


    AmILibrarian() {
        return this.props.currentUser ?
            Librarian.findOne({libraryID: this.props.currentUser._id}) || Admin.findOne({libraryID: this.props.currentUser._id}) ?
                Librarian.findOne({libraryID: this.props.currentUser._id}).group || Admin.findOne({libraryID: this.props.currentUser._id})
                === "Librarian" || "Admin" : false : false;
    }


    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS
        if (!this.AmILibrarian())
            return "";
        console.log(this.props.user);
        return (
            <div>
                {this.renderNewUser()}
            </div>
        );

    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        wholeUsers: Meteor.users,
    };
})(Users);