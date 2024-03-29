import { Card, Button, Col, Row, Container, Figure } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import "./movie-view.scss";
import { useSelector } from "react-redux";


export const MovieView = () => {
    const { movieId } = useParams();
    const movies = useSelector((state) => state.movies.list)
    const movie = movies.find((m) => m._id === movieId);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies ? user.FavoriteMovies : []);
    const [isFavorite, setIsFavorite] = useState(false);



    const addFavoriteMovie = (event) => {
        event.preventDefault();
        fetch(`https://movie-dash.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                setFavoriteMovies(data.FavoriteMovies);

                localStorage.setItem("user", JSON.stringify(data))
                alert("Added to Favorite movies")
                window.location.reload();
            }).catch((error) => {
                console.log("error", error);
            })
    }

    const deleteFavoriteMovie = (event) => {
        event.preventDefault();
        fetch(`https://movie-dash.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                setFavoriteMovies(favoriteMovies.filter((favM) => favM !== movie._id));

                localStorage.setItem("user", JSON.stringify(data))
                alert("deleted from Favorite movies")
                window.location.reload();
            }).catch((error) => {
                console.log("error", error);
            })
    }
    const toggleMovie = () => {
        const favoriteMoviesValues = Object.values(favoriteMovies);
        favoriteMoviesValues.some(favM => favM === movie._id) ? setIsFavorite(true) : setFavoriteMovies(false);
    }

    useEffect(() => {
        toggleMovie();
    }, [])




    return (
        <Container >
            <Row>
                <Col>
                    <Figure>
                        <Figure.Image src={movie.ImagePath} alt="poster" width={350} />
                    </Figure>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text> Title: {movie.Title}</Card.Text>
                            <Card.Text>Description: {movie.Description}</Card.Text>
                            <Card.Text> Genre: {movie.Genre.Name}</Card.Text>
                            <Card.Text> Director: {movie.Directors.Name}</Card.Text>
                            <Link to={`/`}>
                                <Button variant="light"> Back </Button>
                                {!isFavorite &&
                                    <Button onClick={addFavoriteMovie} variant="success" >
                                        add to favorite
                                    </Button>}
                                {isFavorite &&
                                    <Button onClick={deleteFavoriteMovie} variant="danger" >
                                        Remove from Favorite
                                    </Button>
                                }
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}