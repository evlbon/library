import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import * as functions from "../models/documents/functions"
import {User} from "../models/users/user";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";
import {EditUser} from "../api/editUser";

// Book component - represents a single todo item
class Users extends Component {

    renderCase(number){

        switch (number) {

            case 1:
            case 2:
            case 3:
                Meteor.call('ModifyUser',{id:this.props.user.libraryID,S:number});
               // User.update({libraryID:this.props.user.libraryID},{$set:{group:"Librarian"}});
                break;
            case 4:
                console.log(this.props.user._id);
                console.log(this.props.user.libraryID);
                Meteor.call('Delete',{ID:this.props.user._id, ID2:this.props.user.libraryID});
                break;
            default:
                break;
        }
    }





    renderNewUser(){

        return(

            <li >
                <div className="USERBOX">
                    <h1>User login: {this.props.user.login}.</h1>
                    <p>Name : <strong>{this.props.user.name}.</strong></p>
                    <p>Group: <strong>{this.props.user.group}</strong>.</p>
                    <p>Address:<strong>{this.props.user.address}</strong>.</p>
                    <p>Phone Number: <strong>{this.props.user.phone}</strong>.</p>
                    I want this User to be:


                    {console.log(this.props.user.name)}
                    {console.log(this.props.user._id)}
                    {console.log(this.props.user.libraryID)}

                    <button onClick={this.renderCase.bind(this,1)}>Librarian,</button>
                    <button onClick={this.renderCase.bind(this,2)}>Student,</button>
                    <button onClick={this.renderCase.bind(this,3)}>Faculty,</button>
                    <button onClick={this.renderCase.bind(this,4)}>Deleted</button>
                    <p></p>
                    <EditUser ID = {this.props.user.libraryID}/>


            </div>
            </li>
        )

    }


    AmILibrarian(){
        return this.props.currentUser ?
            Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" :false:false;
    }
    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS
        if(!this.AmILibrarian())
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
        wholeUsers: Meteor.users.find({}).fetch(),
    };
})(Users);