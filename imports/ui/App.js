import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import Book from './Book.js';
import Article from './Article';
import {Librarian} from "../models/users/librarian"
import {User} from "../models/users/user"
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Books } from '../models/documents/book';
import { JournalArticle } from "../models/documents/journal_article";

import { Meteor } from 'meteor/meteor';
// App component - represents the whole app

class App extends Component {


    renderBooks() {
        return this.props.books.map((book) => (
            <Book key={book._id} book={book} />
        ));
    }

    renderArticles(){
        return this.props.articles.map((jarticle) => (
            <Article key={jarticle._id} jarticle={jarticle} />
        ));
    }

    render() {



        return (
            <div className="container">

                <header>

                    <div id={"lab"}>
                        <h1>InnoLibrary</h1>

                        <AccountsUIWrapper />
                    </div>

                    <div id={"add"} align="center">
                        <div id="AddBookButton"/>
                        <div id="AddArticleButton"/>
                    </div>


                </header>


                <ul>
                    {this.renderBooks()}
                    {this.renderArticles()}

                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        books: Books.find({}).fetch(),
        articles : JournalArticle.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(App);