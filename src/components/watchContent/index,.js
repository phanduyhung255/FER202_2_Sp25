import { useState } from "react";
import { useNavigate } from "react-router";
import "./WatchContent.scss";

function WatchContent({ id }) {
  const [movieUrl, setMovieUrl] = useState();
  const [name, setName] = useState("");
  const navigate = useNavigate()

  fetch(`http://localhost:8000/movies`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const newId = parseInt(id);
      const newFilm = data.find((item) => item.id === newId);
      setMovieUrl(newFilm.filmUrl);
      setName(newFilm.name);
    });

    const handleBack = (id  ) => {
        navigate(`/moviedetail/${id}`);
    }

  return (
      <div className="watchMovie">
        <div className="filmContent">
          <h2>{name}</h2>
          <iframe
            width="640"
            height="360px"
            src={movieUrl}
            frameborder="0"
            scrolling="0"
            allowfullscreen
          ></iframe>
          <h3 onClick={() => handleBack(id)}>Click Here To Back to Movie Detail</h3>
        </div>
      </div>
  );
}

export default WatchContent;
