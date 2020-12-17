import React, { useContext, useState } from "react";
import "../styles/header_and_footer.css";
import { ReactComponent as MainIcon } from "../assets/icons/mainIcon.svg";
import { Link } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { Drawer } from "@material-ui/core";


function HeaderAndFooter(props) {
  const { authenticated, handleLogout } = useContext(Context);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);


  const handleDrawer = () => {
    if (drawerIsOpen) {
      setDrawerIsOpen(false);
    } else {
      setDrawerIsOpen(true);
    }
  };

  return (
    <>
      <header className="shadow-light">
        <div className="center-container-header icon-and-name">
          <Link to="/">
            <MainIcon className="main-icon" /> Surligner
          </Link>

          <button
            onClick={handleDrawer}
          >
            Drawer
          </button>
          
          <Drawer
            anchor={"top"}
            open={drawerIsOpen}
            onEscapeKeyDown={handleDrawer}
            onBackdropClick={handleDrawer}
          >
            <a href="/">aaaa</a>
            <a href="/">aaaa</a>
            <a href="/">aaaa</a>
            <a href="/">aaaa</a>
          </Drawer>
       
          {!authenticated ? (
            <div className="login-and-sign-up">
              <Link to="/login">Login</Link>
              <Link to="/sign_up">Sign Up</Link>
            </div>
          ) : (
            <button onClick={handleLogout}> Logout </button>
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

export default HeaderAndFooter;
