import React, { Component } from 'react'
import './Favorites.css'
import Axios from '../../utils/Axios'
import { Card, ListGroup } from 'react-bootstrap'

export class Favorites extends Component {
  state={
    favoriteAlbums: [],
    favoriteSongs: [],
    favoritesRecieved: false
  }
  getFavorites=async()=>{
    try {
      const user = await Axios.get(`http://localhost:3000/api/user/get-user-by-id/${this.props.user.id}`)
      console.log(user);
      this.setState({
        favoriteAlbums: user.data.payload.favoriteAlbums,
        favoriteSongs: user.data.payload.favoriteSongs,
        favoritesRecieved: true
      })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(!this.props.user || (prevState.favoritesRecieved && prevState.favoritesRecieved === this.state.favoritesRecieved)){
      return
    }
    this.getFavorites()
  }

  async componentDidMount(){
    if(!this.props.user){
      return
    }
    this.getFavorites()
  }
  render() {
    return (
      <div className='Favorites'>
        {
          this.state.favoriteSongs.map((song)=>{
            return (<h1 key={song.songID}>{song.songTitle}</h1>)
          })
        }
      </div>
    )
  }
}

export default Favorites