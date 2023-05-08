import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NavBarMenue({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    //setAnchorEl(null);
    logout();
  };

  const handleClosemenue = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    //navigate("/login");
    navigate("/");
    navigate(0)
    //history.go(0)
  };

  return (
    <div className="row">
      
      <Avatar
        onClick={handleClick}
        src={user?.image?.image}
        sx={{ height: "55px", width: "55px" }}
      ></Avatar>
      <span className="black">{user.name}</span>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClosemenue}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        <MenuItem>Profile</MenuItem>
      </Menu>
    </div>
  );
}
