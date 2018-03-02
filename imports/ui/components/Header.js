import React from 'react';
import {Librarian} from "../../models/users/librarian";
import AccountsUIWrapper from '../AccountsUIWrapper.js';
import {Meteor} from "meteor/meteor";
import AddBookButton from "../../api/AddBookButton";
import AddArticleButton from "../../api/AddArticleButton";

export class Header extends React.Component{


    reanderCase2(number){

        switch (number) {

            case 1:
                Meteor.call('addLibrarian',{id : this.props.currentUser._id, name : this.props.currentUser.username,});

                break;
            case 2:
                Meteor.call('addStudent',{id : this.props.currentUser._id, name : this.props.currentUser.username,});

                break;
            case 3:
                Meteor.call('addFaculty',{id : this.props.currentUser._id, name : this.props.currentUser.username,});
                break;
            default:
                Meteor.call('addHumbleUser',{id : this.props.currentUser._id, name : this.props.currentUser.username,});

                break;

                render();;
        }

    }
    check()
    {
        // return true;
        if(this.props.currentUser)
        {
            if (Librarian.findOne({libraryID: this.props.currentUser._id}) )
                return false;
            return true;
        }
        return false;
    }

    render(){
        return (
            <header>

                <div id={"lab"}>
                    <h1>InnoLibrary</h1>

                    <AccountsUIWrapper/>
                </div>
                {
                    this.check() ?
                        <div className="linebar">


                            <button onClick={this.reanderCase2.bind(this,1)}>I am Librarian</button>
                            <button onClick={this.reanderCase2.bind(this, 3)}>I am faculty</button>
                            <button onClick={this.reanderCase2.bind(this, 2)}>I am a student</button>
                            <button onClick={this.reanderCase2.bind(this,4)}>I am just a humble user</button>

                        </div>:''
                }

                {
                    this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <div id={"add"} align="center">
                                    <AddBookButton/>
                                    <AddArticleButton/>
                                </div>
                                : ''
                            :""
                        : ""
                }



            </header>

        )
    }
}