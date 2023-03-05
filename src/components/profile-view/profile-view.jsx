import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UpdateProfile } from "./update-profile";
import { UserInfo } from "./user-info";

// import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user,  }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <Container>
            <Row className="mb-5">
                < UserInfo user={user} />
                < UpdateProfile storedToken={storedToken} storedUser={storedUser} />
            </Row>
            <Row>
                {/* <FavoriteMovies storedUser={storedUser} movies={movies}/> */}
            </Row>
        </Container>
    )
}