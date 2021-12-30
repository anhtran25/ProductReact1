import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { read } from "../api/productAPI";

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
  const onSubmit = (data) => {
    props.onUpdate({ id, ...data });
  };
 
  const addProductForm = () => {
    return (
      < div className="contai">
      <form classname="mf" onSubmit={handleSubmit(onSubmit)} className="form-update">
        <h2>Cập nhật sản phẩm</h2>
        <div class="userName">
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label id="">Tên sản phẩm</Form.Label> 
        <input
          type="text"
          classname="userName"
          placeholder="Ten san pham"
          {...register("name", { required: true })}
          defaultValue={products.name}
        />
        {errors.name && <p>Bạn chưa nhập tên</p>}
        </Form.Group>
        </div>
        <div class="userName">
          
        <img  width={200} src={products.image}/>
        <input
          type="text"
          classname="image"
          placeholder="Ảnh san pham"
          {...register("image", { required: true })}
          defaultValue={products.image}
        />     
        {errors.image && <p>Bạn chưa chọn ảnh</p>}
        </div>
        <div class="userName">
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label>Giá sản phẩm</Form.Label> 
        <input
          type="number"
          classname="userName"
          placeholder="Gia san pham"
          {...register("price", { required: true })}
          defaultValue={products.price}
        />
        {errors.price && <p>Bạn chưa nhập giá</p>}
        </Form.Group>
        </div>
        
        <div class="userName">
        <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label id="">Thông tin sản phẩm</Form.Label>                  
        <textarea
        cols="30" rows="5"
          type="text"
          className="texta"
          placeholder="Thông tin san pham"
          {...register("desc", { required: true })}
          defaultValue={products.desc}
        />      
        {errors.name && <p>Bạn chưa thông tin</p>}
        </Form.Group>
        </div>

        <button >Cập nhật</button>
        <button onClick={() => navigate(-1)}>Quay lai</button>
      </form>
      </div>
    );
  };

  return <div>{addProductForm()}</div>;
};
export default EditProduct;
