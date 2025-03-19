import React from "react";
import Header from "../../components/header";
import LeftDashboard from "../../components/leftDashboard";
import UserContent from "../../components/userContent";

function UserManagment(){
    return(
       <React.Fragment>
            <Header/>
           <div style={{display: 'flex'}}>
                <LeftDashboard/>
                <UserContent/>
           </div>
       </React.Fragment>
    )
}

export default UserManagment