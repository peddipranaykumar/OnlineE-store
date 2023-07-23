import { Container } from "react-bootstrap"
import { useEffect, useState } from "react";
import './Orders.css'
import axios from "axios";
import '../Admin/Admin.css'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Orders = () => {

  
	const navigate = useNavigate();
	let uname = { username: Cookies.get('name') };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("http://localhost:5000/cart/getorder", uname)
      setProducts(result.data.payload)
    }
    fetchData();
  }, [])

  const view = (product) => {
    navigate(`/product/${product.pid}`)
  }

  const remove = (product) => {
    let prodpid = product.pid;
    console.log(prodpid)
    axios
      .delete(`http://localhost:5000/cart/remove-from-cart/${prodpid}`)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Can't remove product");
      });
    window.location.reload()
  };


  return (
    <Container >
      <h1 className="my-3">Your orders</h1>
      {
        products.map((product) => (
          <div className="bg-light order m-5 p-3 row" style={{ height: '250px' }}>
            <img className="col-sm-3 h-100" src={product.imgurl} alt="" />
            <div className="col-sm-6 bg-light text-start p-3">
              <h3>{product.productname}</h3>
              <h5 className="pt-2">₹{product.price}</h5>
              <div className="status mt-4">
                <h6 className="fw-bolder">Shipped</h6>
                <h6 className="fw-normal" >Will be delivered soon</h6>
              </div>
            </div>
            <div className="col-sm-3 bg-light py-5">

              <button className="obut fw-bold" type="button" onClick={() => view(product)} >
                View
              </button>
              <button className="obut fw-bold mt-3" type="button" onClick={() => remove(product)}>
                Cancel Order
              </button>
            </div>
          </div>
        ))
      }
    </Container>
  );
}

export default Orders;