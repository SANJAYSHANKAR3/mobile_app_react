import { useEffect, useState } from "react";
import adminService from "../service/AdminService";
import "../css/AddProduct.css"
function ProductTable({ products, onDeleteProduct }) {

    return (

        <>
           <div class='displayProducts'> 
            <table className="table table-striped">
            
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Brand Name</th>
                        <th>Model Name</th>
                        <th>Price</th>
                        <th>Color</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.brandName}</td>
                                <td>{product.modelName}</td>
                                <td>{product.price}</td>
                                <td>{product.color}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick={() => onDeleteProduct(product.id)} className="btn btn-danger"> Delete </button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            </div>
        </>
    );
}



function DisplayProducts() {

    const [products, setProducts] = useState([])

    useEffect(
        () => { //Runs only on the first render
            console.log("useEffect call back");
            loadAllProducts();
        }, []);

    const loadAllProducts = () =>
        adminService.getAllProducts()
            .then(
                (resp) => {
                    console.log(resp.data)
                    setProducts(resp.data);
                    console.log(products); // prints previous state i.e current snapshot
                }
            )
            .catch(
                (err) => console.log(err)
            )
            .finally(
                () => console.log("Server completed sending data.")
            );

    const handleDeleteProduct = (id) => {
        console.log(id);
        adminService.deleteProductById(id)
            .then(
                (resp) => {
                    console.log(resp);
                    setProducts(products.filter((p) => p.id != id));
                }
            )
            .catch(
                (err) => {

                    console.log(err);
                }
            );

    }
    return (
        <>

            {products.length > 0 ?
                <ProductTable products={products} onDeleteProduct={handleDeleteProduct} />
                : <h3>No Products to Display.</h3>}
        </>
    )
}

export default DisplayProducts;