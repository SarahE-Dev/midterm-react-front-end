import React, { Component } from 'react'
import {Form, Container, Button, Image, Row, Col, InputGroup} from 'react-bootstrap'
import './SignUp.css'
import Axios from '../../utils/Axios'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from 'validator'
import logo from '../../images/Fyre.png'

export class SignUp extends Component {
    state={
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        validated: false,
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        firstNameError: '',
        lastNameError: '',
        usernameError: '',
        submitDisabled: true
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.submitDisabled){
            if(this.state.firstNameError.length === 0 && this.state.lastNameError.length === 0 && this.state.usernameError.length === 0 && this.state.emailError.length === 0 && this.state.passwordError.length === 0 && this.state.confirmPasswordError.length === 0 && this.state.firstName.length && this.state.lastName.length && this.state.username.length && this.state.email.length && this.state.password.length && this.state.confirmPassword.length){
                this.setState({
                    submitDisabled: false
                })
            }
        }
    }

    handleOnChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            [`${e.target.name}Error`] : ""
        }, ()=>{
            // Targets each case and runs the proper checks on each value, sets error message if the boolean from the check is false.
            switch(e.target.name){
                case "firstName":
                case "lastName": this.setState({
                    [`${e.target.name}Error`]: isAlpha(this.state[e.target.name]) ? "" : `${e.target.placeholder} should be alphabetical.`
                })
                    break;
                case "email": this.setState({
                    emailError: isEmail(this.state.email) ? "" : "Must be a valid email."
                })
                    break;
                case "username": this.setState({
                    usernameError: isAlphanumeric(this.state.username) ? "" : "Username must be alphanumeric."
                })
                    break;
                case "password": this.setState({
                    passwordError: isStrongPassword(this.state.password) ? "" : "Must be 8 characters long, 1 lowercase, 1 uppercase & 1 special character."
                })
                    break;
                case "confirmPassword":
                    this.setState({
                        confirmPasswordError: this.state.password === this.state.confirmPassword ? "" : "Passwords must match."
                    }) 
                    break;
            }
        
        })
        
    }



    handleOnSubmit=async (e)=>{
        e.preventDefault()
        try {
            const newUser = await Axios.post("/api/user/sign-up", {
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
            console.log(newUser);
            if(newUser){
                toast('User Created Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                })
                this.setState({
                    firstName: "",
                    lastName: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
        
    }

  render() {
    return (
        <div className="Login">
        <img
              style={{borderRadius: 20}}
              alt=""
              src={logo}
              height="150"
              className="d-inline-block align-top"
            />{' '}
        <Form onSubmit={this.handleOnSubmit} className='form' >
         <Row className='mb-3'>
         <Form.Group as={Col} >
          <Form.Control required value={this.state.firstName} onChange={this.handleOnChange} placeholder="First name" name='firstName'
           />
           <Form.Text>{this.state.firstNameError}</Form.Text>
          </Form.Group>
          <Form.Group as={Col}>
          <Form.Control value={this.state.lastName} onChange={this.handleOnChange} required name='lastName' placeholder="Last name" />
          <Form.Text>{this.state.lastNameError}</Form.Text>
        </Form.Group>
        </Row>   
        <Row className='mb-3'>
            <Col>
            <Form.Control required value={this.state.email} onChange={this.handleOnChange} type='email' name='email' placeholder='Enter Email'/>
            <Form.Text>{this.state.emailError}</Form.Text>
            </Col>
        </Row>
        <Row className='mb-3'>
        <Col>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Username
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control value={this.state.username} name='username' onChange={this.handleOnChange} id="inlineFormInputGroup" placeholder="Username" required />
            
          </InputGroup>
          <Form.Text>{this.state.usernameError}</Form.Text>
        </Col>
        </Row>
        <Row className='mb-3'>
         <Form.Group as={Col}>
          <Form.Control required value={this.state.password} onChange={this.handleOnChange} type='password' name='password' placeholder="Password" />
          <Form.Text>{this.state.passwordError}</Form.Text>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control required onChange={this.handleOnChange} value={this.state.confirmPassword} name='confirmPassword' placeholder="Confirm Password" />
          <Form.Text>{this.state.confirmPasswordError}</Form.Text>
          </Form.Group>
          
        </Row>
        <Button disabled={this.state.submitDisabled} variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    )
  }
}

export default SignUp