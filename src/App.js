import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';
import DisplayProduct from './components/DisplayProduct';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './components/Header';
import CartTable from './components/CartTable';
import DisplayProducts from './components/ProductTable';
import PaymentPage from './components/Payment';
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <div className="App">
      <ToastContainer/>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={<DisplayProducts />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/remove-product" element={<DisplayProduct />} />
    <Route path="/cart" element={<CartTable />} />
    <Route path="/payment" element={<PaymentPage/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
