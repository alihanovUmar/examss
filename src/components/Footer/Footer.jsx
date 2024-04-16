import React from "react";
import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer__left__right">
          <div className="footer__left">
            <Link to="/" >
            <button className="footer__btn">
              <CiHome className="header__btn__icon" /> Shop4Goodies
            </button>
            </Link>
          </div>
          <div className="footer__right">
            <h2>#footerwithoutadesign © 2024 Dosio Dosev.</h2>
          </div>
        </div>
      </div>
    </footer>
  );
};
