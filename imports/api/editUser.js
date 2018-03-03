import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";


import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../models/users/librarian";
import { Select } from 'antd';
function handleChange(value) {
    console.log(`selected ${value}`);
}
const Option = Select.Option;
export class EditUser extends Component {

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
        console.log(Address);
        Meteor.call('ModifyUserProperties',{
            name:Name,
            group:Group,
            address:Address,
            phone:Phone,
            id:this.props.ID,
        });


        ReactDOM.findDOMNode(this.refs.name).value= "";
        ReactDOM.findDOMNode(this.refs.group).value="";/// see if we can view initial data here
        ReactDOM.findDOMNode(this.refs.address).value="";
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
        console.log(this.props.ID);

        return (

            <div >

                <div>

                    <Button className={"myButton"} type="primary" onClick={this.showModal}>Edit this User</Button>


                    <Modal
                        title="Modify User"
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

                            </form>

                            <br/>
                        </div>



                    </Modal>
                </div>

            </div>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(EditUser);