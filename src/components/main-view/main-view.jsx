import { useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ProfileView } from "../profile-view/profile-view";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { MovieList } from "../movies-list/movies-list";



export function MainView() {
    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user.user || JSON.parse(localStorage.getItem('user')));
    const token = useSelector((state) => state.token.token || localStorage.getItem('token'));

    const dispatch = useDispatch();

    useEffect(() => {

        if (!token) {
            return;
        }

        fetch("https://movie-dash.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((movies) => {
                dispatch(setMovies(movies));
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar />

            <Row className="justify-content-md-center " >
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <h1>create an account</h1>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <h1>Login</h1>
                                        <LoginView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/${Username}"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView user={user} movies={movies} token={token} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>loading list...</Col>

                                ) : (
                                    <MovieView />
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {
                                    !user ? <Navigate to="/login" replace /> : <MovieList />
                                }
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    )
}
export default MainView  
