import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import '../css/footer.css';

class Footer extends Component{
    constructor(){
        super()
        this.state={
            isLoggedIn:false
        }
    }
    componentDidMount(){
        const Token=localStorage.getItem('token')
        Token==null?this.setState({isLoggedIn:false}):this.setState({isLoggedIn:true})
    }
    render(){
        return(
            <Fragment>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="myProfile">
                                    the reader
                                  
                                </div>
                            </div>
                            <div className="col-md-3 footer_text">
                            {this.state.isLoggedIn===false?<ul> <li><Link className="fooLinks" to="/login">login to enjoy benifits</Link></li></ul>
                               :<ul>
                                    <li><Link className="fooLinks" to="#">featured posts</Link></li>
                                    <li><Link className="fooLinks" to="#">programming posts</Link></li>
                                    <li><Link className="fooLinks" to="#">cooking posts</Link></li>
                                    <li><Link className="fooLinks" to="#">gaming posts</Link></li>
                                    <li><Link className="fooLinks" to="#">sports posts</Link></li>
                               </ul>
                            }
                            </div>
                            <div className="col-md-3 footer_text">
                            <ul>
                                    <li><Link className="fooLinks" to="/">home</Link></li>
                                    <li><Link className="fooLinks" to="/readposts">read post</Link></li>
                                    <li><Link className="fooLinks" to="/write">write post</Link></li>
                                    <li><Link className="fooLinks" to="/contactus">contact us</Link></li>
                                    <li><Link className="fooLinks" to="/login">login</Link></li>
                                    <li><Link className="fooLinks" to="/register">signin</Link></li>
                               </ul>
                        
                            </div>
                            <div className="col-md-3 formArea">
                            <h4>your feedback is valuable </h4>
                                <form>
                                    {this.state.isLoggedIn==false?
                                    <div className="form form-group">
                                        <label>login first</label>
                                        <button onClick={()=>window.open('/login','_self')} className="btn form-control">login</button>
                                    </div>:
                                    <div className="form form-group">
                                        <label>emil</label>
                                        <input type="email" placeholder="enter email" className="form-control"/>
                                        <br/><label>message</label>
                                        <textarea row="20" col="20" className="form-control" style={{resize:"none"}} placeholder="your message"/><br/>
                                        <button className="btn form-control">send</button>
                                    </div>
                                    }
                                </form>
                            
                            </div>
                        </div>
                    </div>
                    <div className="social">
                        <ul>
                            <li><Link className="social_anchor"><i className="fa fa-facebook fa-1x"></i></Link></li>
                            <li><Link className="social_anchor"><i className="fa fa-whatsapp fa-1x"></i></Link></li>
                            <li><Link className="social_anchor"><i className="fa fa-instagram fa-1x"></i></Link></li>
                            <li><Link className="social_anchor"><i className="fa fa-github fa-1x"></i></Link></li>
                            <li><Link className="social_anchor"><i className="fa fa-twitter fa-1x"></i></Link></li>
                            <li><Link className="social_anchor"><i className="fa fa-google fa-1x"></i></Link></li>
                        </ul>
                        <div className="copyright">
                        &#169;copyright. All Rights are Reserved
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Footer