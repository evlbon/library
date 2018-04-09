import React, { Component } from 'react';
import {Librarian} from "../../models/users/librarian"
import {User} from "../../models/users/user";

import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {BrowserRouter, Route, Link} from "react-router-dom"
import BOOKS, {Allbooks, Allbooks2} from "./BOOKS";
import ARTICLES, {AllArticles} from "./ARTICLES";
import AaV, {AllAVs} from "./AaV";
import USERS, {AllUsers, UserStories} from "./USERS";
import Home from "./App";
import {Books} from "../../models/documents/book";
import {JournalArticle} from "../../models/documents/journal_article";
import {AVs} from "../../models/documents/av";





class Navigation extends Component{

    render(){
        if (this.props.currentUser){
            if (this.props.users.length===0){
                Meteor.call('addLibrarian', {id: this.props.currentUser._id, name: this.props.currentUser.username})
            }
            else if(!User.findOne({libraryID : this.props.currentUser._id})){
                Meteor.call('addHumbleUser', {id: this.props.currentUser._id, name: this.props.currentUser.username})
            }

        }

        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
        return(

            <BrowserRouter>

                <div className="container">


                    <Route path="/" component={Home} />

                    <Route path="/books" component={BOOKS} />
                    <Route exact path="/books/rentedBooks" component={()=>(<Allbooks books={this.props.books}/>)}/>
                    <Route exact path="/books/allbooks" component={()=>(<Allbooks2 books={this.props.books}/>)}/>

                    <Route path="/articles" component={ARTICLES} />
                    <Route exact path="/articles/allarticles" component={()=>(<AllArticles articles={this.props.jarticles}/>)} />

                    <Route path="/av" component={AaV} />
                    <Route exact path="/av/allavs" component={()=>(<AllAVs avs={this.props.avs}/>)} />

                    <Route path="/users" component={USERS} />
                    <Route exact path="/users/allusers" component={()=>(<AllUsers users={this.props.users}/>)} />
                    <Route exact path="/users/userstories" component={()=>(<UserStories users={this.props.users}/>)} />




                </div>
            </BrowserRouter>




        )

    }
}


export default withTracker(() => {
    return {
        avs: AVs.find({}).fetch(),
        jarticles: JournalArticle.find({}).fetch(),
        books: Books.find({}).fetch(),
        users : User.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(Navigation);