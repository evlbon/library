import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import Book from './Book.js';
import Article from './Article';
import {Librarian} from "../models/users/librarian"

import Users from "./User"
import {User} from "../models/users/user";

import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Books } from '../models/documents/book';
import { JournalArticle } from "../models/documents/journal_article";

import { Meteor } from 'meteor/meteor';
import AddBookButton from "../api/AddBookButton";
import AddArticleButton from "../api/AddArticleButton";
// App component - represents the whole app
import { Card, Col, Row } from 'antd';

class App extends Component {

    constructor() {
      //  "YKPFAF9gaMJWWNHFY"
       // Meteor.call('addLibrarian',{id : 'YKPFAF9gaMJWWNHFY'});
        super();
        this.case = null;
    }


    renderBooks() {
        if(Meteor.userId()) {
            return this.props.books.map((book) => (
                <Book key={book._id} book={book}/>
            ));
        }
    }

    renderArticles(){
        if(Meteor.userId()) {
            return this.props.articles.map((jarticle) => (
                <Article key={jarticle._id} jarticle={jarticle}/>
            ));
        }
    }

    renderUsers(){
        if(Meteor.userId()) {
            return this.props.users.map((user) => (
                <Users key={user._id} user={user}/>
            ));
        }
    }

    reanderCase(number){

        this.case ? this.case.style.display="none" : document.getElementById("books").style.display="none";

        switch (number) {
            case 1:
                document.getElementById("books").style.display="";
                this.case=document.getElementById("books");
                break;
            case 2:
                document.getElementById('articles').style.display="";
                this.case=document.getElementById("articles");
                break;
            case 3:
                document.getElementById('users').style.display="";
                this.case=document.getElementById("users");
                break;
            default:
                return("");
        }

    }


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
                break;

                render();
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
    render() {

            this.props.currentUser ? console.log( this.props.currentUser._id) : "";
        return <div className="container">

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

                <div className="linebar">
                    <button onClick={this.reanderCase.bind(this,1)}>Books</button>
                    <button onClick={this.reanderCase.bind(this,2)}>Articles</button>


                    {
                        this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                            <button onClick={this.reanderCase.bind(this,3)}>Users</button>
                            : ''
                        :""
                        :""
                    }

                </div>



            <ul id="books" style={{display:""}}>
                {this.renderBooks()}
            </ul>
            <ul id="articles" style={{display:"none"}}>
                {this.renderArticles()}
            </ul>

            <ul id="users" style={{display:"none"}}>
                {this.renderUsers()}
            </ul>

        </div>;
    }
}
export default withTracker(() => {
    return {
        books: Books.find({}).fetch(),
        articles : JournalArticle.find({}).fetch(),
        users : Librarian.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(App);