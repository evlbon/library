import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import "../../client/AddButton.css"

export class AddNewUser extends Component {

    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {

        const Name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        const Group = "HumbleUser";

        const pass = ReactDOM.findDOMNode(this.refs.pass).value.trim();

        Meteor.call('addUser',{
            name:Name,
            password:pass,
        });


        ReactDOM.findDOMNode(this.refs.name).value= "";
        ReactDOM.findDOMNode(this.refs.pass).value = "";

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

            <Button  className="myBut" type="primary" onClick={this.showModal}>Add user card</Button>


            <Modal
                title="User addition"
                visible={this.state.visible}
                width="40%"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className="AddBlock"
                closable={false}
            >
                <div  align="right" >
                    <form style={{fontSize: "15px",fontFamily:"Arial"}}>

                       Login
                        <input
                            className={"inputForAdd"}
                            required
                            type="text"
                            ref="name"
                        /><br/>

                        Password:
                        <input
                            className={"inputForAdd"}
                            required
                            placeholder="at least 6 symbols"
                            type="text"
                            minLength="6"
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