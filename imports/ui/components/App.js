import React, { Component } from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.js';
import {Librarian} from "../../models/users/librarian"
import {User} from "../../models/users/user";
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {BrowserRouter, Route, Link} from "react-router-dom"
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
                        <Menu.Item key="1"><Link to="/books/allbooks"><Icon type="book" />Books </Link></Menu.Item>

                        <Menu.Item key="2"><Link to="/articles/allarticles"><Icon type="profile" />Articles </Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/av"><Icon type="play-circle-o" />Audio and Video </Link></Menu.Item>
                        {isLabrarian? <Menu.Item key="666"><Link to="/users"><Icon type="user" />Users </Link></Menu.Item>:""}
                    </Menu>
                </Header>

            </Layout>


        )

    }
}


export default withTracker(() => {
    return {
        users : User.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(Home);



