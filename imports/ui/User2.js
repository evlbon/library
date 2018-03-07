import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import * as functions from "../models/documents/functions"
import {User} from "../models/users/user";
import { Author } from "../models/utility/author";
import {Librarian} from "../models/users/librarian";

// Book component - represents a single todo item
class Users2 extends Component {

    renderCase(number){

        switch (number) {

            case 1:
            case 2:
            case 3:
                Meteor.call('ModifyUser',{id:this.props.user.libraryID,S:number});
                // User.update({libraryID:this.props.user.libraryID},{$set:{group:"Librarian"}});
                break;
            case 4:
                // console.log(this.props.user._id);
                // console.log( this.props.user.name);
                Meteor.call('Delete',{ID:this.props.user._id, ID2:this.props.user.libraryID});
                break;
            default:
                break;
        }
    }


    renderUsers(){


        let books = functions.getUsersBooks(this.props.user.libraryID);

        books ? books = books.map(o => ('Book - "' + o.title + '" | '+fun({date:o.tillDeadline}))):"";

        let jarticles = functions.getUsersArticles(this.props.user.libraryID);

        let avs = functions.getUsersAVs(this.props.user.libraryID);
        avs ? avs = avs.map(o => ('AV - "' + o.title + '" | '+fun({date:o.tillDeadline}))):"";


        return(
            <li >
                <h1>User - {this.props.user.name}</h1>
                {books.length ? <pre>{books.join("\n")}</pre>
                    :<p>No Book rental records</p>}

                {jarticles.length ? <pre>{jarticles.join("\n")}</pre>
                    :<p>No Journal article rental record</p>}

                {avs.length ? <pre>{avs.join("\n")}</pre>
                    :<p>No Journal AVs rental record</p>}
            </li>

        )

    }

    renderNewUser(){
        let books = this.renderUsers();
        return(

            <li >
                <div className="USERBOX">
                    <h1>User - {this.props.user.name}</h1>
                    Current Type {this.props.user.group}
                    {console.log(this.props.user.name)}
                    {console.log(this.props.user._id)}
                    {console.log(this.props.user.libraryID)}

                    {books.length? books.join("\n"):"Nothing"}

                    <div className="delete">
                        <button onClick={this.renderCase.bind(this,1)}>Make Librarian</button><br/>
                        <button onClick={this.renderCase.bind(this,2)}>Make student</button><br/>
                        <button onClick={this.renderCase.bind(this,3)}>Make faculty</button><br/>
                        <button onClick={this.renderCase.bind(this,4)}>Delete User</button><br/>

                    </div>
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
        const  user = User.findOne({libraryID : this.props.user._id});
        // console.log(this.props.user);
        return (
            <div>

                {this.renderUsers()}

            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        wholeUsers: Meteor.users.find({}).fetch(),
    };
})(Users2);
function fun( date )
{
    console.log(date.date);
    if (date.date < 0)
    {
        let ff = - date.date;
        return "Overdue " + ff + " days.";
    }else return date.date + " days left.";
}