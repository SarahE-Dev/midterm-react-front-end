import React, { Component } from 'react'
import './Sidebar.css'
import { Link, NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export class Sidebar extends Component {
  render() {
    return (
      <div className='Sidebar'>
        <Container>
        <h2 className='menuTitle' >My Music App</h2>
        <hr style={{color: 'white', margin: '10px 30px'}} />
        <NavLink className='navlink' to='/favorites'><h3 className='menuItem favoritesItem'>Favorites</h3></NavLink>
        <NavLink className='navlink'  to='/playlists'><h3 className={`menuItem playlistsItem ${({ isActive }) => (isActive ? 'active' : 'inactive')}`}>Playlists</h3></NavLink>
        </Container>
      </div>
    )
  }
}

export default Sidebar