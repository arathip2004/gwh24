import './Header.css'
import flower from "./Flower.svg";

function Header() {
    return (
        <div class="navBar">
            <a href = ".\App.jsx" class="logo">Path to Bloom</a>
            <img src={flower} alt="" />
        </div>
    );
}

export default Header;