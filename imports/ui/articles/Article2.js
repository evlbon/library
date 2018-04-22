import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import { Author } from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import {User} from "../../models/users/user";
import * as functions from "../../methods/functions"
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
        let t = props.jarticle.acceptedTimeLeft(this.props.userID)-new Date();
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
        Meteor.call("checkOut",{userID:this.props.userID, documentID:this.props.jarticle._id});
        Meteor.call("returnDocument",{userID:this.props.userID, documentID:this.props.jarticle._id});
    }

    f(){
        clearInterval(this.timer);
        Meteor.call("checkOut",{userID:this.props.userID, documentID:this.props.jarticle._id});
        Meteor.call("delNotification",{userID:this.props.userID,title:this.props.jarticle.title});
    }

    render(){
        return(
            <div>
                {this.props.name} - <a>{this.state.h}:{this.state.m}:{this.state.s}</a> Left
                <button onClick={this.f.bind(this)}>get article</button>
            </div>
        )
    }
}

class Article2 extends Component {



    enqueue(id){
        Meteor.call("enqueue",{userID:this.props.currentUser._id, documentID:id});
    }
    dequeue(id){
        Meteor.call("dequeue",{userID:this.props.currentUser._id, documentID:id});
    }


    accept(){
        Meteor.call("accept",{documentID : this.props.jarticle._id});
    }
    deny(){
        Meteor.call("deny",{documentID : this.props.jarticle._id})
    }


    render_Queue(){
        let queue = this.props.jarticle.queue.get_all_queue();


        return(

            <div>

                {queue.map((id) => (<User_in_Queue key={id} userID={id} n={queue.indexOf(id)+1}/>))}


            </div>
        )

    }

    renderAccepted(){
        let users = this.props.jarticle.acceptedRenters();
        return(

            (users.map((user)=>(<Accepted_users key={user.libraryID} userID={user.libraryID} name={user.name} jarticle={this.props.jarticle}/>)))
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

        this.props.currentUser ? rents2 = functions.getRentsViaId(this.props.jarticle._id, this.props.currentUser._id):"";

        rents2 ? rents2 = rents2.map(o =>(Article2.fun({date:o.tillDeadline}) )):"";

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





                {!isHumbleUser?
                    <div style={{float:"right", width:"40%"}}>

                        {
                            isLabrarian ?
                                <div>
                                    <h1>Accepted</h1>
                                    {this.renderAccepted()}
                                </div>:

                                <div className="delete">
                                    <button onClick={this.enqueue.bind(this,this.props.jarticle._id)}
                                            disabled={this.props.currentUser&&(this.props.jarticle.queue.in_queue(this.props.currentUser._id)||rents2.length!==0)}>
                                        Enqueue
                                    </button>

                                    <button onClick={this.dequeue.bind(this,this.props.jarticle._id)}
                                            disabled={this.props.currentUser&&(!(this.props.jarticle.queue.in_queue(this.props.currentUser._id)))}>
                                        Dequeue
                                    </button>
                                    <button
                                        disabled={this.props.currentUser&&(!(this.props.jarticle.userHas(this.props.currentUser._id)))}
                                        onClick={this.props.jarticle.renew.bind(this,this.props.currentUser._id)}>
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
                                        disabled={!this.props.jarticle.canAccept()||this.props.jarticle.queue.get_all_queue().length===0}>
                                        Accept
                                    </button>
                                    <button
                                        disabled={this.props.jarticle.queue.get_all_queue().length===0}
                                        onClick={this.deny.bind(this)}>
                                        Deny
                                    </button>

                                </div>:


                                <div >

                                    {rents2.length!==0 ? <div>
                                            <h3>YOU RENTED THIS ARTICLE</h3><br/>
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
})(Article2);