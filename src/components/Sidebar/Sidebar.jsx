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
      <div className='Sidebar'>
        <Container>
        {/* <Popup trigger=
                {<button> Click to open popup </button>}
                position="right center">
                <div>GeeksforGeeks</div>
                <button>Click here</button>
            </Popup> */}
            {/* <div style={{textAlign: 'center'}}>
          <FaHeadphones
          className='headphones'
          style={{fontSize: '10vw'}}/>
          </div> */}
          
        <h2 className='menuTitle' >My Music App</h2>
        <hr style={{color: 'white', margin: '10px 10px'}} />
        <Nav
        style={{marginTop: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
        className='justify-content-center'
        variant='underline'>
        <Nav.Item>
        <Nav.Link
        style={{color: 'white'}}
        eventKey='1' as={NavLink}  to='/favorites'><h3 >Favorites</h3></Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link
        style={{color: 'white'}}
        eventKey='2' as={NavLink}   to='/playlists'><h3 >Playlists</h3></Nav.Link>
        </Nav.Item>
        </Nav>
        
        </Container>
        
        
      </div>
    )
  }
}

export default Sidebar