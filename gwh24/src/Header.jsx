import './Header.css'
import flower from "./Flower.svg";
import calendar from "./calendar.jpg";


function Header() {
    return (
        <div class="navBar">
            <a href = ".\App.jsx" class="logo">Path to Bloom</a>
            <img src={flower} alt="" class= "flowerpic"/>
            <img src={calendar} alt="" class = "calendar" />
        </div>
    );
}

export default Header;