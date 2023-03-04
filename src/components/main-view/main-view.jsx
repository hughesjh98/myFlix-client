import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProfileView } from "../profile-view/profile-view";


export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);


    useEffect(() => {

        if (!token) {
            return;
        }

        fetch("https://movie-dash.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json(movies))
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null); localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center " >
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <h1>create an account</h1>
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
                                    <Col md={5}>
                                        <h1>login</h1>
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
                        path="/users/${Username}"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView user={user} movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/movies/:Title"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>loading list...</Col>

                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>

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
                                    <Col> loading list... </Col>

                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col key={movie.id} className="col-sm-12 col-sm-6 col-md-4 col-lg-3 g-4" md={3} >
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
    )
}








//     if (selectedMovie) {
// // // filters through the checkGenre function
// //         let similarMovies = movies.filter(checkGenre);
// // //function to check the genre and no duplicate the selected movie
// //         function checkGenre(movie) {
// //              if(movie.Genre.Name === selectedMovie.Genre.Name & movie.Title !== selectedMovie.Title){
// //                 return true;
// //             };
// //         };
//         return (
//             <>
//             <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
//             <br/>
//             <h2>You may also like</h2>
//             {
//                 similarMovies.length > 0  &&
//                 <div>
//                     {
//                         similarMovies.map((movie) => (
//                             <MovieCard 
//                             key={movie.id}
//                             movie={movie}
//                             onMovieClick ={(newSelectedMovie) => {
//                                 setSelectedMovie(newSelectedMovie);
//                             }}
//                             />
//                         )) 
//                         }
//                 </div>
//             }

//             {
//                 similarMovies.length === 0 && <div> no similar movies found.</div>
//             }
//             </>
//         );
//     }

//     if (movies.length === 0) {
//         return <div>this list is empty!</div>;
//     }

//     return (
//         <div>
//             {movies.map((movie) => (
//                 <MovieCard
//                     key={movie.id}
//                     movie={movie}
//                     onMovieClick={(newSelectedMovie) => {
//                         setSelectedMovie(newSelectedMovie);
//                     }} 
//                     />
//             ))}

<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}> logout</button>


export default MainView  
