import React from "react";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Getproducts from "./Getproduct";
import Cookies from "js-cookie";
import { useEffect } from "react";


function Admin() {
  const logout = () => {
    Cookies.set('Adminname', null)
    navigate("/adminlogin");
  };

  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    console.log(Cookies.get('Adminname'));
    if (Cookies.get('Adminname') === null) {
      navigate('/adminlogin')
    }
  });

  const onFormSubmit = (productObj) => {
    window.location.reload()
    axios
      .post("http://localhost:5000/product/create-product", productObj)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in creating user");
      });
  };

  return (

    <Container>
      <div className="text-end">
        <Button classNamemt-2 variant="primary" type="button" onClick={() => logout()} className="logout pos">
          Logout
        </Button>
      </div>

      <Button className="pos" onClick={handleShow} >
        Add Product
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Product */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="text" autocomplete="off" placeholder="Product Name" {...register("productname", { required: true })} />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Product name required</p>
              )}
            </Form.Group>

            {/* Product */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="text" autocomplete="off" placeholder="Type of device" {...register("device", { required: true })} />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Product name required</p>
              )}
            </Form.Group>

            {/* Product */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="text" autocomplete="off" placeholder="Brand" {...register("brand", { required: true })} />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Product name required</p>
              )}
            </Form.Group>

            {/* Product */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="number" autocomplete="off" placeholder="Product price" {...register("price", { required: true })} />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Product name required</p>
              )}
            </Form.Group>



            <h6 className="mt-2">Details:</h6>
            <div className=" d-flex justify-content-around">
              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="Color" {...register("color")} />
              </Form.Group>

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="Ram" {...register("ram")} />
              </Form.Group>

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="storage" {...register("storage")} />
              </Form.Group>

            </div>
            <div className=" d-flex justify-content-around">
              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="size" {...register("size")} />
              </Form.Group>

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="Processor" {...register("processor")} />
              </Form.Group>

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="OS" {...register("os")} />
              </Form.Group>
            </div>
            <div className=" d-flex justify-content-around">

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="Rear camera" {...register("rearcamera")} />
              </Form.Group>

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="Front camera" {...register("frontcamera")} />
              </Form.Group>

              <Form.Group className="pt-2 pb-2 w-25">
                <Form.Control type="text" autocomplete="off" placeholder="Battery" {...register("battery")} />
              </Form.Group>
            </div>




            {/* Product */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="text" autocomplete="off" placeholder="Image Url" {...register("imgurl", { required: true })} />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">*Image url required</p>
              )}
            </Form.Group>


            <Button className="mt-2" variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="flow">

        <Getproducts />
      </div>
    </Container>
  );
}

export default Admin;