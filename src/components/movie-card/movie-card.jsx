import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movies }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movies.ImagePath} className="h-100" />
      <Card.Body>
        <Card.Title>{movies.Title}</Card.Title>
        <Card.Text>{movies.Directors.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movies._id)}`}>
          <Button variant="info"> details </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Directors: PropTypes.shape({
      Name: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string
    })
  }).isRequired
};