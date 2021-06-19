import React, { Component, Fragment } from 'react'

class Services extends Component{
    constructor(){
        super()
    }
    render(){
    
        return(
            <Fragment >
                <div className="box">
                    <div className="container">
                        <div className="heading">
                            <h1>For people , by people</h1> 
                            <p><span>the reader</span> is open platform for anyone who likes reading and writing.we help you to find the stories that you like to read.share your experience so that it will be helpfull for others</p>
                        </div>
                        <div className="row">
                           <div className="col-md-4 testimonial">
                                <div className="icon">
                                    <img src="images/undraw_pic3.svg" style={{width:"200px",height:"200px"}} />
                                </div>
                                <div className="text">
                                    <h2>share your experience</h2>
                                </div>
                                <button onClick={()=>window.open('/write','_self')}>share now</button>
                           </div> 

                           <div className="col-md-4 testimonial">
                                <div className="icon">
                                    <img src="images/undraw_pic2.svg" style={{width:"200px",height:"200px"}} />
                                </div>
                                <div className="text">
                                    <h2>learn from experienced</h2>
                                </div>
                                <button onClick={()=>window.open('/readposts','_self')}>read now</button>
                           </div> 

                           <div className="col-md-4 testimonial">
                                <div className="icon">
                                    <img src="images/undraw_pic1.svg" style={{width:"200px",height:"200px"}} />
                                </div>
                                <div className="text">
                                    <h2>anytime anywhere</h2>
                                </div>
                                <button onClick={()=>window.open('/register','_self')}>join now</button>
                           </div> 
                        </div>
                    </div>
               </div>
            </Fragment>

        )
    }
}
export default Services