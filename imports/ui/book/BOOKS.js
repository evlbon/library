import {Component} from "react";
import React from "react";
import {Meteor} from "meteor/meteor";
import {Books} from "../../models/documents/book";
import { withTracker } from 'meteor/react-meteor-data';
import Book from "./Book";
import AddBookButton from "../../api/AddBookButton";
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {BrowserRouter, Route, Link} from "react-router-dom"
import Book2 from "./Book2";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export class Allbooks extends Component {
    render(){

        if(Meteor.userId()) {

            return (<Layout style={{ padding: '0 24px 24px' }}>

                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                            <Breadcrumb.Item>Books</Breadcrumb.Item>
                        </Breadcrumb>

                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                            {this.props.books.map((book) => (<Book key={book._id} book={book}/> ))}

                        </Content>
                    </Layout>)



        }
        else return<h1>PLEASE LOGIN</h1>

    }

}

export class Allbooks2 extends Component {
    render(){

        if(Meteor.userId()) {

            return (<Layout style={{ padding: '0 24px 24px' }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Books</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                    {this.props.books.map((book) => (<Book2 key={book._id} book={book}/> ))}

                </Content>
            </Layout>)



        }
        else return<h1>PLEASE LOGIN</h1>

    }

}









class BOOKS extends Component{

    render(){
        let isLabrarian = this.props.currentUser &&
                          Librarian.findOne({libraryID : this.props.currentUser._id}) &&
                          Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
        let isLibrarian1 = isLabrarian&&Librarian.findOne({libraryID : this.props.currentUser._id}).privilege === "1";

        return(


                <Sider width={200} style={{ background: '#fff',float:"left"}}>
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/books/allbooks">All Books </Link></Menu.Item>

                        {isLabrarian?
                            <Menu.Item key="2"><Link to="/books/rentedBooks">Rented Books </Link></Menu.Item>:""}

                        {isLabrarian && !isLibrarian1?
                            <AddBookButton/>:""}


                    </Menu>
                </Sider>






        )
    }
}


export default withTracker(() => {
    return {
        books : Books.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(BOOKS);
