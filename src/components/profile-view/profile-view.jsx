import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";
import { useParams } from "react-router";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import './profile-view.scss';



export const ProfileView = ({ user, token, onLoggedOut, movies }) => {
   // const [updatedUser, setUpdatedUser] = useState(false);
    const { movieId } = useParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"))
    console.log ("User profile view", storedUser);


    
    const favMovies = movies.filter((movie) => storedUser.FavoriteMovies.includes(movie.id));
    console.log ("Favorite movies view", favMovies); 


    // Updating user info
    const handleUpdate = (e) => {
    
      e.preventDefault(); 
      
      const data = {
        Username: username,
        Name: name,
        Password: password,
        Email: email,
        Birthday: birthday
      };

      console.log(data);

      fetch(`https://myflixapp.onrender.com/users/${storedUser.Username}`, {
          
          method: "PUT",
          
          headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify(data)

        }).then((response)=>response.json())
          .then((data)=> { 
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Your changes were saved. You will now be redirected to the login page.");
          localStorage.clear();
          window.location.reload();
          
        }).catch((e)=>{
        alert("Something went wrong.");
        console.log(e);
        })
    }; 
    
  
    // Deleting user info
    const handleDeregister = () => { 
    
        fetch(`https://myflixapp.onrender.com/users/${storedUser.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }).then((response) => {
           if (response.ok) {
            localStorage.clear();
            alert("Account successfully deleted.");
            <Navigate to="/signup" />
           }
            else {
            alert("There was an error deleting your account.")
            window.location.reload();
          }
        }).catch((e)=>{
          alert("Something went wrong.")
          window.location.reload();
          console.log(e);

      })
    };


  return (
    <Container >
      <Row>
        <Col xs={12} sm={4}>
          <Card style={{marginTop: 30, backgroundColor: "whitesmoke"}}>
            <Card.Body>
              <UserInfo username={storedUser.Username} email={storedUser.Email} handleDeregister={handleDeregister} /> 
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{marginTop: 30, backgroundColor: "whitesmoke", marginBottom: 30}}>
          <Card.Body>
              <Card.Title>Update Information</Card.Title>
              <Form className="w-100" onSubmit={handleUpdate}> 
              <Form.Group controlId="updateFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)} 
                  minLength="5" 
                  placeholder="Enter username (min 5 characters)"

                />
              </Form.Group>

              <Form.Group controlId="updatePassword">
                <Form.Label style={{ marginTop: 10 }} >Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Password"

                />
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label style={{ marginTop: 10 }} >Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="updateFormBirthday">
                <Form.Label style={{ marginTop: 10 }} >Birthday: </Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={event => setBirthday(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}} onClick={handleUpdate}>
                Save Changes
              </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>

      </Row>
      <>
        <Row>
          {favMovies.length === 0 ? ( 
          <h4> There are no movies in your favorites. </h4>
          ) : (
          <>  
            <h4>Favorite Movies</h4>
            {favMovies.map((movie)=>( 
              <Col xs={12} md={6} lg={3} key={movie.id} className="fav-movie">
                  <MovieCard 
                    movie = {movie}
                    />
              </Col>
            ))}              
          </>
          )}  
        </Row>
                
      </>
  </Container>
  );
};