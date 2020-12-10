import React, {useContext} from "react";
import "../styles/header_and_footer.css";
import { ReactComponent as MainIcon } from "../assets/icons/mainIcon.svg";
import {Link} from 'react-router-dom';
import { Context } from "../context/AuthContext";

function HeaderAndFooter(props) { 
    const { authenticated } = useContext(Context);

    return(
      <>
      <header className="shadow-light">
      
        <div className="center-container-header icon-and-name">
          <Link to="/">
          <MainIcon className="main-icon" /> Surligner
          </Link>
          {!authenticated && (
          <div className="login-and-sign-up">
          <Link to="/login">Login</Link>
          <Link to="/sign_up">Sign Up</Link>
          </div>)
          }
        </div>
      </header>
      <main>
        {props.children}
      </main>
      <footer className="shadow-light">
     
        <p>
        Developed by{' '}
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
