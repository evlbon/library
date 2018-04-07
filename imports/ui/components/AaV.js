import {Component} from "react";
import React from "react";
import {Meteor} from "meteor/meteor";
import {AVs} from "../../models/documents/av";
import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {BrowserRouter, Route, Link} from "react-router-dom"
import AV from "../AV";
import AddAVButton from "../../api/AddAVButton";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;




export class AllAVs extends Component {
    render(){

        if(Meteor.userId()) {

            return (<Layout style={{ padding: '0 24px 24px', id:"lay" }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Audio and Video</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                    {this.props.avs.map((av) => (<AV key={av._id} av={av}/>))}

                </Content>
            </Layout>)



        }
        else return<h1>PLEASE LOGIN</h1>

    }

}



class AaV extends Component{

    render(){
        let isLabrarian = this.props.currentUser &&
            Librarian.findOne({libraryID : this.props.currentUser._id}) &&
            Librarian.findOne({libraryID : this.props.currentUser._id}).group === "Librarian";

        return(

                    <Sider width={200} style={{ background: '#fff',float:"left" }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1"><Link to="/av/allavs">All Audio and Video </Link></Menu.Item>
                            {isLabrarian? <AddAVButton/>:""}


                        </Menu>
                    </Sider>


        )
    }
}


export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(AaV);
