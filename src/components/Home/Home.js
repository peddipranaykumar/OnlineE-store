import Cardlinks from "../Cardlinks/Cardlinks";
import Carousel from "../Carousel/Carousel"
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../Footer/Footer";


const Rhome = () => {
    return (
        <div>
            <Carousel />
            <Container>
                <Cardlinks />
            </Container>
        </div>
    );
}

export default Rhome;