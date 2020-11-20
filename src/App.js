import React from "react";
import "./styles/global.css";
import MainTool from "./components/mainTool";
import "./styles/landing.css";
import { ReactComponent as MainIcon } from "./assets/icons/mainIcon.svg";

function App() {
    return(
      <>
      <header className="shadow-light">
      
        <div className="center-container-header icon-and-name">
          <a href="/">
          <MainIcon className="main-icon" /> Surligner
          </a>
        </div>
      </header>
      <main>
        <MainTool />
      </main>
      <footer className="shadow-light">
     
        <p>
          Desenvolvido por{' '}
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

export default App;
