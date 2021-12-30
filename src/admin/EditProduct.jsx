import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { read } from "../api/productAPI";
import { toast } from 'react-toastify';
import UploadImage from "./UploadImage";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProduct = (props) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  let navigate = useNavigate();

  const { id } = useParams();
  const [products, setProduct] = useState({});
 
  useEffect(() => {
    read(id).then((response) => {
      setProduct(response.data);
      reset(response.data);
    });
  }, [id, reset]);
  // const onSubmit = (data) => {
  //   props.onUpdate({ id, ...data });
  // };
  const onSubmit = async (data) => {
 
    await UploadImage(data.image[0]).then((response) => {
        data.image = response.url;
    });
    props.onUpdate({ id, ...data });
   
};
  const mystyle = {
    color: "red",
  
    padding: "10px",
    fontFamily: "Arial"
  };
 
  const addProductForm = () => {
    return (
      < div className="container">
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="mb">
        <h2>Cập nhật sản phẩm</h2>
        <div class="mb-3">
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <label>Tên sản phẩm: </label> 
        <input
          type="text"
          classname="form-control"
          placeholder="Ten san pham"
          {...register("name", { required: true })}
          defaultValue={products.name}
        />
        {errors.name && <p style={mystyle}>Bạn chưa nhập tên</p>}
        </Form.Group>
        </div>
        <div class="mb-3">
          
        <img  width={200} src={products.image}/>
        <input
          type="file"
          classname="form-img"
          
          {...register("image", { required: true })}
          defaultValue={products.image}
        />     
        
        </div>
        <div class="mb-3">
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <label>Giá sản phẩm: </label> 
        <input
          type="number"
          classname="form-control"
          placeholder="Gia san pham"
          {...register("price", { required: true })}
          defaultValue={products.price}
        />
        {errors.price && <p style={mystyle}>Bạn chưa nhập giá</p>}
        </Form.Group>
        </div>
        
        <div class="mb-3">
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <label id="">Thông tin sản phẩm</label>                  
        <textarea
        cols="30" rows="5"
          type="text"
          className="form-control"
          placeholder="Thông tin san pham"
          {...register("desc", { required: true })}
          defaultValue={products.desc}
        />      
        {errors.desc && <p style={mystyle}>Bạn chưa thông tin sản phẩm</p>}
        </Form.Group>
        </div>

        <button >Cập nhật</button>
        <button onClick={() => navigate(-1)}>Quay lai</button>
        </div>
      </form>
      </div>
    );
  };

  return <div>{addProductForm()}</div>;
};
export default EditProduct;
