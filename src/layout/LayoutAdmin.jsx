import "bootstrap/dist/css/bootstrap.min.css";
import { Link,Outlet } from "react-router-dom";
import { useState } from "react";


export default function AdminHeader() {
  const [acvtiveNav, setActiveNav] = useState(true);
  const newClass = acvtiveNav ? "sidebar open" : "sidebar";


 
  return (
    <div>
      <div className={newClass} >
        <div className="logo-details">
          <div className="logo_name">
            
          </div>
          <i className="bx bx-menu" id="btn" onClick={() =>  setActiveNav(!acvtiveNav)}></i>
        </div>
        <ul className="nav-list">
       
          <li>
            <Link to={"/admin/products"} >
              <i className='bx bxs-box'></i>
              <span className="links_name">Sản Phẩm</span>
            </Link>
            <span className="tooltip">Sản Phẩm</span>
          </li>
          
       
          
          
        </ul>
      </div>
      <section className="home-section">
        <Outlet />
      </section>
    </div>
  );
}