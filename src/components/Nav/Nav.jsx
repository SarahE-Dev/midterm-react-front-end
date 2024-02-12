import React, { Component } from 'react'
import { Navbar, Container, Nav as Navi } from 'react-bootstrap'
import './Nav.css'
import { Link , NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faHeadphones} from '@fortawesome/free-solid-svg-icons'


export class Nav extends Component {
  render() {
    return (
        <Navbar data-bs-theme='dark' bg='dark' className="bg-body-tertiary Navbar">
        <Container>
          
          <NavLink style={{textDecoration: 'none'}} to={this.props.user ? '/music' : '/'}  >
          <Navbar.Brand style={{fontSize: 35}}>
            <FontAwesomeIcon style={{color: 'purple'}} icon={faHeadphones}/>
            <img
              alt=""
              src="./src/assets/Spotify_Logo_RGB_Black.png"
              
              height="50"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          </NavLink>
          
            
          
            
            {this.props.user ? <Navi className='justify-content-end ' variant='underline'
            style={{paddingTop: 17}} 
            >
              <Navbar.Text>
                 <p>Signed in as:  </p> 
                 </Navbar.Text>
              <Navi.Item >
                
                <Navi.Link
                eventKey='1'
                as={NavLink}
                style={{textDecoration: 'none', color: 'purple'}}
                to="/profile">{this.props.user.username}
                </Navi.Link>
              </Navi.Item>
              <Navi.Item>
                <Navi.Link as={NavLink} 
                eventKey='2'
                style={{textDecoration: 'none', color: 'white'}}
                to="/login" onClick={this.props.handleUserLogout}>Logout
                </Navi.Link>
              </Navi.Item>
            </Navi> : <Navi className='justify-content-end' variant='underline' ><Navi.Item><Navi.Link as={NavLink} eventKey='1' style={{textDecoration: 'none', color: 'white'}} to="/login" >
                        Login
                    </Navi.Link></Navi.Item><Navi.Item><Navi.Link as={NavLink} eventKey='2'  style={{textDecoration: 'none', color: 'white'}} activeclassname="selected" to="/sign-up" >
                        Sign up
                    </Navi.Link></Navi.Item></Navi>} 
          
        
        </Container>
      </Navbar>
      
    )
  }
}

export default Nav
