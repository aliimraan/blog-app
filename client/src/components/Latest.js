import axios from 'axios'
import React, { Component, Fragment } from 'react'

class Latest extends Component{
    constructor(){
        super()
        this.state={
            latest:[]
        }
    }
    componentDidMount(){
        this.getLatestPosts()
    }
    getLatestPosts=()=>{
        const Token=localStorage.getItem('token')
        const config={
            headers:{'x-auth-token': Token}
        }
        axios.get('http://localhost:5000/posts/recentPosts',config)
        .then(res=>{
            const mydata=res.data.data
            this.setState({
                latest:mydata
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    showLatest=(item)=>{
        return item.map((el,index)=>{
            console.log(el)
            return(
                <div className="posts" key={index}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="photo">
                            <img src={"http://localhost:5000/public/images/"+el.p_coverImage} />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="details">
                            <div className="category_name">
                                {el.c_name.c_name}
                            </div>
                            <div className="topic">
                               {el.p_title}
                            </div>
                            <div className="author">
                            <span>by </span> {el.author_id.name}
                            </div>
                            <div className="created_at">
                                {el.p_created_at.substr(0,10)}
                            </div>
                            <div className="desc">
                            {el.p_body.substr(0,300)}
                            </div>
                            <button onClick={()=>window.open('/singlepost/'+el._id,'_self')}>read more</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    }
    render(){
        return(
            <Fragment>
                <div className="latest">
                    <div className="container">
                        <div className="heading">
                            <h3>recent posts</h3>
                        </div>
                    {this.showLatest(this.state.latest)}
                    </div>
                </div>

                
            </Fragment>
        )
    }
}
export default Latest