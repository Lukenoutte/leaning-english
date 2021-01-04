import React, { useContext, useState } from "react";
import "./styles/header_and_footer.css";
import { ReactComponent as MainIcon } from "../assets/icons/mainIcon.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/menuIcon.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logoutIcon.svg";
import { Link } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { Drawer } from "@material-ui/core";

export default function HeaderAndFooter(props) {
  const { authenticated, handleLogout } = useContext(Context);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawer = () => {
    if (drawerIsOpen) {
      setDrawerIsOpen(false);
    } else {
      setDrawerIsOpen(true);
    }
  };

  const MyDrawer = () => {
    return (<Drawer
      className="drawer"
      anchor={"top"}
      open={drawerIsOpen}
      onEscapeKeyDown={handleDrawer}
      onBackdropClick={handleDrawer}
    >
      <div className="icon-and-name-drawer">
        <MainIcon className="main-icon" /> <p>Surligner</p>
      </div>
      <Link to="/">Home</Link>
      {!authenticated ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/sign_up">Sign up</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </Drawer>);
  };

  return (
    <>
      <header className="shadow-light">
        <div className="center-container-header icon-and-name">
          <Link to="/">
            <MainIcon className="main-icon" /> Surligner
          </Link>

          <button className="drawer-button" onClick={handleDrawer}>
            <MenuIcon className="menu-icon" />
          </button>
          
          <MyDrawer/>

          {!authenticated ? (
            <div className="login-and-sign-up">
              <Link to="/login">Login</Link>
              <Link to="/sign_up">Sign Up</Link>
            </div>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              {" "}
              <LogoutIcon className="logout-icon" />{" "}
            </button>
          )}
        </div>
      </header>
      <main>{props.children}</main>
      <footer className="shadow-light">
        <p>
          Developed by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
            href="https://github.com/Lukenoutte"
          >
            @Lukenoutte
          </a>
        </p>
      </footer>
    </>
  );
}


