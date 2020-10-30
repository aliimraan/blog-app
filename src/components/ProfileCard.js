import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../css/profileCard.css';
import Footer from './Footer';

export default class ProfileCard extends Component {
    constructor(){
        super()
        this.state={
            user:[],
            myPosts:[],
            isNotActive:true,
            counter:'',
            isEditActive:false,
            name:'',
            email:'',
            phno:'',
            intro:'',
            pp:''
        }
    }
    componentDidMount(){
        this.getUser()
        this.getPerPosts()
    }

    editFormHandler=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
      console.log(this.state)
    }

    editFormFile=(e)=>{
        this.setState({
            [e.target.name]:e.target.files[0]
        })
    }
    articleHandler=()=>{
        if(this.state.isNotActive==true){
            this.setState({
                isNotActive:false
            })
        }else{
            this.setState({
                isNotActive:true
            })
        }
    }

    submitEditForm=(e)=>{
        e.preventDefault()
       const data=new FormData();
       data.append('name',this.state.name)
       data.append('email',this.state.email)
       data.append('phno',this.state.phno)
       data.append('intro',this.state.intro)
       data.append('pp',this.state.pp)
       console.log(data)

       const config = {headers: { 'content-type': 'multipart/form-data' }}
       const id=localStorage.getItem('user_id')

       axios.put('http://localhost:5000/users/updateUser/'+id,data,config)
       .then(res=>{
           console.log(res)
       }).catch(err=>{
           console.log(err)
       })
       this.setState({
        isEditActive:false
    })
    // window.location.reload()

    }

    getUser(){
        const id=localStorage.getItem('user_id')
        const Token=localStorage.getItem('token')
        const config={
            headers:{'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/users/'+id,config)
        .then(response=>{
            const user_data=response.data.data
            this.setState({
                user:user_data,
                name:user_data.name,
                email:user_data.email,
                phno:user_data.phno,
                intro:user_data.intro,
                pp:user_data.pp,
              
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getPerPosts=()=>{
        const id=localStorage.getItem('user_id')
        const Token=localStorage.getItem('token')
        const config={
            headers:{'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/posts/personalPosts/'+id,config)
        .then(res=>{
            const perPosts=res.data.data
            this.setState({
                myPosts:perPosts,
                counter:perPosts.length
            })
           
        }).catch(err=>{
            console.log(err)
        })
    }
    
    showPerPosts=(item)=>{
        
        return item.map((el,index)=>{
           
            return (
                <div className="post_area" key={index}>
                <Link to={"/singlepost/"+el._id} className="anchor">
                    <div className="image">
                        <img src={"http://localhost:5000/public/images/"+el.p_coverImage}/>
                    </div>
                    <div className="title">
                        {el.p_title}
                    </div>
                </Link>
                    <div className="btns">
                        <Link to={"/editPersonalPost/"+el._id} className="anchor"><i className="fa fa-pencil"></i></Link>
                        <Link to={"/deletePersonalPost/"+el._id} className="anchor"><i className="fa fa-trash"></i></Link>
                    </div>
                </div>
            )
        })
    }
    editUser=()=>{
        this.setState({
            isEditActive:true
        })
    }
    closeEdit=()=>{
        this.setState({
            isEditActive:false
        })
    }
    logout=(e)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('name')
        window.open('/','_self')
    }
    deleteAccount=()=>{
        const id=localStorage.getItem('user_id')
        
        axios.delete('http://localhost:5000/users/deleteUser/'+id)
        .then(res=>{
            console.log(res);
            localStorage.removeItem('user_id')
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            window.open('/','_self')

        }).catch(err=>{
            console.log(err)
        })
    }
    
    render() {
        
        const {email,intro,name,phno,pp,registered_at}=this.state.user

        return (
            <Fragment>
        <div className={this.state.isEditActive==false?"fullcard":"fullcard active"}>
            <div className="container">
                <div className="three_flex">
                    <div className="profile">
                        <div className="image">
                            <img src={'http://localhost:5000/public/images/'+pp}/>
                        </div>
                        <div className="name">
                            {name}
                        </div>
                        <div className="about">
                           {intro}
                        </div>
                        <div className="member">
                          {registered_at}
                        </div>
                    </div>
                    <div className="accDetails">
                        <div className="heading">
                            <h3>account details</h3>
                        </div>
                        <div className="details">
                            <div className="names">
                                <div className="firstname">
                                    first name<br/>
                                    <span>{name}</span>
                                </div>
                                <div className="lastname">
                                    last name <br/>
                                    <span>{name}</span>
                                </div>
                            </div>
                            <div className="other">
                                <div className="email">
                                    email<br/>
                                    <span>{email}</span>
                                </div>
                                <div className="phone">
                                    phone <br/>
                                    <span>{phno}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="links">
                            <div className="attach">  
                                <i className="fa fa-pencil fa-1x" onClick={this.editUser}></i>edit account
                            </div>
                            <div className="attach">  
                             <i className="fa fa-sign-out fa-1x" onClick={this.logout}></i>logout
                            </div>
                            <div className="attach">  
                                <i className="fa fa-trash fa-1x" onClick={this.deleteAccount}></i>delete account
                            </div>
                        </div>
                    </div>
                    <div className="newRow">
                    <div className="btns">
                        <div className="posts">
                            <div className="heading">I Posted</div>
                            <div className="articles">{this.state.counter} articles</div> 
                        </div>
                        <div className="addposts"><Link className="anchor" to="/write">add post now</Link></div>
                    </div>
                </div>
                <div className="myPosts">
                    <div className="main_area">
                        <div className="heading">my articles</div>
                        <i className="fa fa-arrow-circle-down fa-2x" onClick={this.articleHandler}></i>
                    </div>
                    <div className={this.state.isNotActive==true?"allposts noactive":"allposts"}>
                        {this.showPerPosts(this.state.myPosts)}
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className={this.state.isEditActive==false?"editModel noactive":"editModel"}>
           <div className="editArea">
                <div className="heading">
                    edit account
                 </div>
                <form onSubmit={this.submitEditForm}>
                    <div className="first">
                        <div className="image"><img src={'http://localhost:5000/public/images/'+pp}/></div>
                        <input type="file" name="pp" onChange={this.editFormFile}/>
                    </div>
                    <div className="fields">
                        <div className="row1">
                            <div className="labels">
                                <div className="label1">full name</div>
                                <div className="label2">visible to other members</div>
                            </div>
                        <input type="text" name="name" value={this.state.name} onChange={this.editFormHandler}/>
                        </div>
                        <div className="row2">
                            <div className="labels">
                                <div className="label1">email name</div>
                                <div className="label2">for logging in</div>
                            </div>
                            <input type="text" name="email" value={this.state.email} onChange={this.editFormHandler}/>
                        </div>
                       
                    </div>

                    <div className="fields">
                        <div className="row1">
                            <div className="labels">
                                <div className="label1">phone number </div>
                                <div className="label2">for recieving notification</div>
                            </div>
                            <input type="text" name="phno" value={this.state.phno} onChange={this.editFormHandler}/>
                        </div>
                        <div className="row2">
                            <div className="labels">
                                <div className="label1">intro</div>
                                <div className="label2">visible to other members</div>
                            </div>
                            <input type="text" name="intro" value={this.state.intro} onChange={this.editFormHandler}/>
                        </div>
                    </div>

                    <div className="btnz">
                       <button type="submit" className="save">save</button>
                       <button className="close" onClick={this.closeEdit}>close</button>
                    </div>
                    
                
                   
                </form>
           </div>
        </div>
        </Fragment>

        )
    }
}
