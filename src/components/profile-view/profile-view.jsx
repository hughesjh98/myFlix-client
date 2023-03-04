import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UpdateProfile } from "./update-profile";
// import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <Container>
            <Row className="mb-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Header> User Information</Card.Header>
                            <Card.Text> Name: {user.Name}</Card.Text>
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <UpdateProfile storedToken={storedToken} storedUser={storedUser}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                {/* <FavoriteMovies user={user} movies={movies}/> */}
            </Row>
        </Container>
    )
}