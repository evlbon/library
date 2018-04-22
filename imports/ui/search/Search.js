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


const Search = Input.Search;
const { Header, Content, Sider } = Layout;

class SEARCH extends Component {
    constructor(){
        super();
        this.state={
            foundBooks:[],
            foundArticles: [],
            foundAVs: [],
        };

    }

    searchBooks(value){
        let foundBooks=[];
        let dist = value.length;

        this.props.books.forEach((o)=>{
            let d = distance(o.title.toLowerCase(),value.toLowerCase());
            let i = false;


            if(d===0){
                foundBooks.push(o);
                i=true;
            }
            else{
                if(d<dist*0.4){
                    foundBooks.push(o);
                    i=true;
                }
            }

            if(!i){
                let authors = Author.find({ _id: { $in: o.authorsID} }).map(a => a.name);
                authors.forEach((a)=>{
                    let ad = distance(a.toLowerCase(),value.toLowerCase());
                    if(ad===0){
                        foundBooks.push(o);
                        i=true;
                    }
                    else{
                        if(ad<dist*0.4){
                            foundBooks.push(o);
                            i=true;
                        }
                    }

                })
            }

            if(!i){
                let tags = o.tags;
                tags.forEach((a)=> {
                    let ad = distance(a.toLowerCase(), value.toLowerCase());
                    if (ad === 0) {
                        foundBooks.push(o);
                        i = true;
                    }
                    else {
                        if (ad < dist * 0.4) {
                            foundBooks.push(o);
                            i = true;
                        }
                    }
                })
            }
        });

        this.setState({
            foundBooks:foundBooks
        });



    }

    searchArticles(value){
        let foundArticles=[];
        let dist = value.length;

        this.props.jarticles.forEach((o)=>{
            let d = distance(o.title.toLowerCase(),value.toLowerCase());
            let i = false;


            if(d===0){
                foundArticles.push(o);
                i=true;
            }
            else{
                if(d<dist*0.4){
                    foundArticles.push(o);
                    i=true;
                }
            }

            if(!i){
                let authors = Author.find({ _id: { $in: o.authorsID} }).map(a => a.name);
                authors.forEach((a)=>{
                    let ad = distance(a.toLowerCase(),value.toLowerCase());
                    if(ad===0){
                        foundArticles.push(o);
                        i=true;
                    }
                    else{
                        if(ad<dist*0.4){
                            foundArticles.push(o);
                            i=true;
                        }
                    }

                })
            }

            if(!i){
                let tags = o.tags;
                tags.forEach((a)=> {
                    let ad = distance(a.toLowerCase(), value.toLowerCase());
                    if (ad === 0) {
                        foundArticles.push(o);
                        i = true;
                    }
                    else {
                        if (ad < dist * 0.4) {
                            foundArticles.push(o);
                            i = true;
                        }
                    }
                })
            }
        });

        this.setState({
            foundArticles:foundArticles
        });



    }


    searchAVs(value){
        let foundAVs=[];
        let dist = value.length;

        this.props.avs.forEach((o)=>{
            let d = distance(o.title.toLowerCase(),value.toLowerCase());
            let i = false;


            if(d===0){
                foundAVs.push(o);
                i=true;
            }
            else{
                if(d<dist*0.4){
                    foundAVs.push(o);
                    i=true;
                }
            }

            if(!i){
                let authors = Author.find({ _id: { $in: o.authorsID} }).map(a => a.name);
                authors.forEach((a)=>{
                    let ad = distance(a.toLowerCase(),value.toLowerCase());
                    if(ad===0){
                        foundAVs.push(o);
                        i=true;
                    }
                    else{
                        if(ad<dist*0.4){
                            foundAVs.push(o);
                            i=true;
                        }
                    }

                })
            }

            if(!i){
                let tags = o.tags;
                tags.forEach((a)=> {
                    let ad = distance(a.toLowerCase(), value.toLowerCase());
                    if (ad === 0) {
                        foundAVs.push(o);
                        i = true;
                    }
                    else {
                        if (ad < dist * 0.4) {
                            foundAVs.push(o);
                            i = true;
                        }
                    }
                })
            }
        });

        this.setState({
            foundAVs:foundAVs
        });



    }




    search(value){
        this.searchBooks(value);
        this.searchArticles(value);
        this.searchAVs(value);


    }


    render() {


        return (
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Search</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>
                        <div style={{margin:" 0 30% 0 0"}}>
                            <Search placeholder="input search text" enterButton="Search" size="large"
                                    onSearch={(value) => (this.search(value))}/>
                        </div>

                        { this.state.foundBooks.map((book) => (<Book2 key={book._id} book={book}/> ))}
                        { this.state.foundArticles.map((jarticle) => (<Article2 key={jarticle._id} jarticle={jarticle}/> ))}
                        { this.state.foundAVs.map((av) => (<AV2 key={av._id} av={av}/> ))}




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
})(SEARCH);



