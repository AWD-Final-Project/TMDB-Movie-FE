import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AppIcon from "../../assets/app_icon.svg";
import axiosClient from "../../configs/axios";
import { RiChatAiLine } from "react-icons/ri";
import { useApp } from "../../contexts/AppContext";
import classNames from "classnames";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { setIsOpenAIChat, isOpenAIChat } = useApp();

  const handleLogout = async () => {
    axiosClient.get("/user/logout");
    logout();
  };

  return (
    <AppBar
      className={classNames("items-center bg-[#032541]", {
        "w-[calc(100%-400px)] left-0": isOpenAIChat,
      })}
    >
      <Toolbar className="max-w-[1200px] w-full ">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ textAlign: "left" }}
        >
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
            className="block w-fit"
          >
            <img src={AppIcon} alt="App Icon" width={140} />
          </Link>
        </Typography>
        <Box>
          <Button
            endIcon={<RiChatAiLine />}
            onClick={() => setIsOpenAIChat(!isOpenAIChat)}
          ></Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                className="normal-case"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                className="normal-case"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
