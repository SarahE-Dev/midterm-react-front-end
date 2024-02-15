import React, { Component } from 'react'
import './Album.css'
import axios from 'axios'
import { Container, Card, ListGroup, Button, Form, Modal, InputGroup, FormControl } from 'react-bootstrap'
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
        username: '',
        playlists: [],
        playlistsRecieved: false,
        show: false,
        playlistIDSelected: '',
        songSelection: {},
        albumDate: '',
        createPlaylistShow: false,
        playlistInput: ''
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
        } catch (error) {
          console.log(error);
        }
    }

    handlePlaylistSelection=(e)=>{
      this.setState({
        playlistIDSelected: e.target.ariaLabel
      })
      console.log(this.state);
}

handleModalSave= async ()=>{
  try {
    const updatedPlaylist = await Axios.put(`http://localhost:3000/api/playlist/add-song/${this.state.playlistIDSelected}`, this.state.songSelection)
    console.log(updatedPlaylist);
  } catch (error) {
    console.log(error);
  }
  this.setState({
    show: false
  })
}

    getPlaylists=async()=>{
      try {
        const playlists = await Axios.get(`http://localhost:3000/api/playlist/get-user-playlists/${this.props.user.username}`)
        this.setState({
          playlists: playlists.data.payload,
          playlistsRecieved: true
        })
        console.log(playlists);
      } catch (error) {
        console.log(error);
      }
    }

    handleModalClose=()=>{
      this.setState({
        show: false
      })
    }

    

    handleModalShow=(songID, songTitle, songArtist, songImage)=>{
      this.setState({
        show: true,
        songSelection: {
          songID: songID,
          songTitle: songTitle,
          songArtist: songArtist,
          songImage: songImage
        }
      })
    }

    createPlaylist=async(e)=>{
      e.preventDefault()
      if(this.state.playlistInput !== ''){
        try {
          const newPlaylist = await Axios.post('http://localhost:3000/api/playlist/create-playlist', {
            username: this.props.user.username,
            playlistName: this.state.playlistInput
          })
          this.setState({
            playlists: [...this.state.playlists, newPlaylist.data.payload],
            createPlaylistShow: false
          })
          
        } catch (error) {
          console.log(error);
        }
      }
    }

    getAlbumData=async()=>{
      try {
        const searchParameters = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          }
        const path = window.location.pathname.split('/')
        const id = path[path.length-1]
        const album = await axios.get(`https://api.spotify.com/v1/albums/${id}`, searchParameters)
        console.log(album);
        const user = await Axios.get(`http://localhost:3000/api/user/get-user-by-id/${this.props.user.id}`)
        const albumDate = new Date(album.data.release_date)
        const actualDate = albumDate.toDateString()
        this.setState({albumArtist: album.data.artists[0].name,
            albumTitle: album.data.name,
            albumTracks: album.data.tracks.items,
            favoriteAlbums: user.data.payload.favoriteAlbums,
            favoriteSongs: user.data.payload.favoriteSongs,
            username: user.data.payload.username,
            albumImage: album.data.images[0].url,
            albumDate: actualDate
        })
    } catch (error) {
        console.log(error);
    }
    }

    handleOnChange=(e)=>{
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    displayAlbumInfo=()=>{
        return (
          <div className='Album'>
          <div className="albumMain">
          <Modal className='my-modal' onHide={this.handleModalClose} centered show={this.state.show}>
            <Modal.Header style={{color: 'black'}} closeButton><h4>Select a Playlist to add song to: </h4></Modal.Header>
            <Modal.Body>
              <Form>
              {this.state.playlists.map(item=>{
                return (
                  <Form.Check
                  key={item._id}
                  onChange={this.handlePlaylistSelection}
                  type='radio'
                  label={item.playlistName}
                  name='playlists'
                  aria-label={item._id}
                   />
                )
              })}
              </Form>
              
              {this.state.createPlaylistShow ? <Form style={{marginTop: 7}}>
                <InputGroup >
                  <FormControl value={(this.state.playlistInput)} name='playlistInput' onChange={this.handleOnChange} style={{backgroundColor: 'black', color: 'white'}}></FormControl>
                  <Button size='sm' variant='light' onClick={this.createPlaylist}>Create</Button>
                </InputGroup>
              </Form> : <Button style={{marginTop: 7}} size='sm' variant='outline-dark' onClick={()=>this.setState({createPlaylistShow: true})}>Create PLaylist</Button>}
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant='dark' onClick={this.handleModalSave}>Save</Button>
            </Modal.Footer>
          </Modal>
              <Card style={{width: '60vw', marginLeft: '10vw', marginTop: '5vh', backgroundColor: 'black', color: 'white', border: '1px solid white'}}>
                  <Card.Header>
                  <Card.Title className='text-center'>{this.state.albumTitle}</Card.Title>
                  <Card.Subtitle className='text-center'>{this.state.albumArtist}</Card.Subtitle>
                  <Card.Text className='text-center'>{this.state.albumDate}</Card.Text>
                  </Card.Header>
                  <Card.Body className='text-center'>
                  <Card.Img style={{width: 100, height: 100}} src={this.state.albumImage}>
                  </Card.Img>
                  </Card.Body>
                  <Card.Body>
                  <ListGroup as='ul'>
                      {this.state.albumTracks.map((track)=>{
                          return (
                                <ListGroup.Item key={track.name} className='d-flex align-items-md-center text-truncate justify-content-sm-between' style={{height: '7vh', backgroundColor: 'black'}}>
                                <NavLink className='nlink text-truncate' to={`/song/${track.id}`} style={{color: 'white', paddingTop: '5px', textDecoration: 'none'}} key={track.id} >{track.name}</NavLink>
         <div className='justify-content-e'  >  
         <Button size='sm' variant='outline-light' onClick={()=>this.handleModalShow(track.id, track.name, this.state.albumArtist, this.state.albumImage)} style={{fontSize: 10}}>Add to Playlist</Button> 
         {this.checkForFaveSong(track.id) ? <Button variant='outline-light' size='sm' style={{fontSize: 10, marginLeft: 5}} onClick={()=>{this.removeFromFavorites(track.id, track.name, this.state.albumArtist, this.state.albumImage)}} >Remove Fave                       
        </Button> : <Button variant='outline-light' size='sm' style={{fontSize: 10, marginLeft: 5}} onClick={()=>{this.addToFavorites(track.id, track.name, this.state.albumArtist, this.state.albumImage)}} >Add To Faves                        
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

    componentDidUpdate(prevProps, prevState){
      if(!this.props.user || (prevState.playlistsRecieved && prevState.playlistsRecieved === this.state.playlistsRecieved)){
        return
      }
      this.getAlbumData()
      this.getPlaylists()
      
    }
    
    async componentDidMount(){
      if(!this.props.user){
        return
      } 
        this.getPlaylists()
        this.getAlbumData()
    }
  render() {
    return (
        <>
        {this.state.playlistsRecieved ? this.displayAlbumInfo() : <div className='loading'>Loading...</div>}
        
        </>
    )
  }
}

export default Album