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
import {JournalArticle} from "../models/documents/journal_article";
import {AVs} from "../models/documents/av";


function handleChange(value) {
    console.log(`selected ${value}`);
}
const Option = Select.Option;



export class EditAV extends Component {

    state = { visible: false };

    constructor(){
        super();
        this.av1=null;

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        let av = this.av1;

        let Title = ReactDOM.findDOMNode(this.refs.Title).value.trim();
        (!Title)? Title=av.title:"";

        let Authors = ReactDOM.findDOMNode(this.refs.Authors).value.trim();
        (!Authors)? Authors=Author.find({ _id: { $in: av.authorsID} }).map(o => o.name):Authors=Authors.split(',');

        let PDate = ReactDOM.findDOMNode(this.refs.ReleaseDate).value.trim();
        (!PDate)? PDate=av.release_date:PDate=new Date(PDate,1);

        let Tags = ReactDOM.findDOMNode(this.refs.Tags).value.trim();
        (!Tags)? Tags=av.tags:Tags=Tags.split(',');

        let Price = Number(ReactDOM.findDOMNode(this.refs.Price).value.trim());
        (!Price)? Price=av.price:"";

        let Copies = ReactDOM.findDOMNode(this.refs.Copies).value.trim();
        (!Copies)? Copies= av.numberOfCopies() : Copies=Number(Copies);

        let References = Number(ReactDOM.findDOMNode(this.refs.References).value.trim());
        (!References)? References=av.numberOfReferences():"";


        if(functions.canEditDocument(this.props.id,Copies,References)) {
            Meteor.call('editAV',this.props.id,{
                title: Title,
                authors: Authors,
                release_date: PDate,
                price: Number(Price),
                tags: Tags,
                number_of_copies: Copies,
                number_of_references: References,

            });

            ReactDOM.findDOMNode(this.refs.Title).value = '';
            ReactDOM.findDOMNode(this.refs.Authors).value = '';
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
            document.getElementById('editAVError').style.display="";
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        this.av1=AVs.findOne({_id: this.props.id});


        return   <div>

            <Button  onClick={this.showModal}>Edit</Button>


            <Modal
                title="Modify AV"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                className="AddBlock"
                closable={false}
            >
                <h5>Leave empty means do not need modification </h5>
                <h5 id="editAVError" style={{display:"none",color:"red"}}> Incorrect number of copies or references</h5>
                <div  align="right" >
                    <form style={{fontSize: "15px",fontFamily:"Arial"}}>

                        Title
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Title"
                            placeholder={this.av1.title}
                        /><br/>
                        Author
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Authors"
                            placeholder={Author.find({ _id: { $in: this.av1.authorsID} }).map(o => o.name).join(', ')}
                        /><br/>

                        ReleaseDate
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="ReleaseDate"
                            placeholder={this.av1.release_date ? this.av1.release_date.getFullYear() : ""}
                        /><br/>
                        Tags
                        <input
                            className={"inputForAdd"}
                            type="text"
                            ref="Tags"
                            placeholder={this.av1.tags.join(', ')}
                        /><br/>
                        Price
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="Price"
                            placeholder={this.av1.price}
                        /><br/>
                        Number of copies
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="Copies"
                            placeholder={this.av1.numberOfCopies()}
                        /><br/>
                        Number of references
                        <input
                            className={"inputForAdd"}
                            type="number"
                            min="0"
                            ref="References"
                            placeholder={this.av1.numberOfReferences()}
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
})(EditAV);