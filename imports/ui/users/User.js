import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import {User} from "../../models/users/user";
import {Author} from "../../models/utility/author";
import {Librarian} from "../../models/users/librarian";
import {Admin} from "../../models/users/admin";
import {EditUser} from "../../api/editUser";
import {Button, Dropdown, Icon, Menu} from "antd";

// Book component - represents a single todo item
class Users extends Component {

    renderCase(number) {
        if (this.props.currentUser.username === this.props.user.login) {
            window.alert("You can not modify your self!!!");
            return;
        }

        switch (number) {

            case 11:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian") {
                    window.alert("Only for admin!");
                    return;
                }
                Meteor.call('ModifyLibrarian', {id: this.props.user.libraryID, S: 1});
                break;
            case 12:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian") {
                    window.alert("Only for admin!");
                    return;
                }
                Meteor.call('ModifyLibrarian', {id: this.props.user.libraryID, S: 2});
                break;
            case 13:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian") {
                    window.alert("Only for admin!");
                    return;
                }
                Meteor.call('ModifyLibrarian', {id: this.props.user.libraryID, S: 3});
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian" &&
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group === "Librarian") {
                    window.alert("You cannot modify librarians!");
                    return;
                }

                else if (Admin.findOne({libraryID: this.props.user.libraryID}).group === "Admin") {
                    window.alert("You cannot modify admin!");
                    return;
                }
                else
                    Meteor.call('ModifyUser', {id: this.props.user.libraryID, S: number});
                // User.update({libraryID:this.props.user.libraryID},{$set:{group:"Librarian"}});
                break;


            default:
                break;
        }
    }

    delUser(){
        if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian" &&
            Librarian.findOne({libraryID: this.props.user.libraryID}).group === "Librarian") {
            window.alert("You cannot modify librarians!");
            return;
        }

        else if (Admin.findOne({libraryID: this.props.user.libraryID}).group === "Admin") {
            window.alert("You cannot modify admin!");
            return;
        }
        else
            Meteor.call('Delete', {ID: this.props.user._id, ID2: this.props.user.libraryID});
    }


    renderNewUser() {
        let user = this.props.wholeUsers.findOne({_id: this.props.user.libraryID});
        return (

            <li>
                <div style={{float:"right"}}>
                    <EditUser ID={this.props.user.libraryID}/>

                    <Dropdown overlay={
                        <div>
                            <Button onClick={this.renderCase.bind(this, 11)} style={{width:"150px"}}>Privilege 1</Button><br/>
                            <Button onClick={this.renderCase.bind(this, 12)} style={{width:"150px"}}>Privilege 2</Button><br/>
                            <Button onClick={this.renderCase.bind(this, 13)} style={{width:"150px"}}>Privilege 3</Button><br/>

                        </div>
                    }>
                        <Button style={{width:"150px", margin:"2px"}} type="primary">Make librarian <Icon type="down" /></Button>
                    </Dropdown><br/>


                    <Dropdown overlay={
                        <div>

                                <Button onClick={this.renderCase.bind(this, 2)} style={{width:"150px"}}>Student</Button><br/>
                                <Button onClick={this.renderCase.bind(this, 3)} style={{width:"150px"}}>Visiting Professor</Button><br/>
                                <Button onClick={this.renderCase.bind(this, 4)} style={{width:"150px"}}>Professor</Button><br/>
                                <Button onClick={this.renderCase.bind(this, 5)} style={{width:"150px"}}>Instructor</Button><br/>
                                <Button onClick={this.renderCase.bind(this, 6)} style={{width:"150px"}}>Teaching Assistant</Button><br/>

                        </div>
                    }>
                        <Button type="primary" style={{margin:"2px"}}>
                            Make patron <Icon type="down" />
                        </Button>
                    </Dropdown><br/>

                    <Button onClick={this.delUser.bind(this)} type="danger" style={{margin:"2px"}}>Delete</Button>


                </div>



                <div className="USERBOX">
                    <h1>User login: {this.props.user.login}</h1>
                    <p>Name : <strong>{this.props.user.name}</strong></p>
                    <p>Group: <strong>{this.props.user.group}</strong></p>
                    <p>Address:<strong>{this.props.user.address}</strong></p>
                    <p>Phone Number: <strong>{this.props.user.phone}</strong></p>
                    <p>LibraryID: <strong>{this.props.user.libId}</strong></p>







                </div>


            </li>
        )

    }


    AmILibrarian() {
        return this.props.currentUser ?
            Librarian.findOne({libraryID: this.props.currentUser._id}) || Admin.findOne({libraryID: this.props.currentUser._id}) ?
                Librarian.findOne({libraryID: this.props.currentUser._id}).group || Admin.findOne({libraryID: this.props.currentUser._id})
                === "Librarian" || "Admin" : false : false;
    }


    render() {
        // Give books a different className when they are checked off,
        // so that we can style them nicely in CSS
        if (!this.AmILibrarian())
            return "";
        console.log(this.props.user);
        return (
            <div>
                {this.renderNewUser()}
            </div>
        );

    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        wholeUsers: Meteor.users,
    };
})(Users);