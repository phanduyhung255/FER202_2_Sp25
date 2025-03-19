import './Dashboard.scss'
import Header from "../../components/header"
import RightDashboard from "../../components/rightDashboard";
import LeftDashboard from "../../components/leftDashboard";

function Dashboard(){
    return (
      <div>
        <Header />
        <div className="containDashboard">
            <LeftDashboard />
            <RightDashboard />
        </div>
      </div>
    );
}

export default Dashboard