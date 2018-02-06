import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";


import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../models/users/librarian";

class AddArticleButton extends Component {

    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {

        const Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        const Publisher = ReactDOM.findDOMNode(this.refs.Publisher).value.trim();
        const Edition = ReactDOM.findDOMNode(this.refs.Edition).value.trim();
        const PDate = ReactDOM.findDOMNode(this.refs.ReleaseDate).value.trim();
        const Tags = ReactDOM.findDOMNode(this.refs.Tags).value.trim();
        const Price = Number(ReactDOM.findDOMNode(this.refs.Price).value.trim());
        const Copies = Number(ReactDOM.findDOMNode(this.refs.Copies).value.trim());
        const References = Number(ReactDOM.findDOMNode(this.refs.References).value.trim());
        const Bestseller = Boolean(ReactDOM.findDOMNode(this.refs.Bestseller).value.trim());

        let copies = [];
        for (let i=0; i<Math.min(Copies, References); i++) copies.push(new Copy({reference: true, usersID: []}));
        for (let i=Math.min(Copies, References); i<Copies; i++) copies.push(new Copy({reference: false, usersID: []}));

        Meteor.call('documents.addBook',{
            title: Title,
            authors: Author.split(','),
            edition: Edition,
            publisher: Publisher,
            release_date: new Date(PDate,1),
            price: Number(Price),
            tags: Tags.split(','),
            copies: copies,
            bestseller: !(Boolean(Bestseller))});

        ReactDOM.findDOMNode(this.refs.Title).value = '';
        ReactDOM.findDOMNode(this.refs.Publisher).value = '';
        ReactDOM.findDOMNode(this.refs.Edition).value = '';
        ReactDOM.findDOMNode(this.refs.ReleaseDate).value = '';
        ReactDOM.findDOMNode(this.refs.Copies).value = '';
        ReactDOM.findDOMNode(this.refs.References).value = '';
        ReactDOM.findDOMNode(this.refs.Tags).value = '';
        ReactDOM.findDOMNode(this.refs.Price).value = '';
        ReactDOM.findDOMNode(this.refs.Bestseller).value = '';


        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        return (


            <div >
                { this.props.currentUser ?
                    Librarian.findOne({libraryID:this.props.currentUser._id})instanceof Librarian ?
                        <div>
                <Button className={"myButton"} type="primary" onClick={this.showModal}>Add Article</Button>


                <Modal
                    title="Add Article"
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
                            Journal
                            <input
                                className={"inputForAdd"}
                                type="text"
                                ref="Journal"
                            /><br/>
                            Edition
                            <input
                                className={"inputForAdd"}
                                type="text"
                                ref="Edition"
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

                        : <h1>LOL</h1>
                    : ''
                }
            </div>

        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(AddArticleButton);