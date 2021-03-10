import React, { useContext, useState } from "react";
import "./styles/header_and_footer.css";
import { ReactComponent as MainIcon } from "../../assets/icons/mainIcon.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menuIcon.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Drawer } from "@material-ui/core";

export default function HeaderAndFooter(props) {
  const { authenticated, handleLogout, waitingApiResponse } = useContext(
    AuthContext
  );
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawer = () => {
    if (drawerIsOpen) {
      setDrawerIsOpen(false);
    } else {
      setDrawerIsOpen(true);
    }
  };

  const MyDrawer = () => {
    return (
      <Drawer
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
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </Drawer>
    );
  };

  const LoginAndSignUp = () => {
    return (
      <div className="login-and-sign-up link-button-header">
        <Link to="/login">Login</Link>
        <Link to="/sign_up">Sign Up</Link>
      </div>
    );
  };

  const ProfileAndSignOut = () => {
    return (
      <div className="logout-and-profile link-button-header">
        <Link to="/profile">Profile</Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="g-shadow-light" data-testid="header">
        <div className="center-container-header icon-and-name">
          <Link to="/">
            <MainIcon className="main-icon" /> Surligner
          </Link>

          <button className="drawer-button" onClick={handleDrawer}>
            <MenuIcon className="menu-icon" />
          </button>

          <MyDrawer />

          {!waitingApiResponse?(!authenticated ? <LoginAndSignUp /> : <ProfileAndSignOut />):<></>}
        </div>
      </header>
      <main>{props.children}</main>
      <footer className="g-shadow-light" data-testid="footer">
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
