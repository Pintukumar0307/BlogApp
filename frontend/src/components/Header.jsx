import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from "../redux/store"

const Header = () => {
  // global stat
  const navigate = useNavigate();
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();

  // state
  const [value, setValue] = useState(0); // Initialize the value state with 0

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("logout Successfully");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4" >BLOG..</Typography>
          <Box display={"flex"} marginLeft="auto">
            {isLogin && (
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="MY Blogs" component={Link} to="/myblogs" />
                <Tab label="Create Blog" component={Link} to="/createblog" />
              </Tabs>
            )}
          </Box>
          <Box display={"flex"} >
            {!isLogin && (<>
              <Button
                sx={{ margin: 1, color: "white" }}
                component={Link} to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ margin: 1, color: "white" }}
                component={Link} to="/register"
              >
                Register
              </Button>
            </>)}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>Logout</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

