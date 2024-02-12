import React, { Component } from 'react'
import './Favorites.css'
import Axios from '../../utils/Axios'
import { Card, ListGroup } from 'react-bootstrap'

export class Favorites extends Component {
  state={
    favoriteAlbums: [],
    favoriteSongs: []
  }
  async componentDidMount(){
    console.log(this.props);
    try {
      const user = await Axios.get(`http://localhost:3000/api/user/get-user-by-id/${this.props.user.id}`)
      console.log(user);
      this.setState({
        favoriteAlbums: user.data.payload.favoriteAlbums,
        favoriteSongs: user.data.payload.favoriteSongs
      })
    } catch (error) {
      console.log(error);
    }
    

  }
  render() {
    return (
      <div className='Favorites'></div>
    )
  }
}

export default Favorites