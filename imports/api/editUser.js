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

    constructor(){
        super();
        this.user=null;

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {

        const Name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        const   Group = "";
        const Address = ReactDOM.findDOMNode(this.refs.address).value.trim();
        const Phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
        const libId = ReactDOM.findDOMNode(this.refs.libId).value.trim();
        Meteor.call('ModifyUserProperties',{
            name:Name,
            group:Group,
            address:Address,
            phone:Phone,
            id:this.props.ID,
            libId:libId,
        });


        ReactDOM.findDOMNode(this.refs.name).value= "";
        ReactDOM.findDOMNode(this.refs.address).value="";
        ReactDOM.findDOMNode(this.refs.phone).value="";
        ReactDOM.findDOMNode(this.refs.libId).value = "";
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

        return   <div >

            <Button  type="primary" onClick={this.showModal} style={{margin:"2px"}}>Edit this User</Button>


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
                                    required
                                    type="text"
                                    ref="name"
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
                                Lib. card ID:
                                <input
                                    className={"inputForAdd"}
                                    type="text"
                                    ref="libId"
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
})(EditUser);