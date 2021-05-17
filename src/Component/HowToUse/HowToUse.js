import React,{Component} from 'react';

import styles from './HowtoUse.module.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import Container from 'react-bootstrap/Container'; 
import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row'; 
// import Col from 'react-bootstrap/Col'; 
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form'

class HowToUse extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="my-5 pb-5">
                <Container fluid className={styles.main1Wrapper}>
                    <ListGroup className="text-centre text-dark">
                        <ListGroup.Item style={{"background":"#5C616D"}}><h4 className="text-white font-weight-bold">HOW TO USE</h4></ListGroup.Item>
                        <div className="text-left">
                            <ListGroup.Item action>Type Your Last Semester CPI and the total credits till last semester.</ListGroup.Item>
                            <ListGroup.Item action>If you don't know your credits total, <span className="badge badge-primary">Use Pingala</span> or <span className="badge badge-primary">Calculate</span> the total by typing each Semester credits.</ListGroup.Item>
                            <ListGroup.Item action>Add current semester <span className="badge badge-primary">courses</span> and their <span className="badge badge-primary">credits</span> will be auto selected and still if you want, you can change the credits. Then select <span className="badge badge-primary">Grades</span> you got.</ListGroup.Item>
                            <ListGroup.Item action>When added all courses, Click <span className="badge badge-danger">Estimate CPI/SPI.</span></ListGroup.Item>
                            <ListGroup.Item action><span className="badge badge-warning p-1">AND THAT'S IT.</span></ListGroup.Item>
                        </div>
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

export default HowToUse;