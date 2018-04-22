import {Component} from "react";
import React from "react";
import {Meteor} from "meteor/meteor";
import {User} from "../../models/users/user";
import Users from "./User"
import Users2 from "./User2"
import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../../models/users/librarian";
import {Admin} from "../../models/users/admin";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {BrowserRouter, Route, Link} from "react-router-dom"
import {AddNewUser} from "../../api/AddNewUser";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;











export class AllUsers extends Component {
    render(){

        if(Meteor.userId()) {

            return <Layout style={{ padding: '0 24px 24px', id:"lay" }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Users</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                    {this.props.users.map((user) => (<Users key={user._id} user={user}/>))}

                </Content>
            </Layout>



        }
        else return<h1>PLEASE LOGIN</h1>

    }

}




export class UserStories extends Component {
    render(){

        if(Meteor.userId()) {

            return <Layout style={{ padding: '0 24px 24px', id:"lay" }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Users</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                    {this.props.users.map((user) => (<Users2 key={user._id} user={user}/>))}

                </Content>
            </Layout>



        }
        else return<h1>PLEASE LOGIN</h1>

    }

}

class USERS extends Component{

    render(){
        let isLibrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        let isAdmin = this.props.currentUser &&
            Admin.findOne({libraryID : this.props.currentUser._id}) &&
            Admin.findOne({libraryID : this.props.currentUser._id}).group === "Admin";

        if(isLibrarian || isAdmin) {
            let isLibrarian1 = isLibrarian && Librarian.findOne({libraryID : this.props.currentUser._id}).privilege==="1";
            return(

                <Sider width={200} style={{ background: '#fff',float:"left" }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Link to="/users/allusers">All Users </Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/users/userstories">User Stories </Link></Menu.Item>
                        {!isLibrarian1?<AddNewUser/>:""}


                    </Menu>
                </Sider>




            );
        }
        else return(<h1>YOU AREN'T LIBRARIAN</h1>)
    }
}


export default withTracker(() => {
    return {

        currentUser: Meteor.user(),
    };
})(USERS);
