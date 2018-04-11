import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {Author} from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import * as functions from "../../models/documents/functions";
import {User} from "../../models/users/user";
import {EditBook} from "../../api/editBook";
import {EditArticle} from "../../api/editArticle";
import {Button, Popover} from "antd";




class OutUsers extends Component{
    f(){
        Meteor.call('outstandingRequest', {userID: this.props.user.libraryID, documentID: this.props.jarticle._id});
    }

    render(){
        return(

            <div>
                <button style={{width:"150px", margin:"1px"}} onClick={this.f.bind(this)}>{this.props.user.name}</button><br/>
            </div>
        )

    }


}

class UserWithArticle extends Component{
    fun( date )
    {
        if (date.date < 0)
        {
            let ff = - date.date;
            return "Overdue " + ff + " days.";
        }else return date.date + " days left.";
    }

    returnArticle(){
        Meteor.call("returnDocument",{userID:this.props.user.libraryID, documentID:this.props.jarticle._id});
    }


    render(){
        let o = this.props.user;
        return(
            <div>
                {o.name + ' | '+this.fun({date:o.tillDeadline})+' Fee is '+functions.calculateFee(o.libraryID,this.props.jarticle._id)}
                <button onClick={this.returnArticle.bind(this)}
                        disabled={!(functions.hasDocument(o.libraryID, this.props.jarticle._id))}>
                    Return
                </button>
            </div>


        )
    }
}


class Article extends Component {


    deleteThisArticle() {
        Meteor.call('documents.delArticle',{id : this.props.jarticle._id})

    }
    renderOutUsers(){
        return(
            <div>
                {functions.allPatrons().map((user)=>(<OutUsers key={user.libraryID} user={user} jarticle={this.props.jarticle}/>))}
            </div>
        )
    }


    renderUsers(){
        let users = functions.getRenters(this.props.jarticle._id);
        return(
            <div>
                {users.map((user)=>(<UserWithArticle key={user.libraryID} user={user} jarticle={this.props.jarticle}/>))}
            </div>
        )
    }
    render() {


        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
        return (
            <li>

                <div className='boxButtons'>
                    { this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <button className="delete" onClick={this.deleteThisArticle.bind(this)}>
                                    Delete
                                </button>
                                : ''
                            :""
                        :""
                    }


                    <br/>

                    { this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <EditArticle id={this.props.jarticle._id}/>
                                : ''
                            :""
                        :""}
                    <br/>

                </div>


                <div className="BOOKBOX1">
                <h1>Article</h1><br/>
                <span className="text">Title: {this.props.jarticle.title} </span><br/>
                <span className="text">Journal: {this.props.jarticle.journal} </span><br/>
                <span className="text">Authors: {Author.find({ _id: { $in: this.props.jarticle.authorsID} }).map(o => o.name).join(', ')} </span><br/>
                <span className="text">Year: {this.props.jarticle.release_date ? this.props.jarticle.release_date.getFullYear() : "undefined"} </span><br/>
                <span className="text">Editor: {this.props.jarticle.editor ? this.props.jarticle.editor : 'undefined'} </span><br/>
                <span className="text">Price: {this.props.jarticle.price} </span><br/>
                <span className="text">Tags: {this.props.jarticle.tags.join(', ')} </span><br/>
                <span className="text">Copies available: {
                    this.props.jarticle.copies.map(o => (o.checked_out_date || o.reference) ? '' : '1').filter(String).length} / { this.props.jarticle.copies.length
                } </span><br/>
                </div>

                <div className="BOOKBOX2">
                    {this.renderUsers()}
                </div>


                <div style={{float:"right"}}>
                    <Popover content={this.renderOutUsers()} placement="bottom" title="Choose User">
                        <Button  type="primary">Outstanding request</Button>
                    </Popover>


                </div>

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Article);