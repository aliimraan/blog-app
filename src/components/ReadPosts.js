import axios from 'axios'
import React, { Component } from 'react'
import '../css/readposts.css'
import MainNav from './MainNav'
import Footer from './Footer'
import Buttons from './Buttons'
import WritePost from './WritePost'
import {Link, Redirect } from 'react-router-dom'

export default class ReadPosts extends Component {
    constructor(){
        super()
        this.state={
            posts:[],
            cat_posts:[],
            isClicked:false
        }
    }
    componentDidMount(){
        
        this.getAllPosts()
    }
    getAllPosts=()=>{
        const Token=localStorage.getItem('token')
        const config = {     
            headers: {'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/posts/allPosts',config)
        .then(res=>{
            console.log(res)
            const allData=res.data.data
            this.setState({
                posts:allData
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    limitedBody=(para)=>{
        if(para.length>100){ return para.substr(0,100)+"..."}return para
     }
    limitedTitle=(title)=>{
        if(title.length>40){ return title.substr(0,40)+"..."}return title
     }
     

    showAllPosts=(item)=>{
         return item.map((el,index)=>{
            
                 {
                     const {p_title,p_body,author_id,c_name}=el
        
                     const indexex=index+1;
                     if(indexex%2!=0){
                    return(
                        <div key={indexex}>
                        <div className="d1">
                        <Link to={"/singlepost/"+el._id}>
                        <div className="content_img">
                            <img src={'http://localhost:5000/public/images/'+el.p_coverImage}/>
                        </div>
                        </Link>
                        <div className="body_area">
                            <div className="body_heading">
                               {this.limitedTitle(p_title)}
                            </div>
                            <div className="body_desc">
                           {this.limitedBody(p_body)}
                    
                            </div>
                            <div className="body_footer">
                              <h1>{c_name.c_name}</h1>
                                <h1>{author_id.name}</h1>
                            </div>
                        </div>
                    </div>
                        </div>
                    )}else{
                        return(
                            <div key={indexex}>
                                                <div className="d2">
                                                <Link to={"/singlepost/"+el._id}>
                                                <div className="content_img">
                                                    <img src={'http://localhost:5000/public/images/'+el.p_coverImage}/>
                                                 </div>
                                                 </Link>
                                                <div className="body_area">
                                                    <div className="body_heading">
                                                        {this.limitedTitle(p_title)}
                                                    </div>
                                                    <div className="body_desc">
                                                        {this.limitedBody(p_body)}
                                                    </div>
                                                    <div className="body_footer">
                                                        <h1>{c_name.c_name}</h1>
                                                        <h1>{author_id.name}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                                </div>
                        )
                    }
                }
        })
    }

    clickHandler=(e)=>{

        this.setState({
            isClicked:true
        })
       
        if(e.target.value=="all"){
            this.setState({
                cat_posts:this.state.posts
            })
           return this.showAllPosts(this.state.cat_posts)
        }else{
            let proCat=this.state.posts.filter(el=>{
                return el.c_name.c_name===e.target.value
            })
           
           this.setState({
               cat_posts:proCat
           })
           return this.showAllPosts(this.state.cat_posts)

        }
    }

    render() {
        const Token=localStorage.getItem('token')
        return (
            Token==null?<Redirect to="/login"/>:<div className="main">
             <MainNav/>
                <div className="container">
                    <Buttons  clickHandler={this.clickHandler}/>
                    <div className="read_section">
                      {this.state.isClicked===false?this.showAllPosts(this.state.posts):this.showAllPosts(this.state.cat_posts)}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
