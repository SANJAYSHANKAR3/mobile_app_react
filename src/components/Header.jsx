import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Headers.css";

const Header = () => {
    const navigate = useNavigate();

    const handleAddProductClick = () => {
        navigate('/add-product'); // Navigate to the 'add-product' page
    };

    const handleRemoveProductClick = () => {
        navigate('/remove-product'); // Navigate to the 'remove-product' page
    };

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to the 'cart' page
    };

    return (
        <header className="header-container">
            <h1 className="header-title">Online Mobile Store</h1>
            <div className="button-container">
                <button className="btn btn-success" onClick={handleAddProductClick}>Add Product</button>
                <button className="btn btn-danger" onClick={handleRemoveProductClick}>Remove Product</button>
                <button className="btn btn-primary" onClick={handleCartClick}>Cart</button>
            </div>
        </header>
    );
}

export default Header;
