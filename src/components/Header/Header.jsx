import React from "react";
import { CiHome } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header__left__right">
          <div className="header__left">
            <Link to="/" >
            <button className="header__btn">
              <CiHome className="header__btn__icon" />
              Shop4Goodies
            </button>
            </Link>
          </div>
          <div className="header__right">
            <nav>
              <ul>
                <li className="header__link">
                  <Link to="/">Home</Link>
                </li>
                <li className="header__link">
                  <Link to="/admin">Admin </Link>
                </li>
              </ul>
            </nav>
            <Link to="/favorite" >
            <button className="header__basket">
              <MdFavoriteBorder /> Favorites
            </button>
            </Link>
            <Link to="yourcrad" >
            <button className="header__basket">
              <SlBasket className="header__btn__icon" /> Your cart
            </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
