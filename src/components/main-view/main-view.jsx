import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export function MainView() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://movie-dash.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.movies.map((movie) => {
                    return {
                        Title: movie.Title
                    };
            });
            setMovies(moviesFromApi)
        });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);




    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
                    } } />
            ))}
        </div>
    );
}

export default MainView



