import React  from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import UploadImage from "./UploadImage";


const AddProduct = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  let navigate = useNavigate();

  const onSubmit = async (data) => {
 
        await UploadImage(data.image[0]).then((response) => {
            data.image = response.url;
        });
        props.onAdd(data);
        toast.success("Tạo sản phẩm thành công !",{
            onClose: () => navigate("/admin/products/", { replace: true }),
            autoClose: 1500
        });
  };
    

  const addProductForm = () => {
    return (
      <form classname="mf"  onSubmit={handleSubmit(onSubmit)}>
        <h2>Thêm sản phẩm</h2>
        <div class="userName">
        <input
          type="text" placeholder="Ten san pham" className="name"
          {...register("name", { required: true })}
        />
        {errors.name && <p>Chưa nhập tên sản phẩm</p>}
        
        </div>

        <div class="userName">
        <input
          type="file" className="imge" placeholder="ảnh san pham" 
          {...register("image", { required: true })}
        />
        {errors.image && <p>Chưa chọn ảnh </p>}
        </div>

        <div class="userName">
        <input
          type="number"
          placeholder="Gia san pham" classname="price"
          {...register("price", { required: true })}
        />
        {errors.price && <p>Chưa nhập giá sản phẩm</p>}
        </div>

        
        <div class="userName">
        <textarea cols="30" rows="5" placeholder="Thông tin sản phẩm" className="desc" {...register("desc", { required: true })} ></textarea>
        {errors.desc && <p>Chưa nhập thông tin sản phẩm</p>}
        </div>
        <button className="butAdd">Thêm sản phẩm</button>
      </form>
    );
  };

  return <div>{addProductForm()}</div>;
};
export default AddProduct;
