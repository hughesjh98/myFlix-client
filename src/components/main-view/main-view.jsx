import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import {LoginView} from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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

    if(!user){
        return (
            <>
        < LoginView 
        onLoggedIn={ (user,token) => {
            setUser(user);
            setToken(token);
            }}
        />
        or 
        <SignupView/>
        </>
        );
    }

    if (selectedMovie) {
// filters through the checkGenre function
        let similarMovies = movies.filter(checkGenre);
//function to check the genre and no duplicate the selected movie
        function checkGenre(movie) {
             if(movie.Genre.Name === selectedMovie.Genre.Name & movie.Title !== selectedMovie.Title){
                return true;
            };
        };
        return (
            <>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <br/>
            <h2>You may also like</h2>
            {
                similarMovies.length > 0  &&
                <div>
                    {
                        similarMovies.map((movie) => (
                            <MovieCard 
                            key={movie.id}
                            movie={movie}
                            onMovieClick ={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                            />
                        )) 
                        }
                </div>
            }

            {
                similarMovies.length === 0 && <div> no similar movies found.</div>
            }
            </>
        );
    }

    if (movies.length === 0) {
        return <div>this list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} 
                    />
            ))}

<button onClick = {() =>{ setUser(null); setToken(null); localStorage.clear(); }}> logout</button>
        </div>
    );
}

export default MainView



