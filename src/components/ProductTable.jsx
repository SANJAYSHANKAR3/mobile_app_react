import { useEffect, useState } from "react";
import productService from "../service/ProductService";

function ProductTable({ products, onAddToCart }) {
    return (
        <>
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Model Name</th>
                        <th>Price</th>
                        <th>Color</th>
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
                                <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function DisplayProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () =>
        productService
            .getAllProducts()
            .then((resp) => {
                setProducts(resp.data);
            })
            .catch((err) => console.log(err));

    const handleAddToCart = (product) => {
        // Implement the logic to add the product to the cart
        console.log("Product added to cart:", product);
    };

    return (
        <>
            {products.length > 0 ? (
                <ProductTable products={products} onAddToCart={handleAddToCart} />
            ) : (
                <h3>No Products to Display.</h3>
            )}
        </>
    );
}

export default DisplayProducts;
