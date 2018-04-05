import {Component} from "react";
import React from "react";
import {Meteor} from "meteor/meteor";
import {Books} from "../../models/documents/book";
import { withTracker } from 'meteor/react-meteor-data';
import Book from "../Book";
import AddBookButton from "../../api/AddBookButton";
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

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
    else return<h1>PLEASE LOGIN</h1>
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
        currentUser: Meteor.user(),
    };
})(BOOKS);
