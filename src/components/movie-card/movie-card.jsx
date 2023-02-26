import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <Card onClick={ () => onMovieClick(movie)} className="h-100">
          <Card.Img variant ="top" src={movie.ImagePath} className="h-100"  />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Directors.Name}</Card.Text>
            <Button onClick={ () => onMovieClick(movie)} variant="primary">
              open
            </Button>
          </Card.Body>
      </Card>
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