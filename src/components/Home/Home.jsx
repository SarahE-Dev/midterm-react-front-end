import React from 'react'
import { Container, Button } from 'react-bootstrap'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
        <Link to='/login'>
          <Button style={{borderRadius: 20}}
          variant='outline-light'
          className='buttonLogin'>Login</Button>
        </Link>
        
        <hr />
        <Link to='/sign-up'>
        <Button style={{borderRadius: 20}}
        variant='outline-light'
        className='buttonLogin'>Signup</Button>
        </Link>
        
    </div>
  )
}
