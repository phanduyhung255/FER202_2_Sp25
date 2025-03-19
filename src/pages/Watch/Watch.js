import WatchContent from "../../components/watchContent/index,";
import Header from "../../components/header";
import { useParams } from "react-router";

function Watch(){
    const {id} = useParams()

    return(
        <div>
            <Header/>
            <WatchContent id={id}/>
        </div>
    )
}

export default Watch