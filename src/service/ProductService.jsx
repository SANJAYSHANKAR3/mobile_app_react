import { axiosInstance } from "./Axios-http-client";

class ProductService {
    getAllProducts(page, limit) {
        return axiosInstance.get(`http://localhost:8091/get/product?page=${page}&limit=${limit}`);
    }

getAllCart() {
    console.log("1");
    return axiosInstance.get('http://localhost:8091/get/cartitems');
}
postCartItems = (cartData) => {
    return axiosInstance.post('http://localhost:8091/create/cart', cartData); 
}
deleteCartItem = (id) => {
    return axiosInstance.delete(`http://localhost:8091/remove/cartitem/${id}`);
}
increaseQuantityCart = (id) =>
{
    axiosInstance.patch(`http://localhost:8091/increase/quantity/${id}`);
}

decreaseQuantityCart =(id) =>{
    
    axiosInstance.patch(`http://localhost:8091/decrease/quantity/${id}`);
}

}
export default new ProductService;
