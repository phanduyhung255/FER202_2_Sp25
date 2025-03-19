import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./LeftDashboard.scss";

function LeftDashboard() {
  const [type, setType] = useState([]);
  const [newType, setNewType] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8000/type`, {
      method: "GET",
    })
      .then((respon) => respon.json())
      .then((data) => setType(data));
  }, []);

  const handleAdd = () => {
    const newId = type[type.length - 1].id + 1;
    const addType = {
      id: newId,
      category: newType,
    };
    fetch(`http://localhost:8000/type`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addType),
    });

    setType([...type, addType]);
    setNewType("");
    setIsAdd(false);
    toast(`Thêm thể loại ${newType} thành công!!`)
  };

  const handleSet = () => {
    setIsAdd(!isAdd);
  };

  const navigateDashboard =()=>{
    navigate('/admin/dashboard')
  }
  const navigateUser = () => {
    navigate('/admin/user')
  }

  return (
    <div className="leftDashboard">
      <h3>
        <span>Dash</span>board
      </h3>
      <hr />
      <div>
        <h5>Thể loại</h5>
        <ul>
          {type.map((t, index) => {
            return <li key={index}>{t.category}</li>;
          })}
          {isAdd === true ? (
            <li>
              <input
                placeholder="Nhập tên thể loại..."
                onChange={(e) => setNewType(e.target.value)}
              />{" "}
              <button onClick={() => handleAdd()}>Add</button>
            </li>
          ) : (
            ""
          )}
          <li
            onClick={handleSet}
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#f9004d",
            }}
          >
            <p>
              Add Type <i class="fa-solid fa-plus"></i>
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h5 onClick={navigateDashboard}>Danh sách phim</h5>
      </div>
      <div>
        <h5 onClick={navigateUser}>Quản lí người dùng</h5>
      </div>
    </div>
  );
}
export default LeftDashboard;