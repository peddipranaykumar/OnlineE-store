import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="foot bg-dark mt-5">
      <p className="container text-white pt-4 pb-4 text-end">City: Hyderbad<br />ContactUs:
        XXXXXXXXXX <br />Peddi Pranay Kumar</p>
        <a
        class="btn btn-link btn-floating btn-lg text-dark m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-facebook-f"></i
      ></a>
    </footer>
  );
}

export default Footer;