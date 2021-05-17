import React,{Component} from 'react';
// import ReactDOM from 'react-dom'

import styles from './Inputrow.module.css'
import './courseData.json';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
// import Button from 'react-bootstrap/Button'; 
// import InputGroup from 'react-bootstrap/InputGroup'; 
import Form from 'react-bootstrap/Form'; 
// import ListGroup from 'react-bootstrap/ListGroup';


class InputRow extends Component{
    constructor(props){
    super(props);
    this.state = {gradeInput:-2, creditInput:0, creditAuto: -1};
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleCourseCode = this.handleCourseCode.bind(this);
    }

    handleCourseCode(e){
        console.log(e.target.value);
        if(e.target.value.length > 5){
            e.target.value = e.target.value.toUpperCase();
            const Text = document.querySelector('option[value="' + e.target.value + '"]');
            console.log(Text);
            var credit = Text.getAttribute("credit");
            credit = parseInt(credit, 10);
            if(credit > 0){
                this.setState({
                    creditAuto: credit,
                    creditInput: credit,
                });
            }
            // console.log(credit);
            this.props.parentCallback([credit, -2, this.props.number]);
        }
    }
    handleCreditChange(e){
            var cr = e.target.value;
            cr = parseInt(cr,10);
            this.setState({
                creditAuto: cr,
                creditInput: cr
            });
            var inputValue = [e.target.value,this.state.gradeInput,this.props.number];
            this.props.parentCallback(inputValue);
    }

    handleGradeChange(e){
        var gr = e.target.value;
        gr = parseInt(gr,10);
        this.setState({
            gradeInput:gr,
        });
        var inputValue = [this.state.creditInput, e.target.value,this.props.number];
        this.props.parentCallback(inputValue);
    }

    render(){
        // console.log(this.state.creditAuto);
        let courseData = require('./courseDataWcreditv2.json');
        const courseList = courseData.map((x) =>  <option dataId={x.dataId} credit={x.Credits} value={x.courseCode}>{x.courseCode} - {x.courseName}</option>);
        let creditList;
        let creditListoption;
        creditList = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        creditListoption = creditList.map((x)=> <option>{x}</option>);

        return(
            <div className={styles.main1Wrapper}>
                <Container fluid>
                    <Row  noGutters="true">
                        <Col xs={5} className="mx-1">
                            <Form.Group>
                                <Form.Control list="courseList" size="md" type="text" placeholder="Course.." onChange={this.handleCourseCode}/>
                                <datalist id="courseList">
                                    {courseList};
                                </datalist>
                            </Form.Group>
                        </Col>
                        <Col className="mx-1">
                            <Form.Group>
                                <Form.Control id="credits" size="md" value={this.state.creditAuto} as="select" onChange={this.handleCreditChange}>
                                    <option>Select Credits</option>
                                    {creditListoption}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="mx-1">
                            <Form.Group>
                                <Form.Control id="grades" size="md" as="select" onChange={this.handleGradeChange}>
                                    <option value="-2">Select Grade</option>
                                    <option value="10">A</option>
                                    <option value="8">B</option>
                                    <option value="6">C</option>
                                    <option value="4">D</option>
                                    <option value="2">E</option>
                                    <option value="0">F</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <div style={{"height":"1px","background":"#ccc"}}></div>
            </div>
        );
    }
}


export default InputRow;