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
import USERS from "./USERS";
import AaV from "./AaV";

import {BrowserRouter, Route, Link} from "react-router-dom"
import Article from "../Article";
import AddArticleButton from "../../api/AddArticleButton";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;










const AllArticles = function() {
    let articles = JournalArticle.find({}).fetch();

    if(Meteor.userId()) {

        return <div>

            {articles.map((jarticle) => (<Article key={jarticle._id} jarticle={jarticle}/>))}

        </div>
    }
};













class ARTICLES extends Component{

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
                            <Menu.Item key="1"><Link to="/articles/allarticles">All Articles </Link></Menu.Item>
                            {isLabrarian? <AddArticleButton/>:""}


                        </Menu>
                    </Sider>

                    <Layout style={{ padding: '0 24px 24px' }}>

                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                            <Breadcrumb.Item>Articles</Breadcrumb.Item>
                        </Breadcrumb>

                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                            <Route exact path="/articles/allarticles" component={AllArticles} />

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
})(ARTICLES);
