import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';

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
        const Price = ReactDOM.findDOMNode(this.refs.Price).value.trim();
        const Copies = ReactDOM.findDOMNode(this.refs.Copies).value.trim();
        const Reference = ReactDOM.findDOMNode(this.refs.Reference).value.trim();

        Meteor.call('documents.addBook',{ title : Title, publisher: Publisher,year:PDate,edition:Edition});




        ReactDOM.findDOMNode(this.refs.Title).value = '';
        ReactDOM.findDOMNode(this.refs.Author).value = '';
        ReactDOM.findDOMNode(this.refs.Publisher).value = '';
        ReactDOM.findDOMNode(this.refs.Edition).value = '';
        ReactDOM.findDOMNode(this.refs.ReleaseDate).value = '';
        ReactDOM.findDOMNode(this.refs.Copies).value = '';
        ReactDOM.findDOMNode(this.refs.Reference).value = '';


        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
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
                                type="number"
                                ref="Price"
                                placeholder="Price"
                            /><br/>
                            <input
                                type="number"
                                ref="Copies"
                                placeholder="Copies"
                            /><br/>
                            <input
                                type="checkbox"
                                ref="Reference"
                                placeholder="Reference"
                            />




                        </form>
                        <br/>
                    </div>


                </Modal>
            </div>

        );
    }
}
