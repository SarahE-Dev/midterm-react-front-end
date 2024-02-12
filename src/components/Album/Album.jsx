import React, { Component } from 'react'
import './Album.css'
import axios from 'axios'
import { Container, Card, ListGroup, Button } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Axios from '../../utils/Axios'




export class Album extends Component {
    state= {
        albumTitle: '',
        albumImage: '',
        albumTracks: [],
        albumYear: '',
        albumArtist: '',
        favoriteSongs: [],
        favoriteAlbums: [],
        username: ''
    }
    checkForFaveSong=(id)=>{
      let found = this.state.favoriteSongs.filter(elem=>elem.songID === id)
      return found.length > 0
    }
    addToFavorites= async (songID, songTitle, songArtist, songImage)=>{
      
      try {
        let newFave = await Axios.put(`http://localhost:3000/api/user/add-favorite-song/${this.state.username}`, {
          songID: songID,
          songArtist: songArtist,
          songTitle: songTitle,
          songImage: songImage,

        })
        this.setState({
          favoriteAlbums: newFave.data.payload.favoriteAlbums,
          favoriteSongs: newFave.data.payload.favoriteSongs
        })
        console.log(newFave);
      } catch (error) {
        console.log(error);
      }
    }

    removeFromFavorites=async(songID, songTitle, songArtist, songImage)=>{
        try {
          let newFave = await Axios.put(`http://localhost:3000/api/user/remove-favorite-song/${this.state.username}`, {
            songID: songID,
            songArtist: songArtist,
            songTitle: songTitle,
            songImage: songImage,
  
          })
          this.setState({
            favoriteAlbums: newFave.data.payload.favoriteAlbums,
            favoriteSongs: newFave.data.payload.favoriteSongs
          })
          console.log(newFave);
        } catch (error) {
          console.log(error);
        }
    }
    
    async componentDidMount(){
        try {
            const searchParameters = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.props.access_token}`
                }
              }
            const path = window.location.pathname.split('/')
            const id = path[path.length-1]
            const album = await axios.get(`https://api.spotify.com/v1/albums/${id}`, searchParameters)
            console.log(album);
            const user = await Axios.get(`http://localhost:3000/api/user/get-user-by-id/${this.props.user.id}`)
            console.log(user);
            this.setState({albumArtist: album.data.artists[0].name,
                albumTitle: album.data.name,
                albumTracks: album.data.tracks.items,
                favoriteAlbums: user.data.payload.favoriteAlbums,
                favoriteSongs: user.data.payload.favoriteSongs,
                username: user.data.payload.username,
                albumImage: album.data.images[0].url
            })
        } catch (error) {
            console.log(error);
        }
    }
  render() {
    return (
      <div className='Album'>
        <div className="albumMain">
            <Card style={{width: '60vw', marginLeft: '10vw', marginTop: '5vh', backgroundColor: 'gray'}}>
                <Card.Header>
                <Card.Title className='text-center'>{this.state.albumTitle}</Card.Title>
                <Card.Subtitle className='text-center'>{this.state.albumArtist}</Card.Subtitle>
                </Card.Header>
                <Card.Body className='text-center'>
                <Card.Img style={{width: 100, height: 100}} src={this.state.albumImage}>
                </Card.Img>
                </Card.Body>
                <Card.Body>
                <ListGroup as='ul'>
                    {this.state.albumTracks.map((track)=>{
                        return (
                              <ListGroup.Item key={track.name} className='d-flex align-items-md-center text-truncate justify-content-sm-between' style={{height: '7vh', backgroundColor: 'gray'}}>
                              <NavLink className='nlink text-truncate' to={`/song/${track.id}`} style={{color: 'black', paddingTop: '5px'}} key={track.id} >{track.name}</NavLink>
       <div className='justify-content-e'  >  
       <Button style={{fontSize: '1.5vw'}}>Add to Playlist</Button> 
       {this.checkForFaveSong(track.id) ? <Button style={{fontSize: '1.5vw'}} onClick={()=>{this.removeFromFavorites(track.id, track.name, this.state.albumArtist, this.state.albumImage)}} >Remove Fave                       
      </Button> : <Button style={{fontSize: '1.5vw'}} onClick={()=>{this.addToFavorites(track.id, track.name, this.state.albumArtist, this.state.albumImage)}} >Add To Faves                        
      </Button>}                   
     
      </div> 
                              </ListGroup.Item>
                              
                        )
                    })}
                </ListGroup>
                </Card.Body>
            </Card>
        </div>
      </div>
    )
  }
}

export default Album