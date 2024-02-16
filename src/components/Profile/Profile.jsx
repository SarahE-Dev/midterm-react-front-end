import React, { Component } from 'react'
import './Profile.css'
import Axios from '../../utils/Axios'
import { Container, Form, Row, InputGroup, Button, Col } from 'react-bootstrap'
import {isAlpha, isAlphanumeric, isStrongPassword, isEmail} from 'validator'
import {toast} from 'react-toastify'

export class Profile extends Component {
  state={
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    id: "",
    editable: false,
    button: "Edit Profile",
    validated: false,
    emailError: '',
    firstNameError: '',
    lastNameError: '',
    usernameError: '',
    submitDisabled: true
  }
  componentDidMount(){
    if(!this.props.user){
        return
    }
    this.getProfile()
  }
  componentDidUpdate(prevProps, prevState){
    if(!prevProps.user || (prevState.firstName && prevState.firstName === this.state.firstName)){
        console.log(prevProps.user);
        console.log(prevState.firstName, this.state.firstName);
        return
    }
    if(!this.state.editable){
      this.getProfile()
    }
    
    if(prevState.submitDisabled){
      if(this.state.firstNameError.length === 0 && this.state.lastNameError.length === 0 && this.state.usernameError.length === 0 && this.state.emailError.length === 0 && this.state.firstName.length && this.state.lastName.length && this.state.username.length && this.state.email.length ){
          this.setState({
              submitDisabled: false
          })
      }
  }
    
}
  getProfile=async ()=>{
    try {
      let currentUser = await Axios.get(`/api/user/get-user-by-id/${this.props.user.id}`)
      if(currentUser){
          
          const {firstName, lastName, email, username, _id} = currentUser.data.payload
          this.setState({
              firstName,
              lastName,
              username,
              email,
              id: _id,
              editable: false
          })
      }
  } catch (error) {
      console.log(error);
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
            
        }
    
    })
    
}
  handleOnSubmit=async (e)=>{
    e.preventDefault()
    if(this.state.editable){
        try {
            let updatedUser = await Axios.put(`/api/user/update-user/${this.state.id}`, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email
            })
            console.log(updatedUser);
            const {firstName, lastName, username, email} = updatedUser.data.payload
            this.setState({
                firstName,
                lastName,
                username,
                email,
                editable: false,
                button: "Edit Profile"
            })
            toast.success('User was updated successfully.')
        } catch (error) {
            console.log(error);
            if(error.response.status == 500){
                toast.error('This username or email already exists.')
            }
        }
    }else{
      this.setState({
        editable: true,
        button: "Done"
      })
    }
    
    
    
  }

  

  

  getEditableProfile=()=>{
    return (
    <Form onSubmit={this.handleOnSubmit} className='profileForm' >
    <Row className='mb-3'>
    <Form.Group as={Col} >
     <Form.Control style={this.state.editable ? {backgroundColor: 'blueviolet', color: 'white'} : {backgroundColor: 'black', color: 'white'}} {...(this.state.editable ? '' : {disabled: true})} required value={this.state.firstName} onChange={this.handleOnChange} placeholder="First name" name='firstName'
      />
      <Form.Text>{this.state.firstNameError}</Form.Text>
     </Form.Group>
     <Form.Group as={Col}>
     <Form.Control style={this.state.editable ? {backgroundColor: 'blueviolet', color: 'white'} : {backgroundColor: 'black', color: 'white'}} {...(this.state.editable ? '' : {disabled: true})} value={this.state.lastName} onChange={this.handleOnChange} required name='lastName' placeholder="Last name" />
     <Form.Text>{this.state.lastNameError}</Form.Text>
   </Form.Group>
   </Row>   
   <Row className='mb-3'>
       <Col>
       <Form.Control style={this.state.editable ? {backgroundColor: 'blueviolet', color: 'white'} : {backgroundColor: 'black', color: 'white'}} {...(this.state.editable ? '' : {disabled: true})} required value={this.state.email} onChange={this.handleOnChange} type='email' name='email' placeholder='Enter Email'/>
       <Form.Text>{this.state.emailError}</Form.Text>
       </Col>
   </Row>
   <Row className='mb-3'>
   <Col>
     <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
       Username
     </Form.Label>
     <InputGroup>
       <InputGroup.Text style={this.state.editable ? {backgroundColor: 'blueviolet', color: 'white'} : {backgroundColor: 'black', color: 'white'}}>@</InputGroup.Text>
       <Form.Control style={this.state.editable ? {backgroundColor: 'blueviolet', color: 'white'} : {backgroundColor: 'black', color: 'white'}} {...(this.state.editable ? '' : {disabled: true})} value={this.state.username} name='username' onChange={this.handleOnChange} id="inlineFormInputGroup" placeholder="Username" required />
       
     </InputGroup>
     <Form.Text>{this.state.usernameError}</Form.Text>
   </Col>
   </Row>
   <Button disabled={this.state.submitDisabled} variant="secondary" type="submit">
     {this.state.button}
   </Button>
 </Form>
    )
  }


  render() {
    
    return (
      <div className='Profile'>
        
          {this.getEditableProfile()}
        
      </div>
    )
  }
}

export default Profile