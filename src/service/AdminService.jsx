import { axiosInstance } from "./Axios-http-client";
class AdminService {

    getAllProducts() {
        console.log("get all products");
        return axiosInstance.get('http://localhost:8091/getAllProducts');
    }

    deleteProductById(id){
        return axiosInstance.delete("http://localhost:8091/deleteProduct/"+id);
    }

    addProduct(newProduct){
        return axiosInstance.post('http://localhost:8091/AddProduct',newProduct);
    }
}
export default new AdminService();