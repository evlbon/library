import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {Author} from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import * as functions from "../../methods/functions";
import {User} from "../../models/users/user";
import {EditAV} from "../../api/editAV";
import { Popover, Button } from 'antd';
import 'antd/dist/antd.css';



class OutUsers extends Component{
    f(){
        Meteor.call('outstandingRequest', {userID: this.props.user.libraryID, documentID: this.props.av._id});

    }

    render(){
        return(

            <div>
                <Button style={{width:"150px", margin:"1px"}} onClick={this.f.bind(this)}>{this.props.user.name}</Button><br/>
            </div>
        )

    }


}

class UserWithAV extends Component{
    fun( date )
    {
        if (date.date < 0)
        {
            let ff = - date.date;
            return "Overdue " + ff + " days.";
        }else return date.date + " days left.";
    }

    returnAV(){
        Meteor.call("returnDocument",{userID:this.props.user.libraryID, documentID:this.props.av._id});
    }


    render(){
        let o = this.props.user;
        return(
            <div>
                {o.name + ' | '+this.fun({date:o.tillDeadline})+' Fee is '+functions.calculateFee(o.libraryID,this.props.av._id)+" "}
                <Button onClick={this.returnAV.bind(this)}
                        disabled={!(functions.hasDocument(o.libraryID, this.props.av._id))}
                        style={{height:"20px"}}>
                    Return
                </Button>
            </div>


        )
    }
}




class AV extends Component {


    deleteThisAV() {
        Meteor.call('documents.delAV',{id : this.props.av._id})

    }


    renderOutUsers(){
        return(
            <div>
                {functions.allPatrons().map((user)=>(<OutUsers key={user.libraryID} user={user} av={this.props.av}/>))}
            </div>
        )
    }


    renderUsers(){
        let users = functions.getRenters(this.props.av._id);
        return(
            <div>
                {users.map((user)=>(<UserWithAV key={user.libraryID} user={user} av={this.props.av}/>))}
            </div>
        )
    }



    render() {
        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        let isLibrarian1 = isLabrarian&&Librarian.findOne({libraryID : this.props.currentUser._id}).privilege === "1";

        return (
            <li>

                <div className='boxButtons'>
                    { this.props.currentUser ?
                        Librarian.findOne({libraryID : this.props.currentUser._id}) ?
                            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian" ?
                                <Button className="delete" onClick={this.deleteThisAV.bind(this)}>
                                    Delete
                                </Button>
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



                <div className="BOOKBOX2">
                    {this.renderUsers()}
                </div>


                {isLabrarian&&!isLibrarian1?
                    <div style={{float:"right"}}>
                        <Popover content={this.renderOutUsers()} placement="bottom" title="Choose User">
                            <Button  type="primary">Outstanding request</Button>
                        </Popover>


                    </div>:""}

            </li>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(AV);