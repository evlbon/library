import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {Author} from "../models/utility/author";
import {Librarian} from "../models/users/librarian";
import * as functions from "../models/documents/functions";
import {User} from "../models/users/user";
import {EditBook} from "../api/editBook";
import {EditArticle} from "../api/editArticle";
class Article extends Component {


    deleteThisArticle() {
        Meteor.call('documents.delArticle',{id : this.props.jarticle._id})

    }
    rentBook(id){
        Meteor.call("checkOut",{userID:this.props.currentUser._id, documentID:id});
    }

    returnBook(id){
        Meteor.call("returnDocument",{userID:this.props.currentUser._id, documentID:id});
    }
    render() {
        /*let rents = functions.getRenters(this.props.book._id);

        rents ? rents = rents.map(o => (o.name + '" | '+o.tillDeadline+' days left. '+functions.calculateFee(o.libraryID,this.props.book._id))):"";
        let rents2 = functions.getRentsViaId(this.props.book._id,this.props.currentUser._id);
*/
        let rents = functions.getRenters(this.props.jarticle._id);

        rents ? rents = rents.map(o => (o.name + ' | '+fun({date:o.tillDeadline})+'. Fee is'+functions.calculateFee(o.libraryID,this.props.jarticle._id)+"rubles")):"";
        let rents2 = functions.getRentsViaId(this.props.jarticle._id, this.props.currentUser._id);

        rents2 ? rents2 = rents2.map(o =>(fun({date:o.tillDeadline}))):"";
        return (
            <li>

                {console.log("Here is article")}
                {console.log(this.props.jarticle._id)}
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
                { this.props.currentUser ?
                    User.findOne({libraryID : this.props.currentUser._id}) ?
                        <button className="delete" onClick={this.rentBook.bind(this,this.props.jarticle._id)}
                                disabled={!(functions.canCheckOut(this.props.currentUser._id,this.props.jarticle._id))}>
                            Rent
                        </button>
                        :""
                    :""
                }
            <br/>
                {
                    this.props.currentUser ?
                    User.findOne({libraryID : this.props.currentUser._id}) ?
                        <button className="delete" onClick={this.returnBook.bind(this,this.props.jarticle._id)}
                                disabled={!(functions.hasDocument(this.props.currentUser._id, this.props.jarticle._id))}>
                            Return
                        </button>
                        :""
                    :""
                }
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

                {
                    this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <div className="BOOKBOX2">
                                    <h1>Rents</h1><br/>
                                    {rents ? <pre>{rents.join("\n")}</pre>
                                        :<p>Nothing</p>}
                                </div>
                                : ''
                            :""
                        :""

                }


                {
                    this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Student" ?
                                <div className="BOOKBOX2">
                                    <h1>RENTS</h1><br/>
                                    {rents2 ? <pre>{rents2.join("\n")}</pre>
                                        :<p>Nothing</p>}
                                </div>
                                : ''
                            :""
                        :""
                }

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Article);
function fun( date )
{
    console.log(date.date);
    if (date.date < 0)
    {
        let ff = - date.date;
        return "Overdue " + ff + " days.";
    }else return date.date + " days left.";
}