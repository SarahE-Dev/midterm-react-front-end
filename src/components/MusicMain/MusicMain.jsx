import React, { Component } from 'react'
import './MusicMain.css'
import { Container, InputGroup, FormControl, Button, Card, Row, NavLink } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';



export class MusicMain extends Component {
  state = {
    textInput: '',
    access_token: this.props.access_token,
    searchAlbums: []
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
    const data = await axios.get(`https://api.spotify.com/v1/search?q=${this.state.textInput}&type=artist`, searchParameters)
    const artistID = data.data.artists.items[0].id;
    
    console.log(artistID);
    const albums = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
    console.log(albums);
    
    this.setState({
      searchAlbums: albums.data.items,
      textInput: ''
    })

  }

  
  
  render() {
    return (
      <div className='back'>
      <div className='MusicMain'>
        <Container>
          <InputGroup style={{margin: '5vw 15vw', width: '45vw'}}>
          <FormControl
          name='textInput'
          onChange={this.handleOnChange} 
          value={this.state.textInput}
          placeholder='Search for an Artist'
          ></FormControl>
          <Button onClick={this.handleOnSearch} variant='secondary' >Find Albums</Button>
          </InputGroup>
        </Container>
        <Container>
          <Row className='mx-2 row row-cols-4'>
          
            {this.state.searchAlbums.map((album, i)=>{
              return (
                <Link key={album.id} style={{textDecoration: 'none', color: 'black'}} to={{pathname:`/music/${album.id}`
         }}  >
                <Card style={{width: '15vw', height: '15vw', marginBottom: '5vh', borderRadius: 0}} key={album.id}>
            <Card.Img src={album.images[0].url}/>
            {/* <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body> */}
          </Card>
          </Link>
              )
            })}
          
          
          </Row>
          
        </Container>


      </div>
      </div>
    )
  }
}

export default MusicMain