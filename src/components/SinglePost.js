import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Redirect } from 'react-router-dom';
import '../css/singlepost.css';
import axios from 'axios';

export default class SinglePost extends Component{
    constructor(){
        super()
        this.state={
            onePost:[]
        }
       
    }
    componentDidMount(){
        const id=this.props.match.params.id;
        const Token=localStorage.getItem('token')
        const config = {     
            headers: {'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/posts/singlepost/'+id,config).
        then(res=>{
            const singledata=res.data.data[0]
            console.log(singledata)
            this.setState({
                onePost:singledata
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
    const Token =localStorage.getItem('token')
    console.log(Token)
       const {p_title,p_body,p_coverImage,c_name,p_created_at}=this.state.onePost
        return(
            Token==null?<Redirect to="/login"/>: <Fragment>
            <Navbar/>
            <div className="hero">
                <div className="container">
                    <div className="heading">
                        <h1>happy reading</h1>
                        <img src="/images/cool_hand.gif" style={{width:"100px",height:"100px"}}/>
                    </div>
                    <div className="photo">
                        <img src={"http://localhost:5000/public/images/"+p_coverImage} />
                    </div>
                    <div className="box">
                        <div className="info">
                            <div className="topic">
                             {p_title}
                            </div>
                            <div className="middile_desc">
                                <div className="category">
                                 fashion
                                </div>
                            
                            <div className="created_at">
                               {p_created_at}
                            </div>
                            <div className="author">
                                <span>by </span> ali imran
                            </div>
                            </div>
                            <div className="desc">
                                <p>{p_body}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
           
        )
    }
}
