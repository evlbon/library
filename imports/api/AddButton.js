import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";

export class AddButton extends Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {

        const Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        const Author = ReactDOM.findDOMNode(this.refs.Author).value.trim();
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
            bestseller: Bestseller});

        ReactDOM.findDOMNode(this.refs.Title).value = '';
        ReactDOM.findDOMNode(this.refs.Author).value = '';
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
                <Button type="primary" onClick={this.showModal}>Add Book</Button>


                <Modal
                    title="Add Book"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="ab"
                >

                    <div >
                        <form >
                            <input
                                type="text"
                                ref="Title"
                                placeholder="Title"
                            /><br/>
                            <input
                                type="text"
                                ref="Author"
                                placeholder="Author"
                            /><br/>
                            <input
                                type="text"
                                ref="Publisher"
                                placeholder="Publisher"
                            /><br/>
                            <input
                                type="text"
                                ref="Edition"
                                placeholder="Edition"
                            /><br/>
                            <input
                                type="text"
                                ref="ReleaseDate"
                                placeholder="ReleaseDate"
                            /><br/>
                            <input
                                type="text"
                                ref="Tags"
                                placeholder="Tags"
                            /><br/>
                            <input
                                type="number"
                                ref="Price"
                                placeholder="Price"
                            /><br/>
                            <input
                                type="number"
                                ref="Copies"
                                placeholder="Number of copies"
                            /><br/>
                            <input
                                type="number"
                                ref="References"
                                placeholder="Number of references"
                            /><br/>
                            Bestseller?
                            <input
                                type="checkbox"
                                ref="Bestseller"
                            />


                        </form>
                        <br/>
                    </div>


                </Modal>
            </div>

        );
    }
}
