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
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to "Librarian"');
                break;
            case 12:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian") {
                    window.alert("Only for admin!");
                    return;
                }
                Meteor.call('ModifyLibrarian', {id: this.props.user.libraryID, S: 2});
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to "Librarian"');
                break;
            case 13:
                if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian") {
                    window.alert("Only for admin!");
                    return;
                }
                Meteor.call('ModifyLibrarian', {id: this.props.user.libraryID, S: 3});
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to "Librarian"');
                break;
            case 2:

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
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to " Student"');
                break;
            case 3:
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
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to " Visiting"');
                break;
            case 4:
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
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to "Professor"');
                break;
            case 5:
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
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to "Instructor"');
                break;

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
                Meteor.call('addLog', 'User "' + this.props.user.name + '" changed his group from "' +
                    Librarian.findOne({libraryID: this.props.user.libraryID}).group + '" to "TA"');
                break;


            default:
                break;
        }
    }

    delUser() {
        if (Librarian.findOne({libraryID: this.props.currentUser._id}).group === "Librarian" &&
            Librarian.findOne({libraryID: this.props.user.libraryID}).group === "Librarian") {
            window.alert("You cannot modify librarians!");
            return;
        }

        else if (Admin.findOne({libraryID: this.props.user.libraryID}).group === "Admin") {
            window.alert("You cannot modify admin!");
            return;
        }
        else {
            Meteor.call('Delete', {ID: this.props.user._id, ID2: this.props.user.libraryID});
            Meteor.call('addLog', 'User "' + this.props.user.name + '" was deleted');
        }

    }
    renderNewUser() {

        let isLibrarian1 = User.findOne({libraryID : this.props.currentUser._id}).group === "Librarian"&&User.findOne({libraryID : this.props.currentUser._id}).privilege==="2";
        let isLibrarian3 = User.findOne({libraryID : this.props.currentUser._id}).group === "Librarian"&&User.findOne({libraryID : this.props.currentUser._id}).privilege==="3";
        let isAdmin = User.findOne({libraryID : this.props.currentUser._id}).group === "Admin";

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
                    {}

                    {isLibrarian3||isAdmin?<Button onClick={this.delUser.bind(this)} type="danger" style={{margin:"2px"}}>Delete</Button>:""}


                </div>



                <div className="USERBOX">
                    <h1>User login: {this.props.user.login}</h1>
                    <p>Name : <strong>{this.props.user.name}</strong></p>
                    <p>Group: <strong>{this.props.user.group} {this.props.user.group==="Librarian"?this.props.user.privilege:""}</strong></p>
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