import {Component} from "react";
import React from "react";
import {ViewDocs} from "./ViewDocs";
import {Meteor} from "meteor/meteor";
import {User} from "../../models/users/user";
import {JournalArticle} from "../../models/documents/journal_article";
import {AVs} from "../../models/documents/av";
import {Books} from "../../models/documents/book";
import { withTracker } from 'meteor/react-meteor-data';
import Book from "../Book";
import AddBookButton from "../../api/AddBookButton";
import {Librarian} from "../../models/users/librarian";
import Users from "../User";
import Users2 from "../User2";
import AddArticleButton from "../../api/AddArticleButton";
import AddNewUser from "../../api/AddNewUser";

class USERS extends Component{
    constructor() {
        super();
        this.case = null;
    }

    reanderCase(number){

        this.case ? this.case.style.display="none" : document.getElementById("users").style.display="none";

        switch (number) {
            case 1:
                document.getElementById('users').style.display="";
                this.case=document.getElementById("users");
                break;
            case 2:
                document.getElementById('users2').style.display="";
                this.case=document.getElementById("users2");
                break;
            default:
                return("");
        }

    }

    renderUsers(){
        if(Meteor.userId()) {
            return this.props.users.map((user) => (
                <Users key={user._id} user={user}/>
            ));
        }
    }
    renderUser2s(){
        if(Meteor.userId()) {
            return this.props.users.map((user) => (
                <Users2 key={user._id} user={user}/>
            ));
        }
    }

    render(){
        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        return(

                    <div>
                        {isLabrarian?
                        <div>

                            <div className="menu">

                                <h2 align="center">MENU</h2><br/>
                                <button onClick={this.reanderCase.bind(this, 1)} className="myButton">All Users</button>
                                <button onClick={this.reanderCase.bind(this, 2)} className="myButton">User Stories</button>
                                <AddNewUser/>

                            </div>

                            <div className="content">
                                <ul id="users">
                                    {this.renderUsers()}
                                </ul>
                                <ul id="users2" style={{display: "none"}}>
                                    {this.renderUser2s()}
                                </ul>
                            </div>
                        </div>
                            :""}
                    </div>








        )
    }
}


export default withTracker(() => {
    return {
        books: Books.find({}).fetch(),
        articles : JournalArticle.find({}).fetch(),
        avs : AVs.find({}).fetch(),
        users : User.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(USERS);
