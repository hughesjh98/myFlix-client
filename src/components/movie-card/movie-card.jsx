import PropTypes from "prop-types"

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

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Directors: PropTypes.shape({
        Name:PropTypes.string
      }),
      Genre: PropTypes.shape({
        Name:PropTypes.string
      })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };