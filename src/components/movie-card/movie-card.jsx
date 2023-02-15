export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <div className="movie-title"
            onClick={ () => {
                onMovieClick(movie);
                }}
            >
                {movie.Title}
        </div>
    );
};