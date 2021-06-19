import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/buttons.css'

export default class Buttons extends Component {
    constructor(props){
        super(props)
        this.state={
            buttons:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/category').then(res=>{
            const buttonData=res.data.data
            this.setState({
                buttons:buttonData
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    showButtons=(item)=>{
        return item.map((el,index)=>{
            return(
               <button value={el.c_name} key={index} onClick={this.props.clickHandler}>{el.c_name}</button>
            )
        })
    }
    render() {
        return (
            <div>
                <div className="buttons">
                    <button value='all' onClick={this.props.clickHandler}>all</button>
                    {this.showButtons(this.state.buttons)}
                
                </div>
            </div>
        )
    }
}
