import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    
    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    } 
    
    useEffect(() => {
        if (!token) return;
        
        fetch("https://myflixapp.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(resonse => resonse.json())
    .then(movies => {
        const moviesFromAPI = movies.map(movie => {
            return {
                id: movie._id,
                title: movie.title,
                description: movie.description,
                genre: movie.genre.name,
                director: movie.director.name,
                image: movie.imageurl
            };
        });
        setMovies(moviesFromAPI);
    });
}, [token]);

return (
    <BrowserRouter>
    <NavigationBar
    user={user}
    onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }}
    />
    <Row className="justify-content-center">
    <Routes>
    <Route
    path="/signup"
    element={
        <>
        {user ? (
            <Navigate to="/" />
            ) : (
                <Col md={6}>
                <SignupView />
                </Col>
                )}
                </>
            }                    
            />
            <Route
            path="/login"
            element={
                <>
                {user ? (
                    <Navigate to="/" />
                    ) : (
                        <Col md={6}>
                        <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                        />
                        </Col>
                        )}
                        </>
                    }
                    />
                    <Route
                    path="/profile"
                    element={
                        !user ? (
                            <Navigate to="/login" replace />
                            ) : (
                                <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                }} updateUser={updateUser}/>
                                )
                            }
                            />
                            <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? ( 
                                        <Col>No movies found.</Col>
                                        ) : (
                                            <MovieView movies={movies} user={user} token={token} updateUser={updateUser}/>
                                            )}
                                            </>
                                        }
                                        />
                                        <Route
                                        path="/"
                                        element={
                                            <>
                                            {!user ? (
                                                <Navigate to="/login" replace />
                                                ) : movies.length === 0 ? ( 
                                                    <Col>No movies found.</Col>
                                                    ) : (
                                                        <>
                                                        {movies.map(movie => (
                                                            <Col className="mb-4" key={movie.id}>
                                                            <MovieCard movie={movie} />
                                                            </Col>
                                                            ))}
                                                            </>
                                                            )}
                                                            </>
                                                        }
                                                        />
                                                        </Routes>
                                                        </Row>
                                                        </BrowserRouter>
                                                        );
                                                    };