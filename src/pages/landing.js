import React from 'react';
import MainTool from '../components/mainTool';
import '../styles/landing.css';

export default function Landing(){
    return(<div>
            <header> <div className="center-container-header">Learning english</div></header>
            <main>
                <MainTool/>
            </main>
            <footer> Copyright 2020</footer>
         </div>);
}