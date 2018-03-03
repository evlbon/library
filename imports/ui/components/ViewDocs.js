import React from 'react';
import Book from '../Book.js';
import Article from '../Article';
import {Librarian} from "../../models/users/librarian"
import Users from "../User"
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class ViewDocs extends React.Component {

    constructor() {
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

    render() {

        this.props.currentUser ? console.log( this.props.currentUser._id) : "";

        return  <div>
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