import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";

class Article extends Component {


    deleteThisArticle() {
        Meteor.call('documents.delArticle',{id : this.props.jarticle._id})

    }

    render() {

        return (
            <li>


                <h1>Article</h1><br/>

                <span className="text">Jouranl: {this.props.jarticle.journal} </span><br/>

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Article);