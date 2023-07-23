import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import axios from "axios";
import './Signup.css'
import { useNavigate } from "react-router-dom";



function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();


  const onFormSubmit = (userObj) => {
    axios
      .post("http://localhost:5000/user/signup", userObj)
      .then((response) => {
        alert(response.data.message);
        //if user created
        if (response.data.message === "New user created") {
          //navigate to login
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in creating user");
      });
  };



  return (
    <div className="signup ">
      <Container className="box d-flex justify-content-center">

        <div className="formsize ">
          <div >
            <h1 className="mb-4">Sign Up</h1>

          </div>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="text" placeholder="Enter Username" {...register("username", { required: true })} />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Username is required</p>
              )}
            </Form.Group>



            {/* password */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="password" placeholder="Enter Password" {...register("password", { required: true })}
              />
              {/* validation error message for password */}
              {errors.password && (
                <p className="text-danger">* Password is required</p>
              )}
            </Form.Group>



            {/* email */}
            <Form.Group className="pt-2 pb-2">
              <Form.Control type="text" placeholder="Enter email" {...register("email", { required: true })}
              />
              {/* validation error message for password */}
              {errors.email && (
                <p className="text-danger">* Email is required</p>
              )}
            </Form.Group>
            <p class="mt-2">Existing User? <span><a href="/login" class="">Login </a></span>
            </p>
            <Button className="mt-2" variant="primary" type="submit">
              Signup <MdLogin />
            </Button>
          </Form>
        </div>
      </Container >
    </div >
  );
}


export default SignUp;