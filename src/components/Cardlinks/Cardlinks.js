import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './Cardlinks.css';


const Rcardlinks = () => {
    return (
        <Container>
            <h1 className=' pt-4 text-start'>Shop by Product</h1>
            <div className='row pt-4'>
                <div className="produc col-md-4 ">
                    <span>
                        <a className='cardl' href="/mobiles">
                            <img className=" device" src="https://images.unsplash.com/photo-1598327106026-d9521da673d1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500" alt="Card image" style={{ width: '100%' }} />
                            <div className="middle mt-5">
                                <br />
                                <h4 className="fw-bold mt-4">MOBILES</h4>
                            </div>
                        </a>
                    </span>
                </div>
                <div className="produc col-md-4 ">
                    <span>
                        <a className='cardl' href="/laptops">
                            <img className=" device" src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464" alt="Card image" style={{ width: '100%' }} />
                            <div className="middle mt-5">
                                <br />
                                <h4 className="fw-bold mt-4">LAPTOPS</h4>
                            </div>
                        </a>
                    </span>
                </div>
                <div className="produc col-md-4 ">
                    <span>
                        <a className='cardl' href="/laptops">
                            <img className=" device " src="https://images.unsplash.com/photo-1578319439584-104c94d37305?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870" alt="Card image" style={{ width: '100%' }} />
                            <div className="middle mt-5 mt-4    ">
                                <br />
                                <h4 className="fw-bold">AUDIO</h4>
                            </div>
                        </a>
                    </span>
                </div>
            </div>
        </Container >
    );
}

export default Rcardlinks;