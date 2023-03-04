import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { Title } = useParams();

    const movie = movies.find((movie) => movie.Title === Title);
    return (
        <Card className="h-100">
            <Card.Img src={movie.ImagePath} alt="poster" />
            <Card.Body>
                <Card.Text> Title: {movie.Title}</Card.Text>
                <Card.Text>Description: {movie.Description}</Card.Text>
                <Card.Text> Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text> Director: {movie.Directors.Name}</Card.Text>
                <Link to={`/`}>
                    <Button variant="secondary"> Back </Button>
                </Link>
            </Card.Body>
        </Card>


    )
}