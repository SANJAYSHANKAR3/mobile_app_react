import { useEffect, useState } from "react";
import productService from "../service/ProductService";
import { useNavigate } from 'react-router-dom';
import PaymentPage from "./Payment";

const CartTable = () => {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
     const navigate = useNavigate();
    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        productService.getAllCart()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
            });
    };
    const handleIncreaseQuantity = async (id) => {
        const product = products.find((p) => p.id === id);
        if (product.quantity >= 5) { 
            setErrorMessage("Maximum quantity limit reached");
            return;
        }
        try {
            await productService.increaseQuantityCart(id);
            updateQuantity(id, 1); 
            setErrorMessage(""); 
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };
   

    const handleDecreaseQuantity = async (id) => {
        const product = products.find((p) => p.id === id);
        if (product.quantity <= 1) { 
            setErrorMessage("Minimum quantity limit reached");
            return;
        }
        try {
            await productService.decreaseQuantityCart(id);
            updateQuantity(id, -1);
            setErrorMessage(""); 
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    
    const updateQuantity = (id, change) => {
        const updatedProducts = products.map((product) => {
            if (product.id === id) {
                return { ...product, quantity: product.quantity + change };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

   
    const handleRemoveFromCart = (product) => {
        productService.deleteCartItem(product.id)
            .then(() => {
                const updatedProducts = products.filter((p) => p.id !== product.id);
                setProducts(updatedProducts);
                console.log("Product removed from cart:", product);
            })
            .catch((error) => {
                console.log("Error removing product from cart:", error);
            });
    };

  
    
    const totalPrice = products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    return (
        <div>
           <h1>Cart</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Model Name</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.brandName}</td>
                            <td>{product.modelName}</td>
                            <td>{product.price}</td>
                            <td>{product.color}</td>
                            <td>
                                
                            <button
                                    className="btn btn-primary"
                                    onClick={() => handleDecreaseQuantity(product.id)}
                                    disabled={product.quantity === 1}
                                >
                                    -
                                </button>
                                
                            {product.quantity}
                            <button
                                    className="btn btn-primary"
                                    onClick={() => handleIncreaseQuantity(product.id)}
                                    disabled={product.quantity === 5} 
                                    
                                >
                                    +
                                </button>
                                {product.quantity === 5 && <span className="text-danger">Quantity limit reached</span>}
                               


                       
                     </td>

                            <td>
                                <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product)}>
                                    remove
                                </button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            
            <div>
        <h4>Total Price: ₹{totalPrice}</h4>
    </div>
    
    <PaymentPage totalPrice={totalPrice}/>
        </div>
        
    );
};

export default CartTable;