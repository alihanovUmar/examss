import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { GrFavorite } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useFavorite } from "../../context/FavoriteContext"; // Импортируем контекст избранного

export const YourCart = () => {
  const {
    cart,
    removeFromCart,
  } = useCart();
  
  const { addToFavorites, removeFromFavorites, favorites } = useFavorite(); // Получаем функции и список избранных из контекста избранного

  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  }, [cart]);

  // Функция для обработки добавления в избранное
  const handleAddToFavorites = (item) => {
    if (favorites.some((favorite) => favorite.id === item.id)) {
      // Если товар уже в избранном, удаляем его
      removeFromFavorites(item.id);
    } else {
      // Если товар не в избранном, добавляем его
      addToFavorites(item);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="cart__left__right">
          <ul className="cart__left">
            {cart.map((item) => (
              <li className="cart__wrapper" key={item.id}>
                <div className="cart__img">
                  <img src={item.image} alt="" />
                </div>
                <div className="cart__info">
                  <h2>{item.price}</h2>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="cart__btns">
                    <button
                      className="cart__btn__like"
                      onClick={() => handleAddToFavorites(item)}
                    >
                      <GrFavorite />
                    </button>
                    <button
                      className="cart__btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={`total ${cart.length === 0 ? "empty" : ""}`}>
            <div className="adres">
              <p>Summary</p>

              <button className="order">Enter Discount Coupon Here</button>

              <hr />

              <p className="total__info">
                Total<span>€{totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
