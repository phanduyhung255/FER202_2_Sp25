import { useEffect, useState } from 'react'
import './UserContent.scss'
import UserCard from './UserCard'

function UserContent(){
    const [users, setUser] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8000/account`,{
            method: 'GET'
        })
        .then( response => response.json())
        .then(data => setUser(data))
    },[])

    return(
       <div className='userInfo'>
        <h1>Có {users.length} nguời dùng </h1>
        <hr/>
            <div className='content'>
                {users.map(user=> {
                    return(
                        <UserCard key={user.id} user={user}/>
                    )
                })}
            </div>
       </div>
    )
}

export default UserContent