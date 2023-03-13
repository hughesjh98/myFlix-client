import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies ? user.FavoriteMovies: []);
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
                alert("Added to Favorite movies!")
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
                alert("deleted to Favorite movies!")
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
        <Card className="h-100">
            <Card.Img src={movie.ImagePath} alt="poster" />
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


    )
}