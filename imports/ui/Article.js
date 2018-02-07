import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {Author} from "../models/utility/author";
import {Librarian} from "../models/users/librarian";

class Article extends Component {


    deleteThisArticle() {
        Meteor.call('documents.delArticle',{id : this.props.jarticle._id})

    }

    render() {

        return (
            <li>


                { this.props.currentUser ?
                    Librarian.findOne({libraryID:this.props.currentUser._id}).group==="Librarian" ?
                        <button className="delete" onClick={this.deleteThisArticle.bind(this)}>
                            &times;
                        </button>
                        : ''
                    :""
                }

                <h1>Article</h1><br/>
                <span className="text">Title: {this.props.jarticle.title} </span><br/>
                <span className="text">Jouranl: {this.props.jarticle.journal} </span><br/>
                <span className="text">Authors: {Author.find({ _id: { $in: this.props.jarticle.authorsID} }).map(o => o.name).join(', ')} </span><br/>
                <span className="text">Year: {this.props.jarticle.release_date.getFullYear()} </span><br/>
                <span className="text">Editor: {this.props.jarticle.editor ? this.props.jarticle.edition : 'undefined'} </span><br/>
                <span className="text">Price: {this.props.jarticle.price} </span><br/>
                <span className="text">Tags: {this.props.jarticle.tags.join(', ')} </span><br/>
                <span className="text">Copies available: {
                    this.props.jarticle.copies.map(o => (o.checked_out_date || o.reference) ? '' : '1').filter(String).length} / { this.props.jarticle.copies.length
                } </span><br/>

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Article);