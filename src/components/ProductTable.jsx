import React, { useEffect, useState } from "react";
import productService from "../service/ProductService";
import "../css/Headers.css";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function ProductTable({ products}) {
  const onAddToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
try{
    if (productToAdd) {
      toast.success("Added to cart")
;        postCartItems(productToAdd);
        //navigate("/cart");
    } else {
        console.log("Product not found with ID:", productId);
    }
}catch(error){
    console.log("error",error);
}
};
const postCartItems = (cartData) => {
  productService.postCartItems(cartData)
      .then((response) => {
          console.log("Cart data posted successfully:", response);
      })
      .catch((error) => {
          console.log("Error posting cart data:", error);
      });
};
  return (
    <>
      <div className="products">
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
                <td>&#8377;{product.price}</td>
                <td>{product.color}</td>
                <td>
                <button
                                    className={`btn ${product.addedToCart ? "btn-golden" : "btn-primary"}`}
                                    onClick={() => onAddToCart(product.id)}
                                >
                                    {product.addedToCart ? "Added to Cart" : "Add to Cart"}
                                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function DisplayProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortType, setSortType] = useState("brandName");

  useEffect(() => {
    productService
      .getAllProducts()
      .then((resp) => {
        setAllProducts(resp.data);
        setTotalPages(Math.ceil(resp.data.length / productsPerPage));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (product) => {
    console.log("Product added to cart:", product);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredSortedProducts = () => {
    return allProducts
      .filter((product) =>
        product.brandName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        let comparison = 0;
        if (sortType === "price") {
          comparison = a[sortType] - b[sortType];
        } else {
          comparison = a[sortType].localeCompare(b[sortType]);
        }
        return sortOrder === "asc" ? comparison : -comparison;
      })
      .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  };

  const toggleSortOrder = () => {
    setSortOrder((currentOrder) => (currentOrder === "asc" ? "desc" : "asc"));
  };

  const toggleSortByPrice = () => {
    setSortType("price");
    toggleSortOrder(); // Use toggleSortOrder to ensure sortOrder is toggled
  };

  const toggleSortByName = () => {
    setSortType("brandName");
    toggleSortOrder(); // Ensure sortOrder is toggled when sorting by name
  };
  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by Brand Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="sorting-buttons">
        <button
          className="btn btn-primary"
          onClick={toggleSortByName}
        >
          Sort by Name {sortOrder === "asc" && sortType === "brandName" ? "↓" : "↑"}
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-primary"
          onClick={toggleSortByPrice}
        >
          Sort by Price {sortOrder === "asc" && sortType === "price" ? "↓" : "↑"}
        </button>
      </div>
      {filteredSortedProducts().length > 0 ? (
        <>
          <ProductTable products={filteredSortedProducts()}  />
          <div className="pagination-buttons d-flex justify-content-center mt-3">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-outline-primary mr-2"
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`btn ${currentPage === page + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-outline-primary ml-2"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-info" role="alert">
          No products found.
        </div>
      )}
    </div>
  );
  
       
   

    
}

export default DisplayProducts;
