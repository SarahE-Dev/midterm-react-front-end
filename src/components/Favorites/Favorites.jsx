import React, { Component } from 'react'
import './Favorites.css'
import Axios from '../../utils/Axios'
import { Card, Container, ListGroup, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class Favorites extends Component {
  state={
    favoriteAlbums: [],
    favoriteSongs: [],
    favoritesRecieved: false
  }
  getFavorites=async()=>{
    try {
      const user = await Axios.get(`/api/user/get-user-by-id/${this.props.user.id}`)
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
        <Container>
          <Row className='mx-4 row row-cols-4'>
        {
          this.state.favoriteSongs.map((song, i)=>{
            return (
              <Card key={`${song.songID}${i}`} style={{margin: 45, border: '1px solid white', padding: 20, width: '12rem'}}  className='text-center bg-black text-white card'>
                <Card.Img variant='top' src={song.songImage} />
                <Card.Body>
                  <Link style={{textDecoration: 'none', color: 'white'}} to={`/song/${song.songID}`}>
                  <Card.Title className='titleHover'   key={song.songID}>{song.songTitle}</Card.Title>
                  </Link>
                  
                </Card.Body>
                <Card.Footer>
                  <Card.Subtitle style={{color: 'purple'}}>{song.songArtist}</Card.Subtitle>
                </Card.Footer>
            
            
              </Card>
            )
          })
        }
          </Row>
        </Container>
      </div>
    )
  }
}

export default Favorites