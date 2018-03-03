import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import * as functions from "../models/documents/functions"
import {User} from "../models/users/user";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";
import {EditUser} from "../api/editUser";
import { Icon } from 'antd';



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
                console.log( this.props.user.name);
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
                <h1>User Name: {this.props.user.name}.</h1>
                    <p>Group: {this.props.user.group}.</p>
                    <p>Address:{this.props.user.address}.</p>
                        <p>Phone Number: {this.props.user.phone}.</p>
                    I want to :


                    {console.log(this.props.user.name)}
                    {console.log(this.props.user._id)}
                    {console.log(this.props.user.libraryID)}

                    <button onClick={this.renderCase.bind(this,1)}>Make Librarian</button>
                    <button onClick={this.renderCase.bind(this,2)}>Make student</button>
                    <button onClick={this.renderCase.bind(this,3)}>Make faculty</button>
                    <button onClick={this.renderCase.bind(this,4)}>Delete User</button>
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