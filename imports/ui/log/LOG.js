import {Librarian} from "../../models/users/librarian";
import {Component} from "react";
import {Author} from "../../models/utility/author";
import {Meteor} from "meteor/meteor";
import * as functions from "../../methods/functions";
import { withTracker } from 'meteor/react-meteor-data';
import {Books} from "../../models/documents/book";
import {Breadcrumb, Input, Layout} from 'antd';
import React from "react";
import {Link} from "react-router-dom";
import {distance} from "../../alg/distanceOfLevenshtein";
import Book2 from "../book/Book2";
import {AVs} from "../../models/documents/av";
import {JournalArticle} from "../../models/documents/journal_article";
import AV2 from "../av/AV2";
import Article2 from "../articles/Article2";
import {getLogs} from "../../methods/functions";


const Search = Input.Search;
const { Header, Content, Sider } = Layout;

class LOG extends Component {

    render() {


        return (
            <Layout style={{ padding: '0 24px 24px' }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Log</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>
                    {getLogs().map((o)=><li style={{margin:0, padding:0}}><h2>{o}</h2></li>)}






                </Content>
            </Layout>


        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        books : Books.find({}).fetch(),
        avs: AVs.find({}).fetch(),
        jarticles: JournalArticle.find({}).fetch(),
    };
})(LOG);



