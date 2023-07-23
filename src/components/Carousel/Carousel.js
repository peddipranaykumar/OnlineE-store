    import { Carousel } from 'react-bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useState } from 'react';
    import './Carousel.css'

    const Rcarousel = () => {
        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
        };
        return (
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <a href="/product/f6a6bf7f">
                        <img
                            className="d-block imgsize"
                            src="https://images.creativemarket.com/0.1.0/ps/12135444/1820/1214/m1/fpnw/wm0/creative-market-preview-.png?1648462100&s=42c906733f264274cfa4705f809ccd21"
                            alt="First slide"
                        />
                    </a>

                </Carousel.Item>
                <Carousel.Item>
                    <a href="/product/ed644f9c">
                        <img
                            className="d-block imgsize"
                            src="https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGFpcnBvZHMlMjBwcm98ZW58MHx8MHx8&w=1000&q=80"
                            alt="First slide"
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="/product/cb6e35b9">
                        <img
                            className="d-block imgsize"
                            src="https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/intro__ewz1ro7xs14y_large.jpg"
                            alt="First slide"
                        />
                    </a>
                </Carousel.Item>
            </Carousel>
        );
    }

    export default Rcarousel;