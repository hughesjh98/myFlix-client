export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img className="poster-img" src={movie.ImagePath} alt="poster" />
            </div>
            <div>
                <span>Title:</span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre:</span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director:</span>
                <span>{movie.Directors.Name}</span>
            </div>
            <div>
            <button onClick = {onBackClick}> Back </button>
            </div>
        </div>
    )
}