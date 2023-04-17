// Darkmode for creating visually appealing UI
import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
    // here we set a attribute to the body tag which we can access and set color accordingly
    const setDarkMode=()=>{
        document.querySelector("body").setAttribute('data-theme','dark')
    }
    const setLightMode=()=>{
        document.querySelector("body").setAttribute('data-theme','light')
    }
    const toggleTheme=e=>{
        if(e.target.checked) setDarkMode();
        else setLightMode()
    }
    // toggleTheme toggles b/w setDarkMode() to setLightmode();
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
