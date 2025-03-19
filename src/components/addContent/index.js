import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddContent.scss";

function AddContent() {
  const [name, setName] = useState("");
  const [year, setYear] = useState();
  const [description, setDiscription] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState([]);
  const [typeID, setTypeID] = useState(1);
  const [film, setFilm] = useState([]);
  const [movieUrl, setMovieUrl] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/type`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setType(data));

    fetch(`http://localhost:8000/movies`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setFilm(data));
  }, []);

  const handleAdd = () => {
    if (name !== "" && year !== "" && description !== "") {
      const newId = film[film.length - 1].id + 1;
      const newTypeAdd = type.find((item) => item.id == typeID);
      const newTypeName = newTypeAdd.category;
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "wasp8ggh");
      data.append("cloud_name", "dwrjzyqnw");

      fetch("https://api.cloudinary.com/v1_1/dwrjzyqnw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const newMovie = {
            id: newId,
            name: name,
            year: year,
            type: newTypeName,
            typeID: typeID,
            score: "N/A",
            description: description,
            imageUrl: data.url,
            filmUrl: movieUrl
          };
          fetch(`http://localhost:8000/movies`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMovie),
          });
          navigate("/admin/dashboard");
          toast(`Add Film ${name} successfully`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast("Have Information Blank");
    }
  };

  const submitImage = () => {};

  return (
    <div className="addContent">
      <h1>Add New Film</h1>
      <div className="addCard">
        <div className="addDetail">
          <h5>Name: </h5>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Film Name..."
          />
        </div>
        <div className="addDetail">
          <h5>Year: </h5>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            placeholder="Enter  Year..."
          />
        </div>
        <div className="addDetail">
          <h5>Type: </h5>
          <select name="type" onChange={(e) => setTypeID(e.target.value)}>
            {type.map((t, index) => {
              return (
                <option value={t.id} key={index}>
                  {t.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="addDetail">
          <h5>Description: </h5>
          <input
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="Enter  Description..."
          />
        </div>
        <div className="addDetail">
          <h5>Image: </h5>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="addDetail">
          <h5>Movie Url: </h5>
          <input type="text" onChange={(e) => setMovieUrl(e.target.value)} />
        </div>
        <div className="addBtn">
          <Link to="/dashboard">
            <button>Back</button>
          </Link>
          <button onClick={handleAdd}>Add Film</button>
        </div>
      </div>
    </div>
  );
}
export default AddContent;
