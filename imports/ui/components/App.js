import React, { Component } from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.js';

import Book from '../Book.js';
import Article from '../Article';
import {Librarian} from "../../models/users/librarian"

import Users from "../User"
import {User} from "../../models/users/user";

import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Books } from '../../models/documents/book';
import { JournalArticle } from "../../models/documents/journal_article";
import { AVs} from "../../models/documents/av";
import { Meteor } from 'meteor/meteor';
import {ViewDocs} from "./ViewDocs"
import {BrowserRouter, Route, Link} from "react-router-dom"
import createBrowserHistory from "history/createBrowserHistory"
import BOOKS from "./BOOKS";
import ARTICLES from "./ARTICLES";
import AaV from "./AaV";
import USERS from "./USERS";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;





class Home extends Component{

    render(){
        if (this.props.currentUser){
            if (this.props.users.length===0){
                Meteor.call('addLibrarian', {id: this.props.currentUser._id, name: this.props.currentUser.username})
            }
            else if(!User.findOne({libraryID : this.props.currentUser._id})){
                Meteor.call('addHumbleUser', {id: this.props.currentUser._id, name: this.props.currentUser.username})
            }

        }



        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
        return(

            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="0"><AccountsUIWrapper/></Menu.Item>
                        <Menu.Item key="1"><Link to="/books">Books </Link></Menu.Item>

                        <Menu.Item key="2"><Link to="/articles">Articles </Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/av">Audio and Video </Link></Menu.Item>
                        {isLabrarian? <Menu.Item key="666"><Link to="/users">Users </Link></Menu.Item>:""}
                    </Menu>
                </Header>

            </Layout>


    //
    //         <Layout>
    //         <Sider width={200} style={{ background: '#fff' }}>
    // <Menu
    //     mode="inline"
    //     defaultSelectedKeys={['1']}
    //     defaultOpenKeys={['sub1']}
    //     style={{ height: '100%', borderRight: 0 }}
    // >
    // <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
    // <Menu.Item key="1">option1</Menu.Item>
    //     <Menu.Item key="2">option2</Menu.Item>
    //     <Menu.Item key="3">option3</Menu.Item>
    //     <Menu.Item key="4">option4</Menu.Item>
    //     </SubMenu>
    //     <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
    //         <Menu.Item key="5">option5</Menu.Item>
    //         <Menu.Item key="6">option6</Menu.Item>
    //         <Menu.Item key="7">option7</Menu.Item>
    //         <Menu.Item key="8">option8</Menu.Item>
    //     </SubMenu>
    //     <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
    // <Menu.Item key="9">option9</Menu.Item>
    //     <Menu.Item key="10">option10</Menu.Item>
    //     <Menu.Item key="11">option11</Menu.Item>
    //     <Menu.Item key="12">option12</Menu.Item>
    //     </SubMenu>
    // </Menu>
    // </Sider>
    //     <Layout style={{ padding: '0 24px 24px' }}>
    //         <Breadcrumb style={{ margin: '16px 0' }}>
    //             <Breadcrumb.Item>Home</Breadcrumb.Item>
    //             <Breadcrumb.Item>List</Breadcrumb.Item>
    //             <Breadcrumb.Item>App</Breadcrumb.Item>
    //             </Breadcrumb>
    //             <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 500 }}>
    //                 Content
    //             </Content>
    //             </Layout>
    //     </Layout>

    //
    //
    //
    //         <BrowserRouter>
    //
    //         <div className="container">
    //         <header>
    //         <div id={"lab"}>
    //         <h1 align="center">#InnoLibrary</h1>
    //
    //
    // </div>
    //
    //     <div className="navigation">
    //
    //         <Link to="/books">Books </Link>
    //
    //         <Link to="/articles">Articles</Link>
    //
    //         <Link to="/av">Audio or Video</Link>
    //
    //         {isLabrarian?<Link to="/users">Users</Link>:""}
    //
    //     </div>
    //     <div className="login" >
    //         <AccountsUIWrapper/>
    //         </div>
    //
    //
    //
    //
    //
    //
    //     </header>
    //
    //
    //
    //     <Route exact path="/books" component={BOOKS} />
    //     <Route exact path="/articles" component={ARTICLES} />
    //     <Route exact path="/av" component={AaV} />
    //     <Route exact path="/users" component={USERS} />
    // </div>
    //



        )

    }
}


export default withTracker(() => {
    return {
        users : User.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(Home);



