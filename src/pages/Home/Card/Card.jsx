import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSolidCartDownload } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import NoResultsImage from "../../../assets/images/No results.jpg";
import loadingImg from "../../../assets/images/loading.svg";
import { Search } from "../Search/Search";
import { useCart } from "../../../context/CartContext";
import { useFavorite } from "../../../context/FavoriteContext";

const Card = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setDatas(json);
        setFilter(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error :", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <section>
      <Search setInputVal={handleSearch} />
      <div className="container">
        <div className="card__info">
          <div className="crad__info__text">
            <h2 className="card__info__title">New Arrivals</h2>
            <h2 className="card__info__suptitle">
              Check out the latest products
            </h2>
          </div>

          <div className="select">
            <select
              className="option"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>

            <Link to="/all">
              <button className="card__info__btn">View all</button>
            </Link>
          </div>
        </div>

        {loading ? (
          <center>
            <img src={loadingImg} alt="Loading" />
          </center>
        ) : (
          <>
            <ul className="card__block">
              {filter.length ? (
                filter.map((item) => (
                  <li className="card" key={item.id}>
                    <Link to={`/single/${item.id}`}>
                      <img
                        className="card__img"
                        src={item.image}
                        alt={item.title}
                      />
                    </Link>
                    <h3 className="card__title">{item.title}</h3>
                    <p className="card__description">{item.description}</p>
                    <p className="card__price">{item.price}</p>
                    <div className="card__btns">
                      <button
                        className={`card__btn1 ${
                          favorites.some((favorite) => favorite.id === item.id)
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          const isFavorite = favorites.some(
                            (favorite) => favorite.id === item.id
                          );
                          if (isFavorite) {
                            removeFromFavorites(item.id);
                          } else {
                            addToFavorites(item);
                          }
                        }}
                      >
                        <GrFavorite />
                      </button>
                      <button
                        className="card__btn2"
                        onClick={() => {
                          const itemIndex = cart.findIndex(
                            (cartItem) => cartItem.id === item.id
                          );
                          if (itemIndex !== -1) {
                            removeFromCart(item.id);
                          } else {
                            addToCart(item);
                          }
                        }}
                      >
                        <BiSolidCartDownload />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <img src={NoResultsImage} alt="No Results" />
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default Card;
