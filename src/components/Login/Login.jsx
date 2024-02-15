import React, { Component } from 'react'
import { Button, Form, Image, Container, InputGroup } from 'react-bootstrap'
import './Login.css'
import setAxiosAuthToken from '../../utils/setAxiosAuthToken'
import { jwtDecode } from 'jwt-decode'
import Axios from '../../utils/Axios'
import logo from '../../images/Fyre.png'


export class Login extends Component {
  state={
    username: '',
    password: ''
  }
  handleOnChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
    
  }
  handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await Axios.post('/api/user/sign-in', {
          username: this.state.username,
          password: this.state.password
      })
      
      if(response){
        
        let decodedToken = jwtDecode(response.data.jwt)
        window.localStorage.setItem('jwt', response.data.jwt)
        this.setState({
          username: "",
          password: ""
        })
        setAxiosAuthToken(response.data.jwt)
        this.props.handleUserLogin({
          username: decodedToken.username,
          email: decodedToken.email,
          id: decodedToken.id
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      
      <div className='Login'>
        <img
              
              alt=""
              src={logo}
              height='150px'
              style={{borderRadius: 20}}
              className="d-inline-block align-top"
            />{' '}
        <Form onSubmit={this.handleOnSubmit}  className='form' >
      <Form.Group className="mb-5" >
      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Username
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
            onChange={this.handleOnChange} value={this.state.username} name='username'  id="inlineFormInputGroup" placeholder="Username" required />
            
          </InputGroup>
      </Form.Group>

      <Form.Group className="mb-5" >
        <Form.Control
        value={this.state.password}
        onChange={this.handleOnChange}
        name='password'
        type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
    
    )
  }
}

export default Login
