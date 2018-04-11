import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Author } from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import {User} from "../../models/users/user";
import * as functions from "../../models/documents/functions"
import {EditBook} from "../../api/editBook";

// Book component - represents a single todo item

class User_in_Queue extends Component{

    render(){
        let user = User.findOne({libraryID: this.props.userID});

        return(
            <div>
                {this.props.n}){user.name}({user.group})<br/>
            </div>
        )
    }


}

class Accepted_users extends Component{
    constructor(props){
        super(props);
        let t = props.book.acceptedTimeLeft(this.props.userID)-new Date();
        t=t/1000-t%1000/1000+86400;
        this.state={
            timeLeft: t,
            h:Math.ceil(t/3600),
            m:Math.ceil(t%3600/60),
            s:t%60

        };
        this.timer = null;
        this.time()


    }

    time(){
        this.timer=setInterval(()=>{
            console.log(this.state.timeLeft);
            let t =  this.state.timeLeft-1;
            if(t<=0){
                this.te()
            }
            this.setState({
                timeLeft : t,
                h:parseInt(t/3600),
                m:parseInt(t%3600/60),
                s:t%60
            })

        }, 1000);
    }
    te(){
        clearInterval(this.timer);
        Meteor.call("checkOut",{userID:this.props.userID, documentID:this.props.book._id});
        Meteor.call("returnDocument",{userID:this.props.userID, documentID:this.props.book._id});
    }

    f(){
        clearInterval(this.timer);
        Meteor.call("checkOut",{userID:this.props.userID, documentID:this.props.book._id});
        Meteor.call("delNotification",{userID:this.props.userID,title:this.props.book.title});
    }

    render(){
        return(
            <div>
                {this.props.name} - <a>{this.state.h}:{this.state.m}:{this.state.s}</a> Left
                <button onClick={this.f.bind(this)}>get book</button>
            </div>
        )
    }
}

class Book2 extends Component {


    deleteThisBook() {
        Meteor.call('documents.delBook',{id : this.props.book._id, name: ["yury", "jojo" ]})
    }

    rentBook(id){
        Meteor.call("checkOut",{userID:this.props.currentUser._id, documentID:id});
    }
    enqueue(id){
        Meteor.call("enqueue",{userID:this.props.currentUser._id, documentID:id});
    }
    dequeue(id){
        Meteor.call("dequeue",{userID:this.props.currentUser._id, documentID:id});
    }
    renew(id){
        console.log(id);
        Meteor.call("renewDocument",{userID:this.props.currentUser._id, documentID:id});
    }

    returnBook(id){
        Meteor.call("returnDocument",{userID:this.props.currentUser._id, documentID:id});
    }

    accept(){
        Meteor.call("accept",{documentID : this.props.book._id});
    }
    deny(){
        Meteor.call("deny",{documentID : this.props.book._id})
    }


    render_Queue(){
        let queue = this.props.book.queue.get_all_queue();
        if(this.props.book.queue.outstanding_requests.length>0){
            queue = this.props.book.queue.outstanding_requests
        }

        return(

            <div>

                {queue.map((id) => (<User_in_Queue key={id} userID={id} n={queue.indexOf(id)+1}/>))}


            </div>
        )

    }

    renderAccepted(){
        let users = this.props.book.acceptedRenters();
        return(

            (users.map((user)=>(<Accepted_users key={user.libraryID} userID={user.libraryID} name={user.name} book={this.props.book}/>)))
        )
    }



    static fun(date )
    {
        if (date.date < 0)
        {
            let ff = - date.date;
            return "Overdue " + ff + " days.";
        }else return date.date + " days left.";
    }


    render() {

        let rents2 = null;

        this.props.currentUser ? rents2 = functions.getRentsViaId(this.props.book._id, this.props.currentUser._id):"";

        rents2 ? rents2 = rents2.map(o =>(Book2.fun({date:o.tillDeadline}) )):"";

        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
        let isHumbleUser = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "HumbleUser";



        return (
            <li >




                {/*Filling the fields for Book description*/}
                <div className="BOOKBOX1">
                <h1>Book</h1><br/>

                <span className="text">Title: {this.props.book.title} </span><br/>
                <span className="text">Authors: {Author.find({ _id: { $in: this.props.book.authorsID} }).map(o => o.name).join(', ')} </span><br/>
                <span className="text">Publisher: {this.props.book.publisher} </span><br/>
                <span className="text">Year: {this.props.book.release_date ? this.props.book.release_date.getFullYear() : 'undefined'} </span><br/>
                <span className="text">Edition: {this.props.book.edition ? this.props.book.edition : 'undefined'} </span><br/>
                <span className="text">Price: {this.props.book.price} </span><br/>
                <span className="text">Tags: {this.props.book.tags.join(', ')} </span><br/>
                <span className="text">Copies available: {this.props.book.available()} / { this.props.book.numberOfCopies()} </span><br/>
                <span className="text">Bestseller: {this.props.book.bestseller ? 'yes' : 'no'} </span><br/>
                </div>





                {!isHumbleUser?
                        <div style={{float:"right", width:"40%"}}>

                            {
                                isLabrarian ?
                                    <div>
                                        <h1>Accepted</h1>
                                        {this.renderAccepted()}
                                    </div>:

                                    <div className="delete">
                                        <button
                                            onClick={this.enqueue.bind(this,this.props.book._id)}
                                            disabled={this.props.currentUser&&(this.props.book.queue.in_queue(this.props.currentUser._id)||rents2.length!==0)}>
                                            Enqueue
                                        </button>

                                        <button
                                            onClick={this.dequeue.bind(this,this.props.book._id)}
                                            disabled={this.props.currentUser&&(!(this.props.book.queue.in_queue(this.props.currentUser._id)))}>
                                            Dequeue
                                        </button>
                                        <button
                                            onClick={this.renew.bind(this,this.props.book._id)}
                                            disabled={this.props.currentUser&&(!(this.props.book.userHas(this.props.currentUser._id)))}>
                                            Renew
                                        </button>

                                    </div>


                            }
                        </div>:""
                        }


                {!isHumbleUser?
                        <div style={{float:"right", width:"30%"}}>
                            {

                                isLabrarian?
                                    <div className="delete">
                                        <div style={{float:"left"}}>
                                            <h1>Queue</h1><br/>
                                            {this.render_Queue()}
                                        </div>

                                        <button
                                            onClick={this.accept.bind(this)}
                                            disabled={!this.props.book.canAccept()||this.props.book.queue.get_all_queue().length===0}>
                                            Accept
                                        </button>
                                        <button
                                            disabled={this.props.book.queue.get_all_queue().length===0}
                                            onClick={this.deny.bind(this)}>
                                            Deny
                                        </button>

                                    </div>:


                                    <div >

                                        {rents2.length!==0 ? <div>
                                                <h3>YOU RENTED THIS BOOK</h3><br/>
                                                <pre>{rents2.join("\n")}</pre>
                                            </div>
                                            :""}
                                    </div>

                            }
                        </div>:""

                }


            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Book2);