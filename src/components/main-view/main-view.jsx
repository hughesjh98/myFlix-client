import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import {LoginView} from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"


export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user,setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);



    useEffect(() => {

        if(!token) {
            return;
        }

        fetch("https://movie-dash.herokuapp.com/movies", {
        headers: {Authorization: `Bearer ${token}`} 
        })
            .then((res) => res.json(movies))
            .then((movies) => {
                setMovies(movies);
            });
    }, [token]);

        return (
            <Row className="justify-content-md-center" >
            {!user ? (
                
                <Col md={5}>
                    <h1>login</h1>
                < LoginView 
                onLoggedIn={ (user,token) => {
                    setUser(user);
                    setToken(token);
                    }}
                />
                <h3> don't have an account? create one!</h3>
                <SignupView/>
                </Col>

            ) : selectedMovie ? (
                <Col md={8}
                 style={{ border: "1px solid black" }}
                  >
                <MovieView 
                style={{ border: "1px solid green" }}
                movie={selectedMovie} 
                onBackClick={() => setSelectedMovie(null)} />
                </Col>

            ) : movies.length === 0 ? (
                <div>this list is empty!</div>

            ) :(
                <>
                    {movies.map((movie) => (
                        <Col key={movie.id} className="col-sm-12 col-sm-6 col-md-4 col-lg-3 g-4" md={3} >
                        <MovieCard
                        className="movie-card"
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                            }} 
                        />
                        </Col>
                    ))}
            <Button onClick = {() =>{ setUser(null); setToken(null); localStorage.clear(); }}> logout</Button>
                </>
               )
                }
        </Row>
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

<button onClick = {() =>{ setUser(null); setToken(null); localStorage.clear(); }}> logout</button>


export default MainView
            
