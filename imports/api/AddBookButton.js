import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";


import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../models/users/librarian";




class AddBookButton extends Component {

    state = { visible: false };

    constructor(){
        super();
        this.bestseller=false

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

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

        Meteor.call('documents.addBook',{
            title: Title,
            authors: Author.split(','),
            edition: Edition,
            publisher: Publisher,
            release_date: new Date(PDate,1),
            price: Number(Price),
            tags: Tags.split(','),
            number_of_copies: Copies,
            number_of_references: References,
            bestseller: this.bestseller});

        ReactDOM.findDOMNode(this.refs.Title).value = '';
        ReactDOM.findDOMNode(this.refs.Author).value = '';
        ReactDOM.findDOMNode(this.refs.Publisher).value = '';
        ReactDOM.findDOMNode(this.refs.Edition).value = '';
        ReactDOM.findDOMNode(this.refs.ReleaseDate).value = '';
        ReactDOM.findDOMNode(this.refs.Copies).value = '';
        ReactDOM.findDOMNode(this.refs.References).value = '';
        ReactDOM.findDOMNode(this.refs.Tags).value = '';
        ReactDOM.findDOMNode(this.refs.Price).value = '';


        this.setState({
            visible: false,
        });
    };

    bs(){
        if(this.bestseller){
            this.bestseller=false;
            document.getElementById('bestButton').style.background="Red";
            document.getElementById('bestButton').innerText="No"

        }
        else{
            this.bestseller=true;
            document.getElementById('bestButton').style.background="Green";
            document.getElementById('bestButton').innerText="Yes"
        }

    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    render() {

        return (

            <div >

                    <div>

                        <Button className={"myButton"} type="primary" onClick={this.showModal}>Add Book</Button>


                        <Modal
                            title="Add Book"
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
                                        required
                                        ref="Title"
                                    /><br/>
                                    Author
                                    <input
                                        className={"inputForAdd"}
                                        type="text"
                                        ref="Author"
                                    /><br/>
                                    Publisher
                                    <input
                                        className={"inputForAdd"}
                                        type="text"
                                        ref="Publisher"
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
                                        min="0"
                                        ref="Price"
                                        required
                                    /><br/>
                                    Number of copies
                                    <input
                                        className={"inputForAdd"}
                                        type="number"
                                        min="0"
                                        ref="Copies"
                                    /><br/>
                                    Number of references
                                    <input
                                        className={"inputForAdd"}
                                        type="number"
                                        min="0"
                                        ref="References"
                                    /><br/><br/>

                                </form>
                                Bestseller?
                                <button
                                    id="bestButton"
                                    style={{background:"Red",
                                        margin:"5px 45% 5px 5px"}}
                                    onClick={this.bs.bind(this)}
                                >No</button>:

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
})(AddBookButton);