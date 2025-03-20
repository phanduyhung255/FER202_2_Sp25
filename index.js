import "./Header.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";

function Header({ setSearch, search, setMovies }) {
  const { account, setAccount } = useContext(AccountContext);

  const clearSearch = () => {
    setSearch("");
    fetchMovies(); // Reset danh sách phim khi xóa tìm kiếm
  };

  const handleSearch = async () => {
    if (search.trim() === "") {
      toast.error("Please enter a valid search term!");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8000/movies?q=${search}`);
      setMovies(response.data);
      toast.success(`Searching for: ${search}`);
    } catch (error) {
      toast.error("Error fetching movies!");
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/movies");
      setMovies(response.data);
    } catch (error) {
      toast.error("Error fetching movies!");
    }
  };

  const pathname = window.location.pathname;

  return (
    <div className="contain">
      <div className="inner">
        <Link
          className="logo"
          style={{ textDecoration: "none", color: "black" }}
          to="/"
        >
          MY <span>FILM</span>
        </Link>
        <div className="search" style={{ display: pathname.includes('admin') ? 'none' : '' }}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search || ""}
            placeholder="Enter a Film ..."
          />
          <button className="clear" onClick={clearSearch}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <button className="searchbtn" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="actions">
          {!account ? "" : <b>Hello {account.name}</b>}
          {account?.role === 0 && (
            <Link
              className="action"
              style={{ textDecoration: "none" }}
              to="/admin/dashboard"
            >
              <b>Dashboard</b>
            </Link>
          )}
          <Link
            className="action"
            style={{ textDecoration: "none" }}
            to="/login"
          >
            {!account ? <b>Đăng Nhập</b> : ''}
          </Link>
          <Link
            className="action"
            style={{ textDecoration: "none" }}
            to="/login"
            onClick={() => {
              setAccount(null)
              toast('Log Out Successfully!!')
            }}
          >
            {!account ? '' : <b>Đăng Xuất</b>}
          </Link>
          {!account ? (
            <Link
              className="action"
              style={{ textDecoration: "none" }}
              to="/register"
            >
              <b>Đăng ký</b>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;