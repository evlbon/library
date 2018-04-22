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


const Search = Input.Search;
const { Header, Content, Sider } = Layout;

class SEARCH extends Component {
    constructor(){
        super();
        this.state={
            foundBooks:[]
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
                console.log(d);
                console.log(dist*0.4);
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
                        console.log(d);
                        console.log(dist*0.4);
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
                        console.log(d);
                        console.log(dist * 0.4);
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

    search(value){
        this.searchBooks(value);


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




                    </Content>
                </Layout>


        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
        books : Books.find({}).fetch(),
    };
})(SEARCH);



