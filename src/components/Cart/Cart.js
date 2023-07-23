import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import '../Admin/Admin.css'
import './Cart.css'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Cart = () => {

	const navigate = useNavigate();
	let uname = { username: Cookies.get('name') };
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.post("http://localhost:5000/cart/getcart", uname)
			setProducts(result.data.payload)
		}
		fetchData();
	}, [])
	let sumval = 0;
	products.map((product) => {
		sumval = sumval + parseInt(product.price)
		console.log(sumval)
	})
	const tax = sumval * 0.014
	const delivery = 100



	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
		<Container className="px-0">
			{products.length !== 0 ? (
				<div className="row">
					<div className="col-sm-8">
						<h1 className="pb-2">Products</h1>
						<div className="row">
							{
								products.map((product) => (
									<div className="product col-md-6 p-4">
										<img className="image" src={product.imgurl} alt="Card image" style={{ width: '100%' }} />
										<div className="middle">
											<h4 className="fw-bold">{product.productname}</h4>
											<br />
											<h6 className="fw-bold">₹{product.price}</h6>
											<button className="but fw-bold" type="button" onClick={() => view(product)} >
												View
											</button>
											<button className="but fw-bold" type="button" onClick={() => remove(product)} >
												Remove from cart
											</button>
										</div>
									</div>
								))
							}
						</div>
					</div >

					<div className="col-sm-4 bg-white h-100 p-4 pt-5 text-secondary posi">
						<h3 className="text-dark fw-bold">Checkout</h3>
						<br />
						<h5 className="text-start text-dark pb-2">Bill</h5>
						{products.map((product) => (
							<div className="d-flex justify-content-between">
								<p>{product.productname} </p>
								<p>₹{product.price}</p>
							</div>
						))}
						<div className="d-flex justify-content-between">
							<p>tax</p>
							<p>₹{tax}</p>
						</div>
						<div className="d-flex justify-content-between">
							<p>delivary charges</p>
							<p>₹{delivery}</p>
						</div>
						<div className="d-flex justify-content-between border-top border-dark text-dark">
							<p>total</p>
							<p>₹{sumval}</p>
						</div>
						<button onClick={() => { navigate('/payment') }} type="button" className="btn btn-success">Place order</button>
					</div>
				</div>
			) : (
				<div className="m-5 p-5">
					<h1>Your Cart is Empty</h1>
				</div>
			)}
		</Container>
	);
}

export default Cart;