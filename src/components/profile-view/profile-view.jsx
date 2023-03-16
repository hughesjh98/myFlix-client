import { Container, Row, Col } from "react-bootstrap";
import { UpdateProfile } from "./update-profile";
import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";



export const ProfileView = ({ user, movies }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    let favMovies = movies.filter(m => user.FavoriteMovies.includes(m._id))

    return (
        <Container>
            <Row className="mb-5">
                < UserInfo user={user} />
                < UpdateProfile storedToken={storedToken} storedUser={storedUser} />
            </Row>
            <Row>
                <h2 className="my-3 my-md-5">Favorite Movies </h2>
                {favMovies.map((movie) => (
                    <Col md={6} lg={4} key={movie._id} className="mb-3">
                        <MovieCard movies={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}