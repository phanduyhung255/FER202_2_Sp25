import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./UserCard.scss";

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleActive = () => {
    const newUser = user;
    newUser.active = !user.active;
    fetch(`http://localhost:8000/account/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    navigate("/admin/user");
    
      user.active === true
        ? toast(`Active user ${user.name} successfully!!!`)
        : toast(`Inactive user ${user.name} successfully!!!`);
    
  };

  return (
    <div className="card">
      <img
        src={
          user.id % 2 === 1
            ? "https://i.pinimg.com/236x/13/19/e7/1319e7922faffbfa43034a816126b97d.jpg"
            : "https://i.pinimg.com/originals/91/00/7d/91007d0fe4e7ba58b213051e539dc70c.jpg"
        }
        alt={user.name}
      />
      <div className="cardContent">
        <h4>{user.name}</h4>
        <b>{user.email}</b>
        <p>Gender: {user.gender} </p>
        {user.active === true ? (
          <p onClick={handleActive} className="active">
            Active
          </p>
        ) : (
          <p onClick={handleActive} className="inactive">
            Inactive
          </p>
        )}
      </div>
    </div>
  );
}

export default UserCard;
