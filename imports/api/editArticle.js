import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import ReactDOM from 'react-dom';
import {Copy} from "../models/documents/document";
import * as functions from "../methods/functions"

import { withTracker } from 'meteor/react-meteor-data';;
import {Librarian} from "../models/users/librarian";
import { Select } from 'antd';
import {Books} from "../models/documents/book";
import {Author} from "../models/utility/author";
import {JournalArticle} from "../models/documents/journal_article";
function handleChange(value) {
    console.log(`selected ${value}`);
}
const Option = Select.Option;



export class EditArticle extends Component {

    state = { visible: false };

    constructor(){
        super();
        this.jarticle=null;

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        let jarticle = this.jarticle;

        let Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        (!Title)? Title=jarticle.title:"";

        let Authors = ReactDOM.findDOMNode(this.refs.Authors).value.trim();
        (!Authors)? Authors=Author.find({ _id: { $in: jarticle.authorsID} }).map(o => o.name):Authors=Authors.split(',');

        let Publisher = ReactDOM.findDOMNode(this.refs.Publisher).value.trim();
        (!Publisher)? Publisher=jarticle.journal:"";

        let Editorr = ReactDOM.findDOMNode(this.refs.Editorr).value.trim();
        (!Editorr)? Editorr=jarticle.editor:"";

        let PDate = ReactDOM.findDOMNode(this.refs.ReleaseDate).value.trim();
        (!PDate)? PDate=jarticle.release_date:PDate=new Date(PDate,1);

        let Tags = ReactDOM.findDOMNode(this.refs.Tags).value.trim();
        (!Tags)? Tags=jarticle.tags:Tags=Tags.split(',');

        let Price = Number(ReactDOM.findDOMNode(this.refs.Price).value.trim());
        (!Price)? Price=jarticle.price:"";

        let Copies = ReactDOM.findDOMNode(this.refs.Copies).value.trim();
        (!Copies)? Copies= jarticle.numberOfCopies() : Copies=Number(Copies);

        let References = Number(ReactDOM.findDOMNode(this.refs.References).value.trim());
        (!References)? References=jarticle.numberOfReferences():"";


        if(functions.canEditDocument(this.props.id,Copies,References)) {
            Meteor.call('editArticle',this.props.id,{
                title: Title,
                authors: Authors,
                editor: Editorr,
                journal: Publisher,
                release_date: PDate,
                price: Number(Price),
                tags: Tags,
                number_of_copies: Copies,
                number_of_references: References,

            });

            ReactDOM.findDOMNode(this.refs.Title).value = '';
            ReactDOM.findDOMNode(this.refs.Authors).value = '';
            ReactDOM.findDOMNode(this.refs.Publisher).value = '';
            ReactDOM.findDOMNode(this.refs.Editorr).value = '';
            ReactDOM.findDOMNode(this.refs.ReleaseDate).value = '';
            ReactDOM.findDOMNode(this.refs.Copies).value = '';
            ReactDOM.findDOMNode(this.refs.References).value = '';
            ReactDOM.findDOMNode(this.refs.Tags).value = '';
            ReactDOM.findDOMNode(this.refs.Price).value = '';


            this.setState({
                visible: false,
            });
        }
        else
            document.getElementById('editBookError').style.display="";
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        this.jarticle=JournalArticle.findOne({_id: this.props.id});

        return   <div>

            <Button  onClick={this.showModal}>Edit</Button>


            <Modal
                title="Modify Article"
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
                            placeholder={this.jarticle.title}
                        /><br/>
                        Author
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Authors"
                            placeholder={Author.find({ _id: { $in: this.jarticle.authorsID} }).map(o => o.name).join(', ')}
                        /><br/>
                       Journal
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Publisher"
                            placeholder={this.jarticle.publisher}
                        /><br/>
                        Editor
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Editorr"
                            placeholder={this.jarticle.editor}
                        /><br/>
                        ReleaseDate
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="ReleaseDate"
                            placeholder={this.jarticle.release_date ? this.jarticle.release_date.getFullYear() : ""}
                        /><br/>
                        Tags
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Tags"
                            placeholder={this.jarticle.tags.join(', ')}
                        /><br/>
                        Price
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="Price"
                            placeholder={this.jarticle.price}
                        /><br/>
                        Number of copies
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="Copies"
                            placeholder={this.jarticle.numberOfCopies()}
                        /><br/>
                        Number of references
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="References"
                            placeholder={this.jarticle.numberOfReferences()}
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
})(EditArticle);