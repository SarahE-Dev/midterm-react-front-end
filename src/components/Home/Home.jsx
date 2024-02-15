import React from 'react'
import { Container, Button } from 'react-bootstrap'
import './Home.css'
import { Link } from 'react-router-dom'
import logo from '../../images/Fyre.png'

export default function Home() {
  return (
    <div className='Home'>
        <img
              style={{marginBottom: 30, height: '150px', borderRadius: 20}}
              alt=""
              src={logo}
              className="d-inline-block align-top"
            />{' '}
        <h2 style={{color: 'blueviolet', marginBottom: 30, textShadow: '2px -2px 2px deeppink', fontFamily: '"Permanent Marker", cursive'}}>Music sets the soul on fyre.</h2>
        <Link to='/login'>
          <Button style={{borderRadius: 20, fontFamily: 'Audiowide'}}
          variant='outline-light'
          className='buttonLogin'>Login</Button>
        </Link>
        
        <hr />
        <Link to='/sign-up'>
        <Button style={{borderRadius: 20, fontFamily: 'Audiowide'}}
        variant='outline-light'
        className='buttonLogin'>Signup</Button>
        </Link>
        
    </div>
  )
}
