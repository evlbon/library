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
import Article from "../Article";
import AddArticleButton from "../../api/AddArticleButton";

class ARTICLES extends Component{
    constructor() {
        super();
        this.case = null;
    }

    reanderCase(number){

        this.case ? this.case.style.display="none" : document.getElementById("articles").style.display="none";

        switch (number) {
            case 1:
                document.getElementById('articles').style.display="";
                this.case=document.getElementById("articles");
                break;
            default:
                return("");
        }

    }

    renderArticles(){
        if(Meteor.userId()) {
            return this.props.articles.map((jarticle) => (
                <Article key={jarticle._id} jarticle={jarticle}/>
            ));
        }
    }

    render(){
        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        return(
            <div>


                <div className="menu">

                    <h2 align="center">MENU</h2><br/>
                    <button onClick={this.reanderCase.bind(this,1)} className="myButton">All Articles </button>
                    {isLabrarian? <AddArticleButton/>:""}


                </div>

                <div className="content">
                    <ul id="articles" >
                        {this.renderArticles()}
                    </ul>
                </div>

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
})(ARTICLES);

