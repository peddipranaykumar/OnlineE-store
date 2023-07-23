import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './Payment.css'
import axios from "axios";
import Cookies from "js-cookie";



const Payment = () => {
  let username = Cookies.get('name')

  const placeorder = () => {
    axios
      .put(`http://localhost:5000/cart/placeorder/${username}`)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in placing order");
      });
  };


  return (
    <Container className="d-flex align-items-center justify-content-center mt-5 bg-light w-50 p-4 pay">
      <div >
        <Form>
          <h3 className="mb-5">Payment</h3>

          <Form.Group className="mb-3">
            <Form.Control onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
            }} type="number" placeholder="Card Number" />
          </Form.Group>

          <Row className="mb-3 paym">

            <Form.Group as={Col} controlId="formGridState">
              <Form.Select placeholder="MM">
                <option value="" selected disabled>MM</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Select placeholder="YYYY  ">
                <option value="" selected disabled>YYYY</option>
                <option value="1">2022</option>
                <option value="2">2023</option>
                <option value="3">2024</option>
                <option value="4">2025</option>
                <option value="5">2026</option>
                <option value="6">2027</option>
                <option value="7">2028</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Control type="password" minlength="3" maxlength="3" placeholder="CVV" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control type="text" placeholder="Card Holders Name" />
          </Form.Group>

          <Button variant="primary" type="button" onClick={() => placeorder()} >
            Pay
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Payment;