import React from 'react';
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import { list } from "../api/productAPI";



const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    list().then((response) => setProducts(response.data));
  }, []);

  function formatCash(str) {
    str = `${str}`;
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}


  return(
    
    <div className="related_products row">
      <div className="a">
        <h4>Tất cả sản phẩm</h4>
      </div>
                    {
                        products.map((data,index) => {
                            return (
                                <div className="product-item col-lg-3 col-md-2" key={index}>
                                <div className="card">
                                <img width={200} height={150} className="img" src={data.image}/>
                                <div className="card-body">
                                  <h5 className="card-title"><Link to={"/products/"+data.id}>{data.name}</Link></h5>
                                  <p className="card-text">Price: {formatCash(data.price)} <span> đ</span></p>                           
                                </div>
                                </div>
                               </div>
                            );
                        })
                        
                    }
                </div>
          
        
      
  )
}

export default ProductsList;



