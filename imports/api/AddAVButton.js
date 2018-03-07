import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";


import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../models/users/librarian";

class AddAVButton extends Component {

    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {

        const Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        const Author = ReactDOM.findDOMNode(this.refs.Author).value.trim();
        const PDate = ReactDOM.findDOMNode(this.refs.ReleaseDate).value.trim();
        const Tags = ReactDOM.findDOMNode(this.refs.Tags).value.trim();
        const Price = Number(ReactDOM.findDOMNode(this.refs.Price).value.trim());
        const Copies = Number(ReactDOM.findDOMNode(this.refs.Copies).value.trim());
        const References = Number(ReactDOM.findDOMNode(this.refs.References).value.trim());

        let copies = [];
        for (let i=0; i<Math.min(Copies, References); i++) copies.push(new Copy({reference: true}));
        for (let i=Math.min(Copies, References); i<Copies; i++) copies.push(new Copy({reference: false}));

        Meteor.call('documents.addAV',{
            title: Title,
            authors: Author.split(','),
            release_date: new Date(PDate,1),
            price: Number(Price),
            tags: Tags.split(','),
            copies: copies,
        });

        ReactDOM.findDOMNode(this.refs.Title).value = '';
        ReactDOM.findDOMNode(this.refs.Author).value = '';
        ReactDOM.findDOMNode(this.refs.ReleaseDate).value = '';
        ReactDOM.findDOMNode(this.refs.Copies).value = '';
        ReactDOM.findDOMNode(this.refs.References).value = '';
        ReactDOM.findDOMNode(this.refs.Tags).value = '';
        ReactDOM.findDOMNode(this.refs.Price).value = '';


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
        return (


            <div >

                <Button className={"myButton"} type="primary" onClick={this.showModal}>Add AV</Button>


                <Modal
                    title="Add Audio or Video"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="AddBlock"
                    closable={false}
                >

                    <div  align="right" >
                        <form style={{fontSize: "15px",fontFamily:"Arial"}}>

                            Title
                            <input
                                className={"inputForAdd"}
                                type="text"
                                ref="Title"
                            /><br/>
                            Author
                            <input
                                className={"inputForAdd"}
                                type="text"
                                ref="Author"
                            /><br/>
                            ReleaseDate
                            <input
                                className={"inputForAdd"}
                                type="text"
                                ref="ReleaseDate"
                            /><br/>
                            Tags
                            <input
                                className={"inputForAdd"}
                                type="text"
                                ref="Tags"
                            /><br/>
                            Price
                            <input
                                className={"inputForAdd"}
                                type="number"
                                ref="Price"
                            /><br/>
                            Number of copies
                            <input
                                className={"inputForAdd"}
                                type="number"
                                ref="Copies"
                            /><br/>
                            Number of references
                            <input
                                className={"inputForAdd"}
                                type="number"
                                ref="References"
                            /><br/>


                        </form>
                        <br/>
                    </div>


                </Modal>


            </div>

        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(AddAVButton);