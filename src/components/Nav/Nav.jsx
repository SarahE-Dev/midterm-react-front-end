import React, { Component } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import './Nav.css'
import { Link , NavLink} from 'react-router-dom'

export class Nav extends Component {
  render() {
    return (
        <Navbar data-bs-theme='dark' bg='dark' className="bg-body-tertiary Navbar">
        <Container>
          <Link style={{textDecoration: 'none'}} to='/music'>
          <Navbar.Brand href="" style={{fontSize: 35}}>
            <img
              alt=""
              src="./src/assets/Spotify_Logo_RGB_Black.png"
              
              height="50"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          </Link>
          <Navbar.Text>
          <ul>{this.props.user ? 
            <li><NavLink to="/profile">{this.props.user.username}</NavLink></li> : 
                <li>
                    <NavLink activeclassname="selected" to="/sign-up" >
                        Sign up
                    </NavLink>
                </li>
              }
              {this.props.user ? <li>
                <NavLink to="/login" onClick={this.props.handleUserLogout}>Logout</NavLink>
              </li> : 
                <li>
                    <NavLink  activestyle={{borderBottom: "1px solid white"}} to="/login" >
                        Login
                    </NavLink>
                </li>
  }
            </ul>
            </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {this.props.user ? `Signed in as: ${this.props.user.username}` : ''} 
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      
    )
  }
}

export default Nav
