import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import './Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  //get navigate functon to navigate programatically
  let navigate = useNavigate();



  //when login form is submitted
  const onFormSubmit = (userObj) => {
    axios
      .post("http://localhost:5000/admin/login", userObj)
      .then((response) => {
        //if user created
        if (response.data.message === "success") {
          //navigate to login
          Cookies.set('Adminname', userObj.username)
          navigate("/admin");
        }
        else{
          alert(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
      
      
  };





  return (
    <div className="signup">
      <Container className="box d-flex justify-content-center">


        <div className="formsize" >
          <div class="">
            <h1 className="mb-4">Admin Log In</h1>

          </div>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <Form.Group className="mt-2 pb-2">
              <Form.Control
                type="text"
                placeholder="Enter Username"
                {...register("username", { required: true })}
              />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Username is required</p>
              )}
            </Form.Group>

            {/* password */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control

                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {/* validation error message for password */}
              {errors.password && (
                <p className="text-danger">* Password is required</p>
              )}
            </Form.Group>
            <p className="mt-2"><span><a href="/login" class="">User Log In</a></span>
            </p>
            <Button classNamemt-2 variant="secondary" type="submit" className="w-25">
              Login
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default AdminLogin;