import React, { Component } from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.js';

import Book from '../Book.js';
import Article from '../Article';
import {Librarian} from "../../models/users/librarian"

import Users from "../User"
import {User} from "../../models/users/user";

import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Books } from '../../models/documents/book';
import { JournalArticle } from "../../models/documents/journal_article";

import { Meteor } from 'meteor/meteor';
import {Header} from "./Header";
import {ViewDocs} from "./ViewDocs"



class App extends Component {

    constructor() {
        //  "YKPFAF9gaMJWWNHFY"
        // Meteor.call('addLibrarian',{id : 'YKPFAF9gaMJWWNHFY'});
        super();
        this.case = null;
    }
    render() {

            // this.props.currentUser ? console.log( this.props.currentUser._id) : "";

        return <div className="container">

            <Header books={this.props.books} articles={this.props.articles} users={this.props.users} currentUser={this.props.currentUser}>
            </Header>
            <ViewDocs books={this.props.books} articles={this.props.articles} users={this.props.users} currentUser={this.props.currentUser}>
            </ViewDocs>
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