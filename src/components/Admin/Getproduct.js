import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import './Admin.css'
import { useNavigate } from "react-router-dom";



const Getproducts = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/product/getproducts")
      setProducts(result.data.payload)
    }
    fetchData();
  }, [])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get navigate functon to navigate programatically
  let navigate = useNavigate();


  const view = (product) => {
    navigate(`/product/${product.pid}`)
  }


  const remove = (product) => {
    let prodpid = product.pid;
    console.log(prodpid)
    axios
      .delete(`http://localhost:5000/product/remove-product/${prodpid}`)
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
    <Container className="w-75">
      <h1 className="pb-2">Products</h1>
      <div className="row">
        {
          products.map((product) => (
            <div className="product col-md-4 p-4">
              <img className="image" src={product.imgurl} alt="Card image" style={{ width: '100%' }} />
              <div className="middle">
                <h4 className="fw-bold">{product.productname}</h4>
                <br />
                <h6 className="fw-bold">₹{product.price}</h6>
                <button className="but fw-bold" type="button" onClick={() => remove(product)} >
                  Remove Product
                </button>
                <button className="but fw-bold" type="button" onClick={() => view(product)} >
                  View
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </Container >
  );
}

export default Getproducts;