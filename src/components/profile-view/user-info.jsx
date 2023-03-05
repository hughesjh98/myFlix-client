import { Col, Card } from "react-bootstrap";

export const UserInfo = ({ user }) => {
    return (
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
    );
};