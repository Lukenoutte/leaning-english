import React from 'react';
import MainTool from '../components/mainTool';
import '../styles/landing.css';

export default function Landing(){
    return(<>
            <header className="shadow-light"> <div className="center-container-header">Learning english</div></header>
            <main>
                <MainTool/>
            </main>
            <footer className="shadow-light"> Desenvolvido por @Lukenoutte</footer>
         </>);
}