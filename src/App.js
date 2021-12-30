import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import LayoutWebsite from "./layout/LayoutWebsite";
import "./index.css";
import IndexProduct from "./admin/IndexProduct";
import ProductsList from "./show/Product";
import ProductDetail from "./show/ProductDetail";
import EditProduct from "./admin/EditProduct";
import { create, list, update } from "./api/productAPI";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import  'react-toastify/dist/ReactToastify.css';
import AddProduct from "./admin/AddProduct";






export default function App() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    list().then((response) => setProducts(response.data));
  }, []);
  const onHandleUpdate = (product) => {

    update(product).then(() => {
      const newProduct = data.map(item => item.id === product.id ? product : item)
      toast.success("Đã cập nhật sản phẩm thành công");
      setData(newProduct);
    })
  };
  const onHandleAdd = (product) => {
    const fakeProduct = { ...product };
    console.log("Add thành công",fakeProduct);
    create(fakeProduct).then((response) =>{
      setProducts([...data, response.data])
    })
    
  };

  return (
    <div className="App">
       <ToastContainer/>
       <BrowserRouter>
       
        <Routes>
          
          <Route path="/" element={<LayoutWebsite />}>

            <Route
              path="products" element={<ProductsList />}
            />
            
            <Route path="products/:id" element={<ProductDetail/>} />
            
          </Route>                 
          <Route path="admin/*" element={<LayoutAdmin />}>
            <Route index element={<Navigate to="products" />} />
            <Route path="products" element={<IndexProduct />} />
            <Route path="products/add" element={<AddProduct onAdd={onHandleAdd} />}/>
            <Route
              path="products/:id/edit"
              element={<EditProduct onUpdate={onHandleUpdate}/>}
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
      
     
    </div>
  );
}