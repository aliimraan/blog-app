import axios from 'axios'
import React, { Component } from 'react'
import '../css/editPersonalPost.css'
import MainNav from './MainNav'

export default class EditPersonalPost extends Component {
    constructor(){
        super()
        this.state={
            thisPost:[],
            category:[],
            p_title:'',
            p_body:'',
            p_coverImage:'',
            c_name:'',
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id;
        const Token=localStorage.getItem('token')
        const config = {     
            headers: {'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/posts/singlepost/'+id,config)
        .then(res=>{
            const myPost=res.data.data[0]
            console.log(myPost)
            this.setState({
                thisPost:myPost,
                p_title:myPost.p_title,
                p_body:myPost.p_body,
                p_coverImage:myPost.p_coverImage,
                c_name:myPost.c_name._id
            })
        
        }).catch(err=>{
            console.log(err)
        })

        axios.get('http://localhost:5000/category')
        .then(res=>{
            const cat=res.data.data
            console.log(cat)
            this.setState({
                category:cat
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    showCategory=(item)=>{
        return item.map((el,index)=>{
            return(
               <option value={el._id} key={index} selected={this.state.c_name==el._id?true:false}>{el.c_name}</option>
            )
        })
      
    }
    editHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    editFileHandler=(e)=>{
        this.setState({
            p_coverImage:e.target.files[0]
        })
    }
    submitEditPost=(e)=>{
    e.preventDefault();
    const id=this.props.match.params.id
    console.log(this.state)

    const data = new FormData();
    data.append('p_title',this.state.p_title)
    data.append('p_body',this.state.p_body)
    data.append('c_name',this.state.c_name)
    data.append('p_coverImage',this.state.p_coverImage)
    const config={
        headers:{
            'content-type': 'multipart/form-data'
        }
    }
    axios.put('http://localhost:5000/posts/updateSinglePost/'+id,data,config)
    .then(res=>{
        console.log(res)
        window.open('/myaccount','_self')
    }).catch(err=>{
        console.log(err)
    })
    }

    render() {
        // const {p_title,p_body,p_coverImage,c_name}=this.state
       
        return (
            <div>
            <MainNav/>
                <div className="background">
                    <img src="/images/pic11.jpg"/>
                </div>
            <div className="editModel">
                <div className="editArea">
                <div className="heading">
                    edit article
                 </div>
                <form onSubmit={this.submitEditPost}>
                    <div className="first">
                        <div className="image"><img src={'http://localhost:5000/public/images/'+this.state.p_coverImage}/></div>
                        <input type="file" name="p_coverImage" onChange={this.editFileHandler}/>
                    </div>
                    <div className="fields">
                        <div className="row1">
                            <div className="labels">
                                <div className="label1">title</div>
                                <div className="label2">this is the heading</div>
                            </div>
                        <input type="text" name="p_title" value={this.state.p_title} onChange={this.editHandler}/>
                        </div>
                        <div className="row2">
                            <div className="labels">
                                <div className="label1">subject</div>
                                <div className="label2">topic you wants to write on</div>
                            </div>
                            <select name="c_name" onChange={this.editHandler}>
                                {this.showCategory(this.state.category)}
                            </select>
                        </div>
                       
                    </div>

                    <div className="fields">
                        <div className="row1">
                            <div className="labels">
                                <div className="label1">message</div>
                                <div className="label2">body of your post</div>
                            </div>
                            <textarea type="text" name="p_body" value={this.state.p_body} onChange={this.editHandler}/>
                        </div>
                    </div>

                    <div className="btnz">
                       <button type="submit" className="save">update</button>
                       <button className="close" >cancel</button>
                    </div>
                    
                
                   
                </form>
           </div>
            </div>
            </div>
        )
    }
}
