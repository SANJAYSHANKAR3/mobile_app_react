import React from 'react';
import "../css/Headers.css";
const Header = () => {
    return (
        <header>
        <h1>Online Mobile Store</h1>
    <div class="right-corner">
    <nav>
        <button  class="register-btn">Login</button>
    <button  class="register-btn">Register</button>
    </nav>
    </div>
    </header>
    );
}

export default Header;
