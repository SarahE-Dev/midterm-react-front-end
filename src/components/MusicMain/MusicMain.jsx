import React, { Component } from 'react'
import './MusicMain.css'
import { Container, InputGroup, FormControl, Button, Card, Row, NavLink } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';









export class MusicMain extends Component {
  state = {
    textInput: '',
    access_token: localStorage.getItem('access_token'),
    searchAlbums: [],
    imageShow: true
  }

  handleOnChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSearch=async(e)=>{
    e.preventDefault()
    
    const searchParameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.access_token}`
      }
    }
    try {
      const data = await axios.get(`https://api.spotify.com/v1/search?q=${this.state.textInput}&type=artist`, searchParameters)
      const artistID = data.data.artists.items[0].id;
      console.log(data);
      const albums = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
      this.setState({
        searchAlbums: albums.data.items,
        textInput: '',
        imageShow: false
      })
    } catch (error) {
      console.log(error);
      // if(error.response.data.error.message == 'The access token expired'){
      //   this.props.getSpotifyToken()
      // }
    }
    
    
    
    
    
    
    
    

  }

  showImage=()=>{
    return (
      <div>
      <img
              style={{borderRadius: '20px'}}
              alt=""
              src="./images/Fyre.png"
              id='logo'
              height="120"
              className="d-inline-block align-top"
            />
        <ul style={{paddingTop: '7vh'}}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <li>Search for your Favorite Artists</li>
            <li>Pick Songs to add to your Favorites or Playlists</li>
            <li>Create and name your own Playlists</li>
            <li>Preview songs or play them on Spotify</li>
            <li>Now all of your favorite music is saved in one place</li>
            </div>
        </ul>
        </div>  
    )
  }
  
  render() {
    return (
      <div className='back'>
      
        <Container className='d-flex justify-content-center'>
          <InputGroup
          
          style={{ marginTop: '7vw', marginBottom: '5vw', width: '40vw'}}>
          <FormControl
          style={{backgroundColor: 'rgb(199, 20, 86)', color: 'white'}}
          name='textInput'
          onChange={this.handleOnChange} 
          value={this.state.textInput}
          placeholder='Search for an Artist'
          ></FormControl>
          <Button onClick={this.handleOnSearch} variant='outline-light' >Find Albums</Button>
          </InputGroup>
        </Container>
        <Container className='text-center'>{this.state.imageShow ? this.showImage() : ''}</Container>
        <Container style={{maxWidth: '80vw', paddingLeft: '2vw'}}>
          <Row className='mx-2 row row-cols-4'>
          
            {this.state.searchAlbums.map((album, i)=>{
              return (
                
                
                <Link key={album.id} style={{textDecoration: 'none', color: 'black'}} to={{pathname:`/music/${album.id}`
         }}  >
                <Card style={{width: '15vw', height: '15vw', marginBottom: '5vh', borderRadius: 5}} key={album.title}>
            <Card.Img className='z-0' src={album.images[1].url}/>
            
          </Card>
          </Link>
          
          
          
          
              )
            })}
          
          
          </Row>
          
        </Container>


      
      </div>
    )
  }
}

export default MusicMain