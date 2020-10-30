import axios from 'axios'
import React, { Component } from 'react'

export default class DeletePost extends Component {
    constructor(){
        super()
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.delete('http://localhost:5000/posts/deletePersonalPost/'+id)
        .then(data=>{
            window.open('/myaccount','_self')
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
          <div></div>
        )
    }
}
