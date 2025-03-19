import { useNavigate } from 'react-router'
import './CardMovie.scss'

function CardMovie({movie}){
    const navigate = useNavigate()

    const navigateEdit =(id)=>{
        navigate(`/admin/editfilm/${id}`)
    }
    return(
        <div className='card'>
            <img onClick={() => navigateEdit(movie.id)} src={movie.imageUrl}/>
           <div className='cardContent'>
                <h4>{movie.name}</h4>
                <b>Year: {movie.year}</b>
                <p>Type: {movie.type}</p>
           </div>
        </div>
    )
}

export default CardMovie