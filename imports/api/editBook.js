import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";


import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../models/users/librarian";
import { Select } from 'antd';
import {Books} from "../models/documents/book";
function handleChange(value) {
    console.log(`selected ${value}`);
}
const Option = Select.Option;



export class EditBook extends Component {

    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        let book = Books.findOne({_id: this.props.id});

        let Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        (!Title)? Title=book.title:"";

        let Author = ReactDOM.findDOMNode(this.refs.Author).value.trim();
        (!Author)? Author=book.authors:Author=Author.split(',');

        let Publisher = ReactDOM.findDOMNode(this.refs.Publisher).value.trim();
        (!Publisher)? Publisher=book.publisher:"";

        let Edition = ReactDOM.findDOMNode(this.refs.Edition).value.trim();
        (!Edition)? Edition=book.edition:"";

        let PDate = ReactDOM.findDOMNode(this.refs.ReleaseDate).value.trim();
        (!PDate)? PDate=book.release_date:PDate=new Date(PDate,1);

        let Tags = ReactDOM.findDOMNode(this.refs.Tags).value.trim();
        (!Tags)? Tags=book.tags:Tags=Tags.split(',');

        let Price = Number(ReactDOM.findDOMNode(this.refs.Price).value.trim());
        (!Price)? Price=book.price:"";

        let Copies = ReactDOM.findDOMNode(this.refs.Copies).value.trim();
        (!Copies)? Copies= book.numberOfCopies() : Copies=Number(Copies);

        let References = Number(ReactDOM.findDOMNode(this.refs.References).value.trim());
        (!References)? References=book.numberOfReferences():"";

        let Bestseller = Boolean(ReactDOM.findDOMNode(this.refs.Bestseller).value.trim());

        //TODO
        console.log("Value changes even if i don't switch the checkbox " + Bestseller);

        Meteor.call('editBook',this.props.id,{
            title: Title,
            authors: Author,
            edition: Edition,
            publisher: Publisher,
            release_date: PDate,
            price: Number(Price),
            tags: Tags,
            number_of_copies: Copies,
            number_of_references: References,
            bestseller: !(Boolean(Bestseller))
        });



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
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        console.log(this.props.ID);

        return   <div>

            <Button  onClick={this.showModal}>Edit</Button>


            <Modal
                title="Modify Book"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className="AddBlock"
                closable={false}
            >
                <h5>Leave empty means do not need modification </h5>
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
                        /><br/>
                        Bestseller?
                        <input
                            type="checkbox"
                            ref="Bestseller"
                            style={{margin:"5px 45% 5px 5px"}}
                        />


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
})(EditBook);