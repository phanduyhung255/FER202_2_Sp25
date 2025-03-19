import "./Sidebar.scss";
import data from "../../json/type.json";
import React, { useEffect, useState } from "react";
import "./Sidebar.scss";

function Sidebar({ setType }) {
  const [category, setCategory] = useState(data);

  useEffect(() => {
    fetch(" http://localhost:8000/type", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((category) => setCategory(category));
  }, []);

  return (
    <div className="sideBar">
      <h2>Thể Loại</h2>
      <hr />

      <ul>
        <div className="categoryItems" onClick={() => setType("")}>
          <li>
            <span>Tất cả phim</span>
          </li>
        </div>
        {category?.map((item, index) => (
          <div className="categoryItems" onClick={() => setType(item.id)}>
            <li>
              <span>{item?.category}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
