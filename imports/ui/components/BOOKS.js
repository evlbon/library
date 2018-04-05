import {Component} from "react";
import React from "react";
import {ViewDocs} from "./ViewDocs";
import {Meteor} from "meteor/meteor";
import {User} from "../../models/users/user";
import {JournalArticle} from "../../models/documents/journal_article";
import {AVs} from "../../models/documents/av";
import {Books} from "../../models/documents/book";
import { withTracker } from 'meteor/react-meteor-data';
import Book from "../Book";
import AddBookButton from "../../api/AddBookButton";
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Home from "./App";
import ARTICLES from "./ARTICLES";
import USERS from "./USERS";
import AaV from "./AaV";

import {BrowserRouter, Route, Link} from "react-router-dom"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;










const Allbooks = function() {
    let books = Books.find({}).fetch();

    if(Meteor.userId()) {

        return <div>

            {books.map((book) => (<Book key={book._id} book={book}/> ))}

            </div>
    }
};













class BOOKS extends Component{

    render(){
        let isLabrarian = this.props.currentUser &&
                          Librarian.findOne({libraryID : this.props.currentUser._id}) &&
                          Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        return(
            <BrowserRouter>


            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/books/allbooks">All Books </Link></Menu.Item>
                        {isLabrarian? <AddBookButton/>:""}


                    </Menu>
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Books</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                        <Route exact path="/books/allbooks" component={Allbooks} />

                    </Content>
                </Layout>



            </Layout>
    </BrowserRouter>

        )
    }
}


export default withTracker(() => {
    return {
        books: Books.find({}).fetch(),
        articles : JournalArticle.find({}).fetch(),
        avs : AVs.find({}).fetch(),
        users : User.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(BOOKS);
