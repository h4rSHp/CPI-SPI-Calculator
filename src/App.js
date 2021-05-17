import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import InputRow from './Component/Inputrow/Inputrow'
import HowToUse from './Component/HowToUse/HowToUse'
import styles from './App.module.css';
import NavBar from './Component/NavBar/NavBar';
import TotalCredit from './Component/TotalCredit/TotalCredit';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal'
// import FormControl from 'react-bootstrap/FormControl'; 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lSemCpi: 0,
            lSemCredit: 0,
            numrow: 4,
            creditTotal: 0,
            finalCPI: 0,
            finalSPI: 0,
            isTotCreditDisplay: false,
            creditSumImport: 0,
            isModalDisplay: false,
            coursCredGrade: [],
            isCloseDisplay: true,
            isLoadingDisplay: true,
        }

        this.handleAddSecondComponent = this.handleAddSecondComponent.bind(this)
        this.handleTcpiChange = this.handleTcpiChange.bind(this);
        this.handleTcreditChange = this.handleTcreditChange.bind(this);
        this.handleCpiValue = this.handleCpiValue.bind(this);
        // this.handleNoOfCourses = this.handleNoOfCourses.bind(this);
        this.handleTotCreditDisplay = this.handleTotCreditDisplay.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleLastInput = this.handleLastInput.bind(this);
        this.handleCloseDisplay = this.handleCloseDisplay.bind(this);
    };

    handleCloseDisplay(choice) {
        this.setState({
            isCloseDisplay: choice,
        });
    }

    handleLastInput() {
        console.log(this.state.numrow);
        if (this.state.numrow == 1)
            this.handleCloseDisplay(false);
        var arr = this.state.coursCredGrade;
        arr[this.state.numrow - 1] = {};
        this.setState({
            coursCredGrade: arr,
            numrow: this.state.numrow - 1,
        });
        this.handleCpiValue();
    }

    handleModal(choice) {
        this.setState({
            isModalDisplay: choice
        });
    }

    handleCallbackCreditTotal = (displayData) => {
        // var p=displayData[1];
        // p=parseInt(p,10);
        this.setState({
            isTotCreditDisplay: displayData[0],
            creditSumImport: displayData[2]
            // semesterNoData: p
        });
    }

    handleCallback = (childData) => {
        var credit = childData[0];
        var grade = childData[1];
        if (typeof (credit) == "string") {
            credit = parseInt(credit, 10);
        }
        if (typeof (grade) == "string")
            grade = parseInt(grade, 10);
        // 
        // To give all values in an array
        var obj = { "credit": credit, "grade": grade };
        var arr = this.state.coursCredGrade;
        arr[childData[2]] = obj;
        this.setState({
            coursCredGrade: arr,
        })
        this.handleCpiValue();
    }

    handleCpiValue() {
        var len = this.state.coursCredGrade.length;
        var arr = this.state.coursCredGrade;
        var gradexcredit = 0, creditTotal = 0;
        for (var i = 0; i < len; i++) {
            var creditElement = arr[i].credit;
            var gradeElement = arr[i].grade;
            if (creditElement > -2 && gradeElement >= 0) {
                gradexcredit = gradexcredit + (creditElement * gradeElement);
                creditTotal = creditTotal + creditElement;
            }
        }
        var finalSpi = gradexcredit / creditTotal;
        var finalCpi = (gradexcredit + this.state.lSemCpi * this.state.lSemCredit) / (this.state.lSemCredit + creditTotal);
        var str1 = (finalSpi.toString().substr(0, 5));
        var str2 = (finalCpi.toString().substr(0, 5));
        finalSpi = parseFloat(str1, 10)
        finalCpi = parseFloat(str2, 10)
        this.setState({
            finalCPI: finalCpi,
            finalSPI: finalSpi,
        });
    }

    handleAddSecondComponent() {
        var cp = this.state.lSemCpi
        var cr = this.state.lSemCredit
        this.setState({
            numrow: this.state.numrow + 1,
            lSemCpi: cp,
            lSemCredit: cr
        });
    }

    handleTcpiChange(e) {
        var cp = e.target.value
        cp = parseFloat(cp, 10);
        this.setState({
            lSemCpi: cp,
        });
        // this.handleCpiValue();
    }

    handleTcreditChange(e) {
        var cr = e.target.value
        cr = parseInt(cr, 10);
        this.setState({
            lSemCredit: cr
        });
        // this.handleCpiValue();
    }

    // handleNoOfCourses(e){
    //     var x = e.target.value;
    //     this.setState({
    //         numrow:this.state.numrow + x
    //     });
    // }


    handleTotCreditDisplay() {
        this.setState({
            isTotCreditDisplay: true
        })
    }

    render() {
        // if(this.state.isLoadingDisplay == true){
        //     setTimeout(function(){
        //         this.setState({
        //             isLoadingDisplay:false,
        //         });
        //     },2000);
        // }
        var creditTotalImport;
        if (this.state.creditSumImport > 0) {
            creditTotalImport = this.state.creditSumImport;
            this.setState({
                creditSumImport: ""
            });
        }
        const children = [];
        for (var i = 0; i < this.state.numrow; i++)
            children.push(<InputRow key={i} number={i} parentCallback={this.handleCallback} />);
        return (
            <div>
                <div className="text-white text-center main1-wrapper" style={{ background: "#1F2437" }}>
                    <h3 className={styles.mainHeading}>CPI/SPI CALCULATOR</h3>
                    <Container className="text-center">
                        <HowToUse />
                        <div id="container">
                            <Form.Group>
                                <Row className={styles.inputcpicredit}>
                                    <Col sm={12}>
                                        <Form.Label><h5>ENTER LAST SEMESTER CPI</h5></Form.Label>
                                        <Form.Control type="text" placeholder="Enter CPI.." onChange={this.handleTcpiChange} />
                                    </Col>
                                    <Col sm={12}>
                                        <Form.Label><h5>ENTER TOTAL CREDITS</h5></Form.Label>
                                        <Form.Control value={creditTotalImport} type="text" placeholder="Enter Credits.." onChange={this.handleTcreditChange} />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <div>
                                <div className={styles.creditTotFind}>
                                    If you don't know your Total Credits, calculate it by clicking here
                                </div>
                                <div className="mb-5">
                                    <Button size="sm" className="m-2 border-0" style={{ background: "#4d49f6" }} onClick={() => this.handleModal(true)}>Use Pingala</Button>
                                    OR
                                    <Button size="sm" className="m-2 border-0" style={{ background: "#4d49f6" }} onClick={this.handleTotCreditDisplay}>Calculate</Button>
                                </div>
                                {
                                    (this.state.isModalDisplay)
                                        ?
                                        <div className={styles.creditTotalPingala}>
                                            <div>
                                                <div>Go to</div>
                                                <div className="m-1 p-3">
                                                    Pingala &#8594; Academic Management &#8594; Pre-Registration &#8594; Pre-Reg Application &#8594; Show Progress &#8594; Current Course Credits
                                                </div>
                                                <div className="m-1 p-3">
                                                    Credit Total = Current Course Credits - S/X Courses Credit (PE101-3, PE102-3, COM200-5,......)
                                                </div>
                                                <Button className="close" className="bg-danger m-2 border-0" onClick={() => this.handleModal(false)} aria-label="Close"><span aria-hidden="true">&times;</span></Button>
                                            </div>
                                        </div>
                                        :
                                        <div></div>
                                }
                                {
                                    this.state.isTotCreditDisplay
                                        ?
                                        <div className={styles.creditTotalCalc}>
                                            <TotalCredit parentCallbackCreditTotal={this.handleCallbackCreditTotal} />
                                        </div>
                                        :
                                        <div></div>
                                }
                            </div>
                            <div style={{ "height": "1.5px", "background": "red" }}></div>
                            <div>
                                <Row className="text-white p-3" noGutters="true">
                                    <Col xs={5}>
                                        <h6 className="font-weight-bold">COURSES</h6>
                                    </Col>
                                    <Col>
                                        <h6 className="font-weight-bold">CREDITS</h6>
                                    </Col>
                                    <Col>
                                        <h6 className="font-weight-bold">GRADES</h6>
                                    </Col>
                                </Row>
                                <div style={{ "height": "1px", "background": "white" }}></div>
                                {children}
                                {
                                    (this.state.isCloseDisplay)
                                        ?
                                        <Button variant="danger" className="mx-2 my-3" onClick={() => this.handleLastInput()}>Remove</Button>
                                        :
                                        <div></div>
                                }
                                <Button variant="outline-success" className="mx-2 my-2" onClick={() => this.handleAddSecondComponent()}>Add Course</Button>
                                <br />
                                <Button variant="outline-danger" className="my-2 mx-2" onClick={() => this.handleCpiValue()}>Estimate CPI/SPI</Button>
                                <br />
                                <div className="badge p-4 my-4" style={{ "box-shadow": "1px 1px 10px rgba(0, 0, 0, 0.4)", "background": "#1f2437" }}>
                                    <div className={styles.cpivalue}><span className="font-weight-bold">CPI-</span><span className="badge badge-warning py-2 px-3 m-1">{this.state.finalCPI}</span></div>
                                    <div className={styles.spivalue}><span className="font-weight-bold">SPI-</span><span className="badge badge-warning py-2 px-3 m-1">{this.state.finalSPI * 100000 / 100000}</span></div>
                                </div>
                            </div>
                        </div>
                    </Container>
                    <NavBar />
                </div>
            </div>
        );
    }
}

export default App;