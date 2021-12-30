
import {useEffect, useState} from "react";
import ShowList from './ShowList';
import { list, remove } from "../api/productAPI";
import { Link } from "react-router-dom";
const IndexProduct = () => {
    const [products, setProducts] = useState([]);
  useEffect(() => {
    list().then((response) => setProducts(response.data));
  }, []);

  const onHandleRemove = (id) => {
    remove(id).then(() => {
      const newProducts = products.filter((item) => item.id !== id);
      setProducts(newProducts);
    });
  };
  
    return (
        <div className="AppAdmin">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
           
            
            <div className="collapse navbar-collapse" >
             
            <Link to={`add`}><button className="btn btn-danger">Thêm sản phẩm</button></Link>
            </div>
            
          </nav>
        </header>
        
        
        <main className="container">
          <h2 className="mt-4 mb-2">Danh sách</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price <span>(VND)</span></th>
                <th scope="col">Descition</th>
                <th scope="col"></th>
                
              </tr>
            </thead>
            <tbody>
              <ShowList products={products} onRemove={onHandleRemove}  />
            </tbody>
          </table>
        </main> 
      </div>
    )
}
export default IndexProduct;