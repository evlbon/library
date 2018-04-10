import React, { Component } from 'react';
import AccountsUIWrapper from './users/AccountsUIWrapper.js';
import {Librarian} from "../models/users/librarian"
import {User} from "../models/users/user";
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {BrowserRouter, Route, Link} from "react-router-dom"
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Icon, Popover, Button} from 'antd';
import { Badge } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;





class Home extends Component{

    render(){
        let user = null;
        let numberOfNotifications=0;
        let content=<p>Nothing</p>;
        if(this.props.currentUser && User.findOne({libraryID : this.props.currentUser._id})){
            user=User.findOne({libraryID : this.props.currentUser._id});
            if (user.notifications.length!==0){
                numberOfNotifications=user.notifications.length;
                content = user.notifications.map((notification)=>(<p key={notification.title}>{notification.body}</p>))
            }
        }


        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";
        return(

            <Layout>

                <div className="smenu">

                    <div align="center" style={{float:"right", overflow:"visible",height:"50px",width:"100px"}}>
                        <AccountsUIWrapper/>
                    </div>


                    <div align="center" style={{float:"right", overflow:"visible",width:"120px",margin:"20px auto auto auto"}}>
                        <Badge count={numberOfNotifications}>
                            <Popover content={content} placement="bottom" title="Yor Notifications">
                                <button >Notification</button>
                            </Popover>
                        </Badge>
                    </div>
                </div>


                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/books/allbooks"><Icon type="book" />Books </Link></Menu.Item>

                        <Menu.Item key="2"><Link to="/articles/allarticles"><Icon type="profile" />Articles </Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/av/allavs"><Icon type="play-circle-o" />Audio and Video </Link></Menu.Item>
                        {isLabrarian? <Menu.Item key="666"><Link to="/users/allusers"><Icon type="user" />Users </Link></Menu.Item>:""}

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



