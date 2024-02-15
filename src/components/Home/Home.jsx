import React from 'react'
import { Container, Button } from 'react-bootstrap'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
        <img
              style={{marginBottom: 30, height: '150px', borderRadius: 20}}
              alt=""
              src="./images/Fyre.png"
              id='logo'
              className="d-inline-block align-top"
            />{' '}
        <h2 style={{color: 'purple', marginBottom: 30, textShadow: '1px -1px 1px deeppink', fontFamily: '"Permanent Marker", cursive'}}>Music sets the soul on fyre.</h2>
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
