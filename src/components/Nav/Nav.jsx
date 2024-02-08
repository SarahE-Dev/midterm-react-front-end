import React, { Component } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import './Nav.css'
import { Link , NavLink} from 'react-router-dom'

export class Nav extends Component {
  render() {
    return (
        <Navbar data-bs-theme='dark' bg='dark' className="bg-body-tertiary Navbar">
        <Container>
          <NavLink style={{textDecoration: 'none'}} to='/music'>
          <Navbar.Brand href="" style={{fontSize: 35}}>
            <img
              alt=""
              src="./src/assets/Spotify_Logo_RGB_Black.png"
              
              height="50"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          </NavLink>
          
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {this.props.user ? <div className='menu'>Signed in as: <NavLink to="/profile">{this.props.user.username}</NavLink> <NavLink to="/login" onClick={this.props.handleUserLogout}>Logout</NavLink></div> : <div className='menu2'><NavLink  activestyle={{borderBottom: "1px solid white"}} to="/login" >
                        Login
                    </NavLink><NavLink activeclassname="selected" to="/sign-up" >
                        Sign up
                    </NavLink></div>} 
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
    )
  }
}

export default Nav
