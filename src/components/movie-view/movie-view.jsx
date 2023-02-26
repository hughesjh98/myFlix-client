import "./movie-view.scss"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

export const MovieView = ({movie, onBackClick}) => {
    return (
            <Card>
                <Card.Img src={movie.ImagePath} alt="poster" />
                <Card.Body>
                    <Card.Text> Title: {movie.Title}</Card.Text>
                    <Card.Text>Description: {movie.Description}</Card.Text>
                    <Card.Text> Genre: {movie.Genre.Name}</Card.Text>
                    <Card.Text> Director: {movie.Directors.Name}</Card.Text>
                    <Button variant="secondary" onClick = {onBackClick} > Back </Button>
                </Card.Body>
            </Card>
            
        
    )
}