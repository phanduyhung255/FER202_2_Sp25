import { useParams } from 'react-router'
import EditDetail from '../../components/editDetail'
import Header from '../../components/header/index'
import LeftDashboard from '../../components/leftDashboard'
import './EditFilm.scss'

function EditFilm(){
    const  {id} = useParams()
    return(
        <div>
            <Header/>
           <div className='editContent'>
                <LeftDashboard/>
                <EditDetail id={id}/>
           </div>
        </div>
    )
}
export default EditFilm