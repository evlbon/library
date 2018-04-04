import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {Author} from "../models/utility/author";
import {Librarian} from "../models/users/librarian";
import * as functions from "../models/documents/functions";
import {User} from "../models/users/user";
import {EditAV} from "../api/editAV";
import {EditBook} from "../api/editBook";
import {EditArticle} from "../api/editArticle";

class AV extends Component {


    deleteThisAV() {
        Meteor.call('documents.delAV',{id : this.props.av._id})

    }
    rentAV(id){
        console.log(this.props.av._id);
        Meteor.call('checkOut',{userID:this.props.currentUser._id, documentID:id});
    }

    returnAV(id){
        Meteor.call('returnDocument',{userID:this.props.currentUser._id, documentID:id});
    }

    render() {
        let rents = functions.getRenters(this.props.av._id);

        rents ? rents = rents.map(o => (o.name + '   | '+fun({date:o.tillDeadline})+' Fee is'+functions.calculateFee(o.libraryID,this.props.av._id)+"rubles")):"";
        let rents2 = functions.getRentsViaId(this.props.av._id, this.props.currentUser._id);

        rents2 ? rents2 = rents2.map(o =>(fun({date:o.tillDeadline}))):"";

        return (
            <li>

                <div className='boxButtons'>
                { this.props.currentUser ?
                    Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                        <button className="delete" onClick={this.deleteThisAV.bind(this)}>
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
                            <EditAV id={this.props.av._id}/>
                            : ''
                        :""
                    :""}

                <br/>
                { this.props.currentUser ?
                    User.findOne({libraryID : this.props.currentUser._id}) ?
                        <button className="delete" onClick={this.rentAV.bind(this,this.props.av._id)}
                                disabled={!(functions.canCheckOut(this.props.currentUser._id,this.props.av._id))}>
                            Rent
                        </button>
                        :""
                    :""
                }
            <br/>
                {
                    this.props.currentUser ?
                    User.findOne({libraryID : this.props.currentUser._id}) ?
                        <button className="delete" onClick={this.returnAV.bind(this,this.props.av._id)}
                                disabled={!(functions.hasDocument(this.props.currentUser._id, this.props.av._id))}>
                            Return
                        </button>
                        :""
                    :""
                }

                </div>
                <div className="BOOKBOX1">
                <h1>Audio or Video</h1><br/>
                <span className="text">Title: {this.props.av.title} </span><br/>
                <span className="text">Authors: {Author.find({ _id: { $in: this.props.av.authorsID} }).map(o => o.name).join(', ')} </span><br/>
                <span className="text">Year: {this.props.av.release_date ? this.props.av.release_date.getFullYear() : "undefined"} </span><br/>
                <span className="text">Price: {this.props.av.price} </span><br/>
                <span className="text">Tags: {this.props.av.tags.join(', ')} </span><br/>
                <span className="text">Copies available: {
                    this.props.av.copies.map(o => (o.checked_out_date || o.reference) ? '' : '1').filter(String).length} / { this.props.av.copies.length
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
                        User.findOne({libraryID : this.props.currentUser._id}) ?
                            User.findOne({libraryID : this.props.currentUser._id}).group === "Student" ?
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
})(AV);
function fun( date )
{
    console.log(date.date);
    if (date.date < 0)
    {
        let ff = - date.date;
        return "Overdue " + ff + " days.";
    }else return date.date + " days left.";
}