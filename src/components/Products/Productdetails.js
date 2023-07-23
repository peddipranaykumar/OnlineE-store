import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import './Productdetails.css';
import Cookies from "js-cookie";

const Productdetails = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let device = (window.location.pathname.split('/')[2])
      let result = await axios.get(`http://localhost:5000/product/getproduct/${device}`)
      setProducts(result.data.payload)
    }
    fetchData();
  }, [])

  const addtocart = (product) => {
    delete product["_id"];
    console.log(product)
    product.username = Cookies.get('name')
    axios
      .post("http://localhost:5000/cart/add-to-cart", product)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in adding to cart");
      });
  };


  return (
    <Container >
      {
        <div className="row">
          <div className="col-md-5 p-5 mt-5 ">
            <img className="w-100 " src={products.imgurl} />
          </div>
          <div className="col-md-7 text-start">
            <div className="pt-5">
              <h1 className="text-start border-bottom">{products.productname}</h1>
            </div>
            <h4 className="mt-4">
              Specifications:
            </h4>
            <br />
            <table className="">
              <tbody>


                <tr className="">
                  <td className="">
                    <span className="">Brand</span>
                  </td>
                  <td className="">
                    <span className="">{products.brand}</span>
                  </td>
                </tr>



                {products.color !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Color</span>
                    </td>
                    <td className="">
                      <span className="">{products.color}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}



                {products.ram !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">ram</span>
                    </td>
                    <td className="">
                      <span className="">{products.ram}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}



                {products.storage !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Storage</span>
                    </td>
                    <td className="">
                      <span className="">{products.storage}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}



                {products.size !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Size(Diagonal)</span>
                    </td>
                    <td className="">
                      <span className="">{products.size}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}



                {products.processor !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Processor</span>
                    </td>
                    <td className="">
                      <span className="">{products.processor}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}



                {products.os !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">OS</span>
                    </td>
                    <td className="">
                      <span className="">{products.os}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}


                {products.rearcamera !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Rear Camera</span>
                    </td>
                    <td className="">
                      <span className="">{products.rearcamera}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}


                {products.frontcamera !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Front Camera</span>
                    </td>
                    <td className="">
                      <span className="">{products.frontcamera}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}

                
                {products.battery !== "" ? (
                  <tr className="">
                    <td className="">
                      <span className="">Battery</span>
                    </td>
                    <td className="">
                      <span className="">{products.battery}</span>
                    </td>
                  </tr>

                ) : (
                  <></>
                )}

              </tbody>
            </table>
            <h4 className="mt-4">Price:</h4><h5><sup>₹</sup>{products.price}</h5>
            <Button className="add mt-3" variant="success" type="button" onClick={() => addtocart(products)} >Add to cart</Button>
          </div>
        </div>
      }
    </Container >
  );
}

export default Productdetails;