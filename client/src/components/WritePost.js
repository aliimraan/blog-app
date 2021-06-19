import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import MainNav from './MainNav'
import '../css/writeposts.css'


export default class WritePost extends Component {
    constructor(){
        super()
       
        this.state={
            p_title:'',
            p_body:'',
            p_coverImage:'',
            c_name:'',
            category:[]
         
        }
    }
    componentDidMount(){
        this.getCategory()
    }
    getCategory=()=>{
        axios.get("http://localhost:5000/category")
        .then(res=>{
            const cat_data=res.data.data
            this.setState({
                category:cat_data
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    showCategory=(item)=>{
       return item.map((el,index)=>{
            return(
               <option value={el._id} key={index}>{el.c_name}</option>
            )
        })
    }
    
    formHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    fileHandler=(e)=>{
        this.setState({
            p_coverImage:e.target.files[0]
        })
    }
    submitHandler=(e)=>{
        e.preventDefault();
        const Token=localStorage.getItem('token')
        const user_id=localStorage.getItem('user_id')
       
        const data=new FormData();
        data.append('p_title',this.state.p_title)
        data.append('p_body',this.state.p_body)
        data.append('p_coverImage',this.state.p_coverImage)
        data.append('author_id',user_id)
        data.append('c_name',this.state.c_name)

        const config = {     
            headers: { 'content-type': 'multipart/form-data',
            'x-auth-token': Token}
        }
        axios.post('http://localhost:5000/posts/add',data,config)
        .then(response=>{
           if(response) this.props.history.push('/myaccount')
        }).catch(err=>{
            console.log(err)
        })
        
    }
    render() {
       const Token=localStorage.getItem('token')
       
    return(
            Token==null?<Redirect to="/login"/>:
                <Fragment>
                <MainNav/>
                    <div className="hero">
        
                        <div className="container">
                            <div className="heading">
                                <h1>happy writing</h1>
                            </div>
                            <form onSubmit={this.submitHandler}>
                                <div className="post_title">
                                    <input type="text" name="p_title" onChange={this.formHandler}/>
                                </div>
                                <div className="text_area">
                                    <textarea name="p_body" rows="5" cols="100" onChange={this.formHandler}/>
                                 </div>
                                <div className="text_area">
                                    <label>cover image</label>
                                    <input type="file" name="p_coverImage" onChange={this.fileHandler}/>
                                </div>
                        
                                <div className="text_area">
                                <select name="c_name" onChange={this.formHandler} >
                                <option>--select subject--</option>
                                     {this.showCategory(this.state.category)}
                                </select>
                                
                                </div>
                                <button className="btn btn-danger">post</button>
                            
                            </form>
                        </div>
                    </div>
                </Fragment>
        )
    }
}
