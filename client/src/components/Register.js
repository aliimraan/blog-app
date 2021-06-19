import React, { Component, Fragment } from 'react'
import axios from 'axios';
import '../css/register.css';

class Register extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            password:'',
            phno:'',
            intro:'',
            pp:'',
        }
    }
    fieldhandler=(e)=>{
       this.setState({
           [e.target.name]:e.target.value
       })
    }
    fileHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.files[0]
        })
    }

    submitHandler=(e)=>{
        e.preventDefault();
        const data=new FormData()

        data.append('name',this.state.name)
        data.append('email',this.state.email)
        data.append('password',this.state.password)
        data.append('phno',this.state.phno)
        data.append('intro',this.state.intro)
        data.append('pp',this.state.pp)
        
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('http://localhost:5000/users/register',data,config)
        .then(data=>{
            const success=data
            window.open('/login','_self')
        })
        .catch(err=>console.log('data not inserted'+err))
        
    }
    render(){
        return(
            <Fragment>
                <div className="login">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-1"></div>
                            <div className="col-md-4">
                                <div className="image">
                                    <img src="images/cf1.jpg"/>
                                </div>
                                <div className="newlogin">
                                    <div className="heading">
                                        Already have account
                                    </div>
                                    <button onClick={()=>window.open('/login','_self')}>login</button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="main_form">
                                    <div className="heading">
                                        <h1>create account</h1>
                                    </div>
                                    <form className="form-group" onSubmit={this.submitHandler}>
                                    <div className="f_area">
                                        <div className="name">
                                            <input type="text" placeholder="name" name="name" onChange={this.fieldhandler}/>
                                        </div>
                                        <div className="email ">
                                            <input type="text" placeholder="email" name="email" onChange={this.fieldhandler}/>
                                        </div>
                                        <div className="password ">
                                            <input type="text" placeholder="password" name="password" onChange={this.fieldhandler}/>
                                        </div>
                                        <div className="phoneNo ">
                                            <input type="text" placeholder="phoneNo" name="phno" onChange={this.fieldhandler}/>
                                        </div>
                                        <div className="intro ">
                                            <textarea cols="90px"placeholder="About Youself" name="intro" onChange={this.fieldhandler}></textarea>
                                        </div>
                                        <div className="profile">
                                            <input type="file" placeholder="profile pic" name="pp" onChange={this.fileHandler}/>
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

export default Register