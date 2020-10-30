import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Login extends Component{
    constructor(){
        super()
        const isLogin=false
        this.state={
            email:'',
            password:'',
            isLogin:'',
            isError:''
        }
    }
    fieldhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitHandler=(e)=>{
        e.preventDefault();
        
        axios.post('http://localhost:5000/users/login',this.state)
        .then(res=>{
            console.log(res)
            const u_name=res.data.data.name;
            const user_id=res.data.data._id
            const  token=res.data.token;
           
            localStorage.setItem("token",token);
            localStorage.setItem("name",u_name);
            localStorage.setItem("user_id",user_id);
            this.setState({
                isLogin:true,
                token:true,
            })
            window.open('/','_self')
        
           
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
            <Fragment>
            <div className="login">
            <div className="container">
                <div className="row">
                <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <img src="images/cf1.jpg" style={{height:"100%",width:"100%"}}/>
                    </div>
                    <div className="col-md-6">
                        <div className="main_form">
                            <div className="heading">
                                <h1>welcome ! login </h1>
                            </div>
                            <form className="form-group" onSubmit={this.submitHandler}>
                            <div className="f_area">
                                
                                <div className="email ">
                                    <input type="text" placeholder="email" name="email" onChange={this.fieldhandler}/>
                                </div>
                                <div className="password ">
                                    <input type="text" placeholder="password" name="password" onChange={this.fieldhandler}/>
                                </div>
                               
                                
                            </div>
                               <div className="container">
                               <button className="form-control">submit</button>
                               
                               </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
            </Fragment>
        )
    }
}
export default Login