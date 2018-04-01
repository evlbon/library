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
import { AVs} from "../../models/documents/av";
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

        if (this.props.currentUser){
            if (this.props.users.length===0){
                Meteor.call('addLibrarian', {id: this.props.currentUser._id, name: this.props.currentUser.username})
            }
            else if(!User.findOne({libraryID : this.props.currentUser._id})){
                Meteor.call('addHumbleUser', {id: this.props.currentUser._id, name: this.props.currentUser.username})
            }

        }


        return <div className="container">

            <Header books={this.props.books} articles={this.props.articles} users={this.props.users} currentUser={this.props.currentUser} avs={this.props.avs}>
            </Header>
            <ViewDocs books={this.props.books} articles={this.props.articles} users={this.props.users} currentUser={this.props.currentUser} avs={this.props.avs}>
            </ViewDocs>
        </div>;
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
})(App);