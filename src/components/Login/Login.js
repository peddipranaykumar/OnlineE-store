import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import Cookies from "js-cookie";
import './Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get navigate functon to navigate programatically
  let navigate = useNavigate();

  const signIn = useSignIn();

  //when login form is submitted
  const onFormSubmit = (userObj) => {
    axios
      .post("http://localhost:5000/user/login", userObj)
      .then((response) => {
        //if user created
        if (response.data.message === "success") {
          signIn({
            token: response.data.payload,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { username: userObj.username }
          })
          //navigate to login
          navigate("/");
        }
        else{
          alert(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
      
      Cookies.set('name', userObj.username)
  };


  return (
    <div className="signup">
      <Container className="box d-flex justify-content-center">

        <div className="formsize" >
          <div class="">
            <h1 className="mb-4">Log In</h1>

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
            <p className="mt-2">New user? <span><a href="/signup" class="">Create an account</a></span></p>
            <p className="mt-2"><span><a href="/adminlogin" class="">Admin Log In</a></span></p>
            <Button classNamemt-2 variant="secondary" type="submit" className="w-25">Login</Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;