import adminService from "../service/AdminService";
import ProductService from "../service/ProductService";
import "../css/AddProduct.css"

const { useState } = require("react");

function AddProduct() {

    let [newProduct, setNewProduct] = useState({
        "brandName": '',
        "modelName": ' ',
        "price": 0,
        "color":' ',
        "quantity" : 0,
    });

    // let [offer, setOffer] = useState({
    //     "discount": 0
    // });

    let [message, setMessage] = useState("");
    let [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(newProduct);
        // console.log(offer);
        // console.log({...newProduct,'offer':offer});

        adminService.addProduct(newProduct)
            .then(
                (resp) => {
                    console.log(resp);
                    setMessage("Product Added successfully");
                    setErrorMessage("");

                }
            )
            .catch(
                (err) => {
                    console.log(err);
                    setMessage("");
                    setErrorMessage("Could not add product.");
                }
            )
    };
    const handleProductChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setNewProduct({ ...newProduct, [name]: value });
    }
    // const handleDiscountChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     setOffer({ ...offer, [name]: value });

    // }

    const elementForm = (
        <>
         

            {
                message && <div className="alert alert-success">{message}</div>
            }

            {
                errorMessage && <div className="alert alert-danger">{errorMessage}</div>
            }
 <div class="container">
<form onSubmit={handleSubmit} class="form">
<h3 class='heading'> Add Product</h3>
<p>
Brand Name
<input type="text" name="brandName" value={newProduct.brandName} onChange={handleProductChange} required pattern="[a-zA-Z ]{3,}" title="Brand name should contain only letters and has a minimum of 3 characters"></input>
</p>
<p>
Model Name
<input type="text" name="modelName" value={newProduct.modelName} onChange={handleProductChange} required></input>
</p>
<p>
Price
<input type="text" name="price" value={newProduct.price} onChange={handleProductChange} required pattern="[0-9]+" title="Please enter a valid price"></input>
</p>
<p>
Color
<input type="text" name="color" value={newProduct.color} onChange={handleProductChange} required></input>
</p>
<p>
Quantity
<input type="text" name="quantity" value={newProduct.quantity} onChange={handleProductChange} required pattern="[0-9]+" title="Please enter a valid quantity"></input>
</p>
<button type="submit" class="register-btn">Add Product</button>
</form>
</div>

            {/* {newProduct.name}:{newProduct.price} */}

        </>
    );

    return (
        <>
            {elementForm}
        </>
    );

}

export default AddProduct;