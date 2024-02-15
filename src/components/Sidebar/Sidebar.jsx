import React, { Component } from 'react'
import './Sidebar.css'
import { Link, NavLink } from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'
import {FaHeadphones} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'


export class Sidebar extends Component {
  render() {
    return (
      <div  className='Sidebar'>
        <Container>
        
         <div className='text-center d-flex justify-content-center'>
         <img
              style={{margin: 30, height: '12vw', borderRadius: 20}}
              src="./images/Fyre.png"
              id='logo'
              className="d-inline-block align-top"
            />{' '}
        
        </div> 
        <hr style={{color: 'white', margin: '10px 10px'}} />
        <Nav
        style={{marginTop: 50}}
        className='flex-column'
        variant='underline'>
        <Nav.Item>
        <Nav.Link
        style={{color: 'white', fontFamily: 'Audiowide', fontSize: '2.25vw'}}
        eventKey='1' as={NavLink}  to='/favorites'> Favorites</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link
        style={{color: 'white', fontFamily: 'Audiowide', fontSize: '2.25vw'}}
        eventKey='2' as={NavLink}   to='/playlists'>Playlists</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{color: 'purple', paddingTop: 150, fontFamily: 'Audiowide'}}
        eventKey='3' as={NavLink}   to='/login' onClick={this.props.handleUserLogout}>Logout</Nav.Link>
        </Nav.Item>
        </Nav>
        
        </Container>
        
        
      </div>
    )
  }
}

export default Sidebar