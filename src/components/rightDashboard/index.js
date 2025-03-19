import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardMovie from "./CardMovie";
import "./RightDashboard.scss";

function RightDashboard() {
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/movies`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setMovie(data));
  }, []);
  return (
    <div className="content">
      <div className="rightDashboard">
        {movies.map((movie, index) => {
          return <CardMovie movie={movie} key={index} />;
        })}
        <div className="card">
          <Link to="/admin/addfilm">
            <img
              src="https://static.thenounproject.com/png/3322766-200.png"
              alt={`add film`}
            />
          </Link>
          <div className="cardContent">
            <h4 style={{ color: "#f9004d" }}>Add New Film</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightDashboard;
