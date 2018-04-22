import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";
import * as functions from "../methods/functions"

import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../models/users/librarian";
import { Select } from 'antd';
import {Books} from "../models/documents/book";
import {Author} from "../models/utility/author";
function handleChange(value) {
    console.log(`selected ${value}`);
}
const Option = Select.Option;



export class EditBook extends Component {

    state = { visible: false };

    constructor(){
        super();
        this.book=null;
        this.bestseller=false

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        let book = this.book;

        let Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        (!Title)? Title=book.title:"";

        let Authors = ReactDOM.findDOMNode(this.refs.Authors).value.trim();
        (!Authors)? Authors=Author.find({ _id: { $in: book.authorsID} }).map(o => o.name):Authors=Authors.split(',');

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


        //TODO


        if(functions.canEditDocument(this.props.id,Copies,References)) {
            Meteor.call('editBook',this.props.id,{
                title: Title,
                authors: Authors,
                edition: Edition,
                publisher: Publisher,
                release_date: PDate,
                price: Number(Price),
                tags: Tags,
                number_of_copies: Copies,
                number_of_references: References,
                bestseller: this.bestseller,
            });



            ReactDOM.findDOMNode(this.refs.Title).value = '';
            ReactDOM.findDOMNode(this.refs.Authors).value = '';
            ReactDOM.findDOMNode(this.refs.Publisher).value = '';
            ReactDOM.findDOMNode(this.refs.Edition).value = '';
            ReactDOM.findDOMNode(this.refs.ReleaseDate).value = '';
            ReactDOM.findDOMNode(this.refs.Copies).value = '';
            ReactDOM.findDOMNode(this.refs.References).value = '';
            ReactDOM.findDOMNode(this.refs.Tags).value = '';
            ReactDOM.findDOMNode(this.refs.Price).value = '';

            document.getElementById('editBookError').style.display="none";
            this.setState({
                visible: false,
            });
        }
        else
            document.getElementById('editBookError').style.display="";
    };

    bs(){
        if(this.bestseller){
            this.bestseller=false;
            document.getElementById(this.book._id).style.background="Red";
            document.getElementById(this.book._id).innerText="No"

        }
        else{
            this.bestseller=true;
            document.getElementById(this.book._id).style.background="Green";
            document.getElementById(this.book._id).innerText="Yes"
        }

    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        this.book=Books.findOne({_id: this.props.id});

        this.bestseller = this.book.bestseller;

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
                <h5 id="editBookError" style={{display:"none",color:"red"}}> Incorrect number of copies or references</h5>
                <div  align="right" >
                    <form style={{fontSize: "15px",fontFamily:"Arial"}}>

                        Title
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Title"
                            placeholder={this.book.title}
                        /><br/>
                        Authors
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Authors"
                            placeholder={Author.find({ _id: { $in: this.book.authorsID} }).map(o => o.name).join(', ')}
                        /><br/>
                        Publisher
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Publisher"
                            placeholder={this.book.publisher}
                        /><br/>
                        Edition
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Edition"
                            placeholder={this.book.edition}
                        /><br/>
                        ReleaseDate
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="ReleaseDate"
                            placeholder={this.book.release_date ? this.book.release_date.getFullYear() : ""}
                        /><br/>
                        Tags
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Tags"
                            placeholder={this.book.tags.join(', ')}
                        /><br/>
                        Price
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="Price"
                            placeholder={this.book.price}
                        /><br/>
                        Number of copies
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="Copies"
                            placeholder={this.book.numberOfCopies()}
                        /><br/>
                        Number of references
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="References"
                            placeholder={this.book.numberOfReferences()}
                        /><br/><br/>


                    </form>
                    Bestseller?
                    <button
                        id={this.book._id}
                        style={{background:"Red",
                            margin:"5px 45% 5px 5px"}}
                        onClick={this.bs.bind(this)}
                    >No</button>:

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