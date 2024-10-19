import './Header.css'
import flower from "./Flower.svg";
import calendar from "./calendar.jpg";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <div class="navBar">
            <a href = ".\App.jsx" class="logo">Path to Bloom</a>
            <img src={flower} alt="" class= "flowerpic"/>
            <NavLink to = "/calendar"><img src={calendar} alt="" class = "calendar" /></NavLink>
        </div>
    );
}

export default Header;