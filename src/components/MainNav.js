import axios from 'axios';
import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import '../css/mainNav.css';

class MainNav extends Component{
    constructor(){
        super()
        this.state={
            navbar:false,
            isMenuActive:false,
            isNavActive:false,
            isContactActive:false,
            posts:[]
        }
    }
    componentDidMount(){
        this.getUserPic()
    }
    getUserPic=()=>{
        const Id=localStorage.getItem('user_id')
        axios.get('http://localhost:5000/users/'+Id)
        .then(res=>{
            console.log(res.data)
            const u_data=res.data.data
            this.setState({
                posts:u_data
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    chageNavbar=()=>{
        if(window.pageYOffset>=20){
            this.setState({
                navbar:true
            })
        }
        else{
            this.setState({
                navbar:false
            })
        }
    }
    menuHandler=()=>{
       if(this.state.isMenuActive==false){
        this.setState({isMenuActive:true})
        this.setState({isNavActive:true})
        this.setState({isContactActive:true})
       }else{
           this.setState({isMenuActive:false})
           this.setState({isNavActive:false})
           this.setState({isContactActive:false})
       }
    }
    
   
    render(){
    
        window.addEventListener('scroll',this.chageNavbar)

        return(
            <Fragment>
                <div className={this.state.navbar==true ? 'navarea active':'navarea'}>
                    <div className="container-fluid">
                        <div className="container">
                            <div className="nav navbar">
                                <div className="navbar-brand">
                                The Reader
                                </div>
                                <div className={this.state.isNavActive==true?'navigation active':'navigation'}>
                                    <ul>
                                        <li><Link className="anchor" to='/'>home </Link></li>
                                        <li><Link className="anchor" to='/readposts' >read </Link></li>
                                        <li><Link className="anchor" to='/write'>write</Link></li>
                                        <li><Link className="anchor" to='/contact'>contact us</Link></li>
                                        <li><Link className="anchor" to='/about'>about us</Link></li>
                                        <li><Link className="anchor" to='/myaccount'><img src={"http://localhost:5000/public/images/"+this.state.posts.pp}/></Link></li>
                                        
                                      
                                    </ul>
                                </div>
                                

                                <div className={this.state.isMenuActive==true?'menu_bar active':'menu_bar'}  onClick={this.menuHandler}>
                                    <div className="png"></div>
                                </div>
                                
                               
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default MainNav
