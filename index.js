import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./EditDetail.scss";

function EditDetail({ id }) {
  const [movie, setMovie] = useState();
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [newType, setNewType] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/movies`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const newId = parseInt(id);
        const newMovie = data.find((item) => item.id === newId);
        setMovie(newMovie);
        setNewType(newMovie?.typeID);
        setDescription(newMovie?.description);
      });

    fetch(`http://localhost:8000/type`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTypes(data));
  }, []);

  const handleEdit = () => {
    const newMovie = movie;
    newMovie.description = description;
    newMovie.typeID = parseInt(newType);
    const newTypes = types.find((item) => item.id == newType);
    newMovie.type = newTypes.category;
    console.log(newMovie);
    fetch(`http://localhost:8000/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    navigate("/admin/dashboard");
    toast(`Edit Film ${newMovie.name} successfully!!!`);
  };

  return (
    <div className="detailEdit">
      <div className="imageEdit">
        <img src={movie?.imageUrl} />
      </div>
      <div className="rightEdit">
        <h1>{movie?.name}</h1>
        <div className="typeEdit">
          <h5>Thể loại: </h5>
          <select
            name="type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            {types?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="typeEdit">
          <h5>Điểm Đánh giá: </h5>
          <p>{movie?.score}</p>
        </div>
        <div className="typeEditDescription">
          <h5>Mô tả: </h5>
          <textarea
            defaultValue={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="editBtn">
          <button onClick={() => handleEdit()}>Lưu Thay Đổi</button>
        </div>
      </div>
    </div>
  );
}

export default EditDetail;
