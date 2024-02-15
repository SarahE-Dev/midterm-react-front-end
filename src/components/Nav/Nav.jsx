import React, { Component } from 'react'
import { Navbar, Container, Nav as Navi } from 'react-bootstrap'
import './Nav.css'
import { Link , NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faHeadphones} from '@fortawesome/free-solid-svg-icons'



export class Nav extends Component {
  render() {
    return (
        <Navbar data-bs-theme='dark' bg='dark' className="d-flex align-items-center bg-body-tertiary Navbar">
        <Container>
          
          <NavLink style={{textDecoration: 'none'}} to={this.props.user ? '/music' : '/'}  >
          <div style={{position: 'absolute', top: 5, left: 10, zIndex: 3, paddingLeft: 30}} className='d-flex align-items-center'>
          <Navbar.Brand style={{fontSize: '35px'}}>
          <FontAwesomeIcon
        style={{color: 'fuchsia'}} icon={faHeadphones}/>
            
          </Navbar.Brand>
            <Navbar.Brand style={{fontSize: '2.25vw', fontFamily: '"Permanent Marker", cursive'}}>{<span style={{color: 'blueviolet'}}>F</span>}{<span style={{color: 'purple'}}>Y</span>}{<span style={{color: 'deeppink'}}>R</span>}{<span style={{color: 'fuchsia'}}>E</span>} {<span style={{color: 'rgb(190, 43, 141)'}}>T</span>}{<span style={{color: 'purple'}}>U</span>}{<span style={{color: 'deeppink'}}>N</span>}{<span style={{color: 'fuchsia'}}>E</span>}{<span style={{color: 'blueviolet'}}>S</span>}</Navbar.Brand>
          
          </div>
          </NavLink>
          
            
          
            
            {this.props.user ? <Navi className='justify-content-end ' variant='underline'
            style={{paddingTop: 17, fontSize: 20}} 
            >
              <Navbar.Text>
                 <p style={{fontFamily: 'Audiowide'}}>Signed in as:  </p> 
                 </Navbar.Text>
              <Navi.Item >
                
                <Navi.Link
                href='/profile'
                as={NavLink}
                style={{ color: 'blueviolet', fontFamily: 'Audiowide'}}
                to="/profile">{this.props.user.username}
                </Navi.Link>
              </Navi.Item>
              <Navi.Item>
                <Navi.Link as={NavLink} 
                
                style={{ color: 'white', fontFamily: 'Audiowide'}}
                to="/login" onClick={this.props.handleUserLogout}>Logout
                </Navi.Link>
              </Navi.Item>
            </Navi> : <Navi className='justify-content-end' variant='underline' ><Navi.Item><Navi.Link as={NavLink} eventKey='1' style={{textDecoration: 'none', color: 'white', fontFamily: 'Audiowide'}} to="/login" >
                        Login
                    </Navi.Link></Navi.Item><Navi.Item><Navi.Link as={NavLink} eventKey='2'  style={{textDecoration: 'none', color: 'white', fontFamily: 'Audiowide'}} activeclassname="selected" to="/sign-up" >
                        Sign up
                    </Navi.Link></Navi.Item></Navi>} 
          
        
        </Container>
      </Navbar>
      
    )
  }
}

export default Nav
