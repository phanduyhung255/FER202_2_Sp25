import './Content.scss'
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

function Content({ type, search }) {
    const [movies, setMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/movies', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(movies => {
                setMovies(movies);
                setSearchMovie(movies);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    useEffect(() => {
        if (type !== undefined) {
            if (type === '') {
                setSearchMovie([...movies]);
            } else {
                const filterMovies = movies.filter(
                    (movie) => movie.typeID == type
                );
                setSearchMovie(filterMovies);
            }
        }
    }, [type, movies]);

    useEffect(() => {
        if (search !== undefined) {
            const filterMovies = movies.filter((movie) =>
                movie.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchMovie(filterMovies);
        }
    }, [search, movies]);

    const redirectPage = (id) => {
        navigate(`/moviedetail/${id}`)
    }

    return (
        <div className='content'>
            <div className='rightDashboard'>
                {
                    searchMovie?.map((item, index) => (
                        <div className='card' onClick={() => redirectPage(item.id)} key={index}>
                            <img src={item.imageUrl} alt={item.name} />
                            <div className='cardContent'>
                                <h4>{item.name}</h4>
                                <b>Year: {item.year}</b>
                                <p>Type: {item.type}</p>
                                <p>Score: {item.score}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Content;