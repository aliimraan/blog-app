import React from 'react';
import './index.css';
import Home from './components/Home';
import {Route,Switch} from 'react-router-dom'
import SinglePost from './components/SinglePost';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';
import WritePost from './components/WritePost';
import MyAccount from './components/MyAccount';
import ReadPosts from './components/ReadPosts';
import EditPersonalPost from './components/EditPersonalPost';
import DeletePost from './components/DeletePost';
import { Component } from 'react';


class App extends Component {
  constructor(){
    super()
    this.state={
      isLoggedIn:false
    }
  }
  componentDidMount(){
    const Token =localStorage.getItem('token')
    Token==null?this.setState({
      isLoggedIn:false
    }):this.setState({
      isLoggedIn:true
    })
  }
  render(){
    return (
      <div>
       <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/singlepost/:id" component={this.state.isLoggedIn===true?SinglePost:Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/write" component={this.state.isLoggedIn===true?WritePost:Login}></Route>
        <Route path="/myaccount" component={this.state.isLoggedIn===true?MyAccount:Login}></Route>
        <Route path="/readposts" component={this.state.isLoggedIn===true?ReadPosts:Login}></Route>
        <Route path="/editPersonalPost/:id" component={this.state.isLoggedIn===true?EditPersonalPost:Login}></Route>
        <Route path="/deletePersonalPost/:id" component={this.state.isLoggedIn===true?DeletePost:Login}></Route>
       </Switch>
  
      </div>
    )
  }
}

export default App;
