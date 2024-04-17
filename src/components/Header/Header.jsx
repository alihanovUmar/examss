import React from "react";
import { CiHome } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Импортируем контекст корзины
import { useFavorite } from "../../context/FavoriteContext"; // Импортируем контекст избранного

export const Header = () => {
  const { cart } = useCart(); // Получаем корзину из контекста корзины
  const { favorites } = useFavorite(); // Получаем список избранных из контекста избранного

  return (
    <header>
      <div className="container">
        <div className="header__left__right">
          <div className="header__left">
            <Link to="/">
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
            <Link to="/favorite">
              <button className="header__favorites">
                <MdFavoriteBorder /> Favorites
                {favorites.length > 0 && <span className="favorites__count">({favorites.length})</span>}
              </button>
            </Link>
            <Link to="yourcrad">
              <button className="header__basket">
                <SlBasket className="header__btn__icon" />Your cart
                {cart.length > 0 && <span className="cart__count">({cart.length})</span>} 
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

