import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
<<<<<<< Updated upstream
=======
import {LoginView} from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
>>>>>>> Stashed changes

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movie-dash.herokuapp.com/movies")
          .then((response) => response.json())
          .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
              return {
                id: doc.key,
                title: doc.title,
              };
            });
<<<<<<< Updated upstream
            setMovies(moviesFromApi);
          });
      }, []);
=======
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


>>>>>>> Stashed changes

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
            />
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
        </div>
    );
};

export default MainView



