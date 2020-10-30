import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

export default class Users extends Component{
    constructor(){
        super()
        this.state={
            uname:''
        }
    }
    componentDidMount(){
        let Token =localStorage.getItem('token')
        const options = {
            headers: {'x-auth-token': Token}
          };
        axios.get('http://localhost:5000/users/',options)
        .then(response=>{
           
            this.setState({
                uname:localStorage.getItem('name')
            })
        }).catch(err=>
           this.props.history.push('/login'))
    }

    logoutHandler=()=>{
         localStorage.removeItem('token')
         localStorage.removeItem('name')
         this.props.history.push('/login')
       
    }
    render(){
        return(
            <Fragment><h1>hello {this.state.uname}</h1><br/>  
                <button onClick={this.logoutHandler} className="btn btn-dark">logout</button>
            </Fragment>         
        )
    }
}