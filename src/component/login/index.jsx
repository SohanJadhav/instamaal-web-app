
import React, { Component } from 'react';
import { Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userName: '',
            password: '',
            validated: false,
            isInvalidCredentials: false
        }
    }

    componentDidMount() {
        const isLoggedIn = localStorage.getItem('user');
        if (isLoggedIn === 'Sohan') {
            this.props.history.push(`/home`);
        } else {
            this.props.history.push(`/`);
        }
    }

    handleLoginClick = () => {
        const { userName, password } = this.state;
        if (password && userName) {
            const loginInfo = {
                userName, password
            }
            axios.post(`http://13.232.114.224:8080/loginAdmin`, loginInfo)
                .then(res => {
                    if (res && res.data.data && res.data.data.length) {
                        const distributorInfo = res.data.data[0];
                        localStorage.setItem('user', 'Sohan');
                        this.props.onSetLoggedInUserInfo(distributorInfo);
                        this.props.history.push(`/home`);
                    } else {
                        this.setState({
                            isInvalidCredentials: true
                        })
                    }
                }).catch(error => {
                    console.log("Error", error)
                })
        }
    }

    setValidated = (value) => {
        this.setState({
            validated: value
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        //}

        this.setValidated(true);
        this.handleLoginClick();
    };

    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { userName, password, validated , isInvalidCredentials} = this.state;
        return (
            <>
                <div className="row page-header">
                    <div className="col-12">
                        <h5>Login</h5>
                    </div>
                </div>
                <div className="row mx-auto page-content">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6 mx-auto htmlForm">
                                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control placeholder="Enter email" name="userName" value={userName} onChange={this.handleTextChange} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleTextChange} />
                                    </Form.Group>
                                    {
                                        isInvalidCredentials &&
                                        <Alert variant="danger">
                                            Please enter valid user name and password!
                     </Alert>
                                    }
                                    <Button type="submit" onClick={this.handleLoginClick}>Submit</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Login);