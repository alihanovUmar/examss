import React from "react";
import { useFavorite } from "../../context/FavoriteContext";
import { BiSolidCartDownload } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../../context/CartContext";

export const Favorites = () => {
  const { favorites, removeFromFavorites, addToFavorites } = useFavorite();
  const { cart, addToCart, removeFromCart } = useCart();

  const handleRemoveFromFavorites = (id) => {
    removeFromFavorites(id);
  };

  const handleAddToCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex !== -1) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  const handleRemoveAllFavorites = () => {
    favorites.forEach((item) => {
      removeFromFavorites(item.id);
    });
  };

  return (
    <section>
      <div className="container">
        <div className="cart__btns">
          <button className="cart__btn" onClick={handleRemoveAllFavorites}>
            Remove All
          </button>
        </div>
        <div className="cart__left__right">
          <ul className="cart__left">
            {favorites.map((item) => (
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
                      className="cart__btn"
                      onClick={() => handleRemoveFromFavorites(item.id)}
                    >
                      <MdDeleteForever />
                    </button>
                    <button
                      className="cart__btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <BiSolidCartDownload />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
