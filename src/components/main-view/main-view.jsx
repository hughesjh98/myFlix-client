import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export function MainView() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetch("https://movie-dash.herokuapp.com/movies")
            .then((res) => res.json(movies))
            .then((data) => {
                const moviesFromApi = data.map((movie) =>{
                    return {
                        id:movie.key,
                        Title:movie.Title,
                        Description:movie.Description,
                        Genre: movie.Genre,
                        Directors:movie.Directors,
                        ImagePath:movie.ImagePath
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);


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
            <h2>Similar Movies</h2>
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
        </div>
    );
}

export default MainView



