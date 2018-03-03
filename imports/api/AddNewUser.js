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
        const Group = "HumbleUser";

        const pass = ReactDOM.findDOMNode(this.refs.pass).value.trim();
        console.log("OKAAAAAAAAAY");
        console.log(Name);
        console.log(Group);
        console.log(pass);
       console.log(

        Meteor.call('addUser',{
            name:Name,
            password:pass,
            phone:0,
            address:"None",
        }));
        console.log("Done Didding");


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

            <Button className={"myButton"} type="primary" onClick={this.showModal}>Add user card</Button>


            <Modal
                title="User addition"
                visible={this.state.visible}
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
                            type="text"
                            required
                            ref="name"
                        /><br/>

                        Password:
                        <input
                            className={"inputForAdd"}
                            type="text"
                            required
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