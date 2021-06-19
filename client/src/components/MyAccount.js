import axios from 'axios'
import React, { Component,Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import MainNav from './MainNav'
import ProfileCard from './ProfileCard'
import SinglePost from './SinglePost'
import WritePost from './WritePost'

export default class MyAccount extends Component {
    constructor(){
        super()
        this.state={
            myPosts:[],
        }
    }
    componentDidMount(){
        this.getMyPosts()
    }
    getMyPosts=()=>{
        const Token=localStorage.getItem('token')
        const user_id=localStorage.getItem('user_id')
        const config={
            headers:{'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/posts/personalPosts/'+user_id,config)
        .then(res=>{
            const p_data=res
            this.setState({
                myPosts:p_data
            })
        }).catch(err=>{
            console.log(err)
        })
    }
  
    render() {

        const Token=localStorage.getItem('token')
        return (
            Token==null?<Redirect to="/login"/>:
            <Fragment>
            <MainNav/>
                <div className="hero">
            
                    <ProfileCard />  
                </div>
            </Fragment>
        )
    }
}
