import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";

export const NavigationBar = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const onLoggedOut = () => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.clear();
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" sticky="top" >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movie Dash
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto" >
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>

                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>

                                <Nav.Link as={Link} to="/users/${Username}">
                                    Profile
                                </Nav.Link>

                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>

                            </>

                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}