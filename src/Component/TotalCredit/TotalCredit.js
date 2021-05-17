import React,{Component} from 'react';

import styles from './TotalCredit.module.css'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class TotalCredit extends Component{
    constructor(props){
        super(props)
        this.state = {
            semesterNo: 1,
            // creditInputArray: "",
            creditSum: 0,
            prevDataId: 0,
            prevInput: "",
            creditInputAll: []
        };
        this.handleClosingCreditContainer = this.handleClosingCreditContainer.bind(this);
        this.handleSemesterNo = this.handleSemesterNo.bind(this);
        this.handleCreditString =  this.handleCreditString.bind(this);
        this.handleCalculation = this.handleCalculation.bind(this);
        this.handleCreditSum = this.handleCreditSum.bind(this);
    };

    handleCreditSum(x){
        // console.log(x);
        x = x.concat("+");
        var len = x.length;
        var sum = 0,prev = 0;
        for(var i=0; i<len; i++){
            var pos = x.indexOf('+', i)
            var substr = x.substring(prev, pos+1);
            var substrInt = parseInt(substr, 10);
            sum = sum + substrInt;
            prev=pos+1;
            i=pos;
        }
        return sum;
    }

    handleCalculation(){
        var inputArray = this.state.creditInputAll;
        inputArray[this.state.prevDataId] = this.state.prevInput;
        this.setState({
            creditInputAll: inputArray
        });
        var sum=0;
        // console.log(this.state.creditInputAll);
        for(var i=0;i<this.state.semesterNo; i++){
            sum = sum + this.handleCreditSum(inputArray[i]);
        }
        var q= [false, this.state.semesterNo, sum];
        this.props.parentCallbackCreditTotal(q);
    }

    handleClosingCreditContainer(){
        var x = [false, this.state.semesterNo, this.state.creditSum];
        this.props.parentCallbackCreditTotal(x);
    }

    handleSemesterNo(e){
        var x = e.target.value;
        var a = [];
        for(var i=0; i<x; i++)
            a.push("");
        this.setState({
            creditInputAll: a,
            semesterNo: x
        });
    }

    handleCreditString(event){
        this.setState({
            prevInput: event.target.value
        });
        var dataId = event.target.getAttribute("data-id");
        dataId = parseInt(dataId,10);
        var inputArray = this.state.creditInputAll;
        if(dataId !== this.state.prevDataId){
            inputArray[this.state.prevDataId] = this.state.prevInput;
            this.setState({
                prevDataId: dataId,
                creditInputAll: inputArray
            });
        }
        // console.log(this.state.creditInputAll);
        // console.log(typeof(dataId));
    }

    render(){
        const semesterCredit = [];
        for(var i=0; i<this.state.semesterNo; i++){
            semesterCredit.push(<Form.Control key={i} onChange={(e) => {this.handleCreditString(e)}} className="m-1" data-id={i} type="text" placeholder="Type like..11+9+6+14+6+6"/>)
        }

        return(
            <div className={styles.creditTotalContainer}>
                <Form.Label className="m-2 text-white">Semesters you had done</Form.Label>
                <Form.Control as="select" onChange={this.handleSemesterNo}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </Form.Control>
                {semesterCredit}
                <div className="d-flex m-2">
                    <Button className="mx-1 bg-success" onClick={this.handleCalculation}>Calculate</Button>
                    <Button className="bg-danger mx-1" onClick={this.handleClosingCreditContainer} aria-label="Close">
                        <span>&times;</span>
                    </Button>
                </div>
            </div>
        );
    }
}

export default TotalCredit;