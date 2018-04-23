import {Component} from "react";
import React from "react";
import {Meteor} from "meteor/meteor";
import {AVs} from "../../models/documents/av";
import { withTracker } from 'meteor/react-meteor-data';
import {Librarian} from "../../models/users/librarian";

import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import {BrowserRouter, Route, Link} from "react-router-dom"
import AV from "./AV";
import AddAVButton from "../../api/AddAVButton";
import AV2 from "./AV2";

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

export class AllAVs2 extends Component {
    render(){

        if(Meteor.userId()) {

            return (<Layout style={{ padding: '0 24px 24px' }}>

                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home </Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Audio and Video</Breadcrumb.Item>
                </Breadcrumb>

                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 800 }}>

                    {this.props.avs.map((av) => (<AV2 key={av._id} av={av}/> ))}

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
        let isLibrarian1 = isLabrarian&&Librarian.findOne({libraryID : this.props.currentUser._id}).privilege === "1";


        return(

                    <Sider width={200} style={{ background: '#fff',float:"left" }}>
                        <Menu
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1"><Link to="/av/allavs">All Audio and Video </Link></Menu.Item>

                            {isLabrarian?
                                <Menu.Item key="2"><Link to="/av/rentedAVs">Rented AVs </Link></Menu.Item>:""}


                            {isLabrarian && isLibrarian1? <AddAVButton/>:""}


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
