
import { Link } from "react-router-dom";

const ShowList = ({products, onRemove}) => {

    

    return(
        products.map(data => {
            return (
                <tr >
                    <th scope="row">{data.id}</th>
                    <td><h5>{data.name}</h5></td>
                    <td><img width={200} height={200} src={data.image}/></td>
                    <td><h5>{data.price}</h5></td>
                    <td>{data.desc}</td>
                    <td><Link to={`${data.id}/edit`}><button className="btn btn-danger">Edit</button></Link></td>                   
                    <td><button onClick={() => onRemove(data.id)} type="button" className="btn btn-danger" >Xóa</button></td>
                </tr>
            )
        })
    )
}

export default ShowList;