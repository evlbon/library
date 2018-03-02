
import {Librarian} from "../../models/users/librarian"

import { withTracker } from 'meteor/react-meteor-data';

import  React from 'react';
import {Meteor} from "meteor/meteor";
import {JournalArticle} from "../../../models/documents/journal_article";
import {Books} from "../../../models/documents/book";
export class ViewDocs extends React.Component{

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

    render(){
        return (
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





            <ul id="books" style={{display:""}}>
        {this.renderBooks()}
    </ul>
        <ul id="articles" style={{display:"none"}}>
            {this.renderArticles()}
        </ul>

        <ul id="users" style={{display:"none"}}>
            {this.renderUsers()}
        </ul>
            </div>
        );
    }
}
/*
export default withTracker(() => {
    return {
        books: Books.find({}).fetch(),
        articles : JournalArticle.find({}).fetch(),
        users : Librarian.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(ViewDocs);*/