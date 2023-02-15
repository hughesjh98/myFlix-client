import { useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
    const [movies] = useState([
        {
            id: 1,
            Title: "Kill Bill",
            Image: "https://c8.alamy.com/comp/E5MG8G/kill-bill-vol-1-us-poster-art-uma-thurman-2003-miramax-courtesy-everett-E5MG8G.jpg",
            Description: "Kill Bill is the story of one retired assassins revenge against a man who tried to kill her while she was pregnant years prior. After being in a coma for four years Beatrix Kiddo is hungry for revenge against the man and his team of assassins and will stop at nothing to Kill Bill.",
            Genre: "action",
            Director: "Quentin Tarantino"
        },
        {
            id: 2,
            Title: "Pulp Fiction",
            Image: "https://wallpapercave.com/wp/wp7665395.jpg",
            Description: "In the realm of underworld a series of incidents intertwines the lives of two Los Angeles mobsters a gangster wife a boxer and two small-time criminals.",
            Genre: "action",
            Director: "Quentin Tarantino"
        },
        {
            id: 3,
            Title: "Reservoir Dogs",
            Image: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/512zetpdQjL.jpg",
            Description: "Six criminals hired to steal diamonds do not know each others true identity. While attempting the heist the police ambushes them leading them to believe that one of them is an undercover officer.",
            Genre: "action",
            Director: "Quentin Tarantino"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div>this list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};




