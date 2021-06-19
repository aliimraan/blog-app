import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import Services from './Services'
import Latest from './Latest'
import '../css/services.css'
import '../css/latest.css'
import '../css/navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer'

class Home extends Component{
    render(){
        return(
            <Fragment>
            <Navbar/>
             <div className="content">
                <div className="heading">
                    more u <span> read. </span><br/>
                    more u <span> learn.. </span>
                </div>
            </div>
            <div className="img_section">
                <img src="images/pic1.jpg" alt="pic1" className="photo" style={{['--i']:"1"}}/>
                <img src="images/pic2.jpg" alt="pic2" className="photo" style={{['--i']:"5"}}/>
                <img src="images/pic3.png" alt="pic3" className="photo" style={{['--i']:"1"}}/>
                <img src="images/pic4.jpg" alt="pic4" className="photo" style={{['--i']:"2"}}/>
                <img src="images/pic5.jpg" alt="pic5" className="photo" style={{['--i']:"6"}}/>
                <img src="images/pic6.png" alt="pic6" className="photo" style={{['--i']:"7"}}/>
                <img src="images/pic7.jpg" alt="pic7" className="photo" style={{['--i']:"1"}}/>
                <img src="images/pic8.jpg"  alt="pic8" className="photo" style={{['--i']:"9"}}/>
                <img src="images/pic9.jpg"  alt="pic9" className="photo" style={{['--i']:"6"}}/>
                <img src="images/pic10.jpg"  alt="pic10" className="photo" style={{['--i']:"3"}}/>
                <img src="images/pic11.jpg"  alt="pic11" className="photo" style={{['--i']:"4"}}/>
                <img src="images/pic12.jpg"  alt="pic12" className="photo" style={{['--i']:"8"}}/>
                <img src="images/pic13.jpg"  alt="pic13" className="photo" style={{['--i']:"2"}}/>
                <img src="images/pic14.jpeg"  alt="pic14" className="photo" style={{['--i']:"5"}}/>
            </div>
            <Services />
            <Latest />
            <Footer/>
        </Fragment>
        )
    }
}
export default Home