import {Component} from "react";
import React from "react";
import {Meteor} from "meteor/meteor";
import {JournalArticle} from "../../models/documents/journal_article";
import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {BrowserRouter, Route, Link} from "react-router-dom"
import Article from "./Article";
import AddArticleButton from "../../api/AddArticleButton";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;





export class AllArticles extends Component {
    render(){

        if(Meteor.userId()) {

            return (<Layout style={{ padding: '0 24px 24px'}}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Articles</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                    {this.props.articles.map((jarticle) => (<Article key={jarticle._id} jarticle={jarticle}/>))}

                </Content>
            </Layout>)



        }
        else return<h1>PLEASE LOGIN</h1>

    }

}












class ARTICLES extends Component{

    render(){
        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        return(

                    <Sider width={200} style={{ background: '#fff' ,float:"left"}}>
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


        )
    }
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(ARTICLES);
