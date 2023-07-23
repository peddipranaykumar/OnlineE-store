import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import Login from '../Login/Login';
import Signup from '../Signup/signup';
import Admin from '../Admin/Admin'
import { useNavigate, Navigate } from "react-router-dom";
import Addproduct from "../Admin/Addproduct";
import Getproducts from "../Admin/Getproduct";
import Products from "../Products/Products";
import Productdevice from "../Products/Productdevice"
import './Navbar.css'
import Productdetails from "../Products/Productdetails";
import { RequireAuth, useIsAuthenticated, useAuthUser, useSignOut } from "react-auth-kit";
import Cookies from "js-cookie";
import AdminLogin from "../Login/AdminLogin";
import Payment from "../Payment/Payment";
import Orders from "../Orders/Orders";

const Rnavbar = () => {

	let username = Cookies.get('name')
	Cookies.set('Adminname', null)

	const isAuth = useIsAuthenticated();
	const user = useAuthUser();
	const signOut = useSignOut();

	//get navigate function
	let navigate = useNavigate();

	//logout user
	const userLogout = () => {
		signOut();
		Cookies.remove('name')
		navigate("/login");
	};

	return (
		<div>
			<Navbar fixed="top" collapseOnSelect expand="sm" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="/">Gadget Area</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">

						{isAuth() !== true ? (
							<>
								<Nav className="w-100">
									{/* These links can be visible when no user logged in */}




									<div className="w-100 d-flex justify-content-end">
										<Nav.Item className="px-2 sign">
											<Nav.Link eventKey="4" as={NavLink} to="/adminlogin">
												Admin
											</Nav.Link>
										</Nav.Item>

										<Nav.Item className="px-2 sign">
											<Nav.Link eventKey="5" as={NavLink} to="/signup">
												Signup
											</Nav.Link>
										</Nav.Item>

										<Nav.Item className="px-2 ">
											<Nav.Link eventKey="6" as={NavLink} to="/login">
												Login
											</Nav.Link>
										</Nav.Item>
									</div>
								</Nav>

							</>
						) : (
							<>
								<Nav className="w-100">
									<div className="w-100 ps-5 d-flex justify-content-around">
										<Nav.Item className="px-2">
											<Nav.Link eventKey="6" as={NavLink} to="/">
												Home
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="px-2">
											<Nav.Link eventKey="7" onClick="window.location.reload();return false;" as={NavLink} to="/mobiles">
												Mobiles
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="px-8">
											<Nav.Link eventKey="7" onClick="window.location.reload();return false;" as={NavLink} to="/laptops">
												Laptops
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="px-9">
											<Nav.Link eventKey="8" onClick="window.location.reload();return false;" as={NavLink} to="/audio">
												Audio
											</Nav.Link>
										</Nav.Item>

										<Nav.Item className="px-2">
											<Nav.Link eventKey="10" as={NavLink} to="/cart">
												Cart
											</Nav.Link>
										</Nav.Item>
									</div>
									{/* This dropdown is visible only when a user is logged in */}
									<div className="w-100 d-flex justify-content-end">
										<NavDropdown
											title={username}
											id="collasible-nav-dropdown drop-down"
										>
											<NavDropdown.Item href="/orders" className="text-dark" >
												My orders
											</NavDropdown.Item>
											<NavDropdown.Item onClick={userLogout}>
												Logout
											</NavDropdown.Item>
										</NavDropdown>
									</div>
								</Nav>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/adminlogin" element={<AdminLogin />} />
				<Route path="/orders" element={<Orders />} />

				<Route path="/cart" element={<RequireAuth loginPath="/login">
					<Cart />
				</RequireAuth>} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/addproduct" element={<Addproduct />} />
				<Route path="/getproducts" element={<Getproducts />} />
				<Route path="/payment" element={<Payment />} />

				<Route path="product/:prod" element={<RequireAuth loginPath="/login">
					<Productdetails />
				</RequireAuth>} />

				<Route path="/:device" element={<RequireAuth loginPath="/login">
					<Productdevice />
				</RequireAuth>} />

				<Route path="/:device/:brand" element={<RequireAuth loginPath="/login">
					<Products />
				</RequireAuth>} />


			</Routes>
		</div >
	);
}

export default Rnavbar;