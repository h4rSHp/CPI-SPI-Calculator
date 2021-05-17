import React,{Component} from 'react';
// import ReactDOM from 'react-dom';

import styles from './NavBar.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
// import { faEnvelope } from "@fortawesome/free-brands-svg-icons"

import 'bootstrap/dist/css/bootstrap.min.css'; 
// import Container from 'react-bootstrap/Container'; 
// import Row from 'react-bootstrap/Row'; 
// import Col from 'react-bootstrap/Col'; 
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal'
// import FormControl from 'react-bootstrap/FormControl'; 

import '../Inputrow/courseData.json';

class NavBar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={styles.main1Wrapper}>
                <h4 className="font-weight-bold">Thank You for Visiting</h4>
                <div className="d-flex" className={styles.contactBar}>
                    <a href="https://www.facebook.com/h4r5hp/"><FontAwesomeIcon size='2x' className="mx-2" icon={faFacebook}/></a>
                    <a href="https://www.instagram.com/h4r5h.p/"><FontAwesomeIcon size='2x' className="mx-2" icon={faInstagram}/></a>
                    <a href="https://github.com/h4rSHp"><FontAwesomeIcon size='2x' className="mx-2" icon={faGithub}/></a>
                    <a href="#"><FontAwesomeIcon size='2x' className="mx-2" icon={faLinkedin}/></a>
                    {/* <a href="#"><FontAwesomeIcon size='2x' className="mx-2" icon={faEnv}/></a> */}
                </div>
                <p>Copyright &#169; Harsh Patel 2021</p>
            </div>
        );
    }
}

export default NavBar;