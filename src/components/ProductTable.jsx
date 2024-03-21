import { useEffect, useState } from "react";
import productService from "../service/ProductService";
import "../css/Headers.css"; // Import the CSS file

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
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortType, setSortType] = useState("brandName"); // Default sorting type

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
        console.log("Product added to cart:", product);
    };

    const filteredProducts = products.filter((product) =>
        product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        
        if (sortType === "price") {
        if (sortOrder === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    } else {
        const nameA = a[sortType].toUpperCase();
        const nameB = b[sortType].toUpperCase();
        return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
});
    

    const handleSortByType = (type,order) => {
        setSortType(type);
        setSortOrder(order);
    };

    return (
        <>
            <div className="container mt-4">
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Search by Brand Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="mb-4">
                    <button className="sort-button mr-2" onClick={() => setSortOrder("asc")}>
                        Sort by Name Asc
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="sort-button" onClick={() => setSortOrder("desc")}>
                        Sort by Name Desc
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;
                   
                    <button className="sort-button mr-2" onClick={() => handleSortByType("price", "asc")}>
                   Sort by Price Asc
                  </button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className="sort-button" onClick={() => handleSortByType("price", "desc")}>
                  Sort by Price Desc
                 </button>
                </div>
                {sortedProducts.length > 0 ? (
                    <ProductTable products={sortedProducts} onAddToCart={handleAddToCart} />
                ) : (
                    <h3>No Products to Display.</h3>
                )}
            </div>
        </>
    );
}

export default DisplayProducts;
