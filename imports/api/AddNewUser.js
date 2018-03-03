import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

export class AddNewUser extends Component {

    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {

        const Name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        const Group = ReactDOM.findDOMNode(this.refs.group).value.trim();
        const Address = ReactDOM.findDOMNode(this.refs.address).value.trim();
        const Phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
        const pass = ReactDOM.findDOMNode(this.refs.pass).value.trim();
        console.log("OKAAAAAAAAAY");
        console.log(Name);
        console.log(Address);
        console.log(Group);
        console.log(pass);
        console.log(Phone);
        Meteor.call('addUser',{
            name:Name,
            group:Group,
            address:Address,
            phone:Phone,
            password:pass,
        });


        ReactDOM.findDOMNode(this.refs.name).value= "";
        ReactDOM.findDOMNode(this.refs.group).value="";/// see if we can view initial data here
        ReactDOM.findDOMNode(this.refs.address).value="";
        ReactDOM.findDOMNode(this.refs.pass).value = "";
        ReactDOM.findDOMNode(this.refs.phone).value="";

        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    render() {


        return   <div>

            <Button className={"myButton"} type="primary" onClick={this.showModal}>Add user card</Button>


            <Modal
                title="User addition"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className="AddBlock"
                closable={false}
            >
                <h5>Leave empty means do not need modification </h5>
                <div  align="right" >
                    <form style={{fontSize: "15px",fontFamily:"Arial"}}>

                        Name
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="name"
                        /><br/>
                        group
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="group"
                        /><br/>
                        Address
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="address"
                        /><br/>
                        Phone number
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="phone"
                        /><br/>
                        Password:
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="pass"
                        /><br/>
                    </form>

                    <br/>
                </div>



            </Modal>
        </div>

    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(AddNewUser);