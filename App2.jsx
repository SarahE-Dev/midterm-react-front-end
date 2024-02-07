import React, { Component } from 'react'
import { loginUrl } from './spotify'
import { Button, Container } from 'react-bootstrap'
import axios from 'axios'

const clientId = 'ecd8fa6a04bd4deab879476a85c542b4'

const clientSecret = '0058529087bb4a53872707043a4cf1ff'

const grantType = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  
  
export class App2 extends Component {
  state={
    text: ''
  }
  getAccessToken = async ()=>{
    let token = await axios.post('https://accounts.spotify.com/api/token', grantType, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    console.log(token);
    window.localStorage.setItem('accessToken', token.data.access_token)
  }
  handleOnChange=(e)=>{
    this.setState({
      text: e.target.value
    })
  }
  
  render() {
    return (
        <div><Button onClick={this.getAccessToken}>Get Token</Button> 
        <Container>
        <input value={this.state.text} onChange={this.handleOnChange}></input><Button>Search</Button> 
        </Container>       
        </div>
    )
  }
}

export default App2