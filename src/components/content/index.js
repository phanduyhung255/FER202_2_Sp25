import './Content.scss'
import data from "../../json/movie.json"
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, userParms } from 'react-router-dom'
import CardMovie from '../rightDashboard/CardMovie';


function Content({ type, search }) {
    const [movies, setMovie] = useState(data);
    const navigate = useNavigate();
    const [searchMovie, setSearchMovie] = useState(movies);

    useEffect(() => {
        fetch('http://localhost:8000/movies', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(movies => setMovie(movies))
		
    },[])

    useEffect(() => {
        setSearchMovie(movies)
    }, [movies])


    useEffect(() => {
        if(type !== undefined){
            if(type === ''){
                setSearchMovie([...movies]);
            }else{
                const filterMovies = movies.filter(
                  (movie) => movie.typeID == type
                );
                setSearchMovie(filterMovies);
            }
        }
    }, [type])

	useEffect(() => {
		if(search !== undefined){
            const filterMovies =  movies.filter((movie) => movie.name.includes(search));
            setSearchMovie(filterMovies);
        }
	}, [search])

    const redirectPage = (id) => {
        navigate(`/moviedetail/${id}`)
    }


    return (
        <div className='content'>
            <div className='rightDashboard'>
                {

                    searchMovie?.map((item, index) => (
                        <div className='card' onClick={() => redirectPage(item.id)} key={index}>
                            <img src={item.imageUrl} />
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