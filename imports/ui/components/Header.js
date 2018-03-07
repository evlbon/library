import React from 'react';
import {Librarian} from "../../models/users/librarian";
import AccountsUIWrapper from '../AccountsUIWrapper.js';
import {Meteor} from "meteor/meteor";
import AddBookButton from "../../api/AddBookButton";
import AddArticleButton from "../../api/AddArticleButton";
import AddNewUser from "../../api/AddNewUser"
import AddAVButton from "../../api/AddAVButton";
export class Header extends React.Component{




    render(){
        return (
            <header>

                <div id={"lab"}>
                    <h1>InnoLibrary</h1>

                    <AccountsUIWrapper/>
                </div>

                {
                    this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <div id={"add"} align="center">
                                    <AddBookButton/>
                                    <AddArticleButton/>
                                    <AddNewUser/>
                                    <AddAVButton/>
                                </div>
                                : ''
                            :""
                        : ""
                }



            </header>

        )
    }
}