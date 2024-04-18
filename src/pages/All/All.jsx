import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { BiSolidCartDownload } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Search } from "../Home/Search/Search";
import loadingImg from "../../assets/images/loading.svg";
import No from "../../assets/images/No results.jpg";
import { useFavorite } from "../../context/FavoriteContext";

export const All = () => {
  const { favorites, setFavorites: updateFavorites } = useFavorite();
  const { datas, setDatas, cart, setCart } = useStore((state) => ({
    datas: state.datas,
    setDatas: state.setDatas,
    cart: state.cart,
    setCart: state.setCart,
  }));
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
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
        console.error("Error:", error);
        setLoading(false);
      });
  }, [setDatas]);

  useEffect(() => {
    let filteredData = datas;
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === selectedCategory
      );
    }
    if (search.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilter(filteredData);
  }, [selectedCategory, search, datas]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToFavorites = (item) => {
    if (!favorites.some((favoriteItem) => favoriteItem.id === item.id)) {
      updateFavorites([...favorites, item]);
    }
  };

  const removeFromFavoritesFunction = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    updateFavorites(updatedFavorites);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <section>
      <Search setInputVal={handleSearch} />
      <div className="container">
        <div className="btn">
          <Link to="/">
            <button className="back">
              <IoIosArrowRoundBack className="back__icon" />
            </button>
          </Link>
          <select
            className="option"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Filter by Product</option>
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="men's clothing">men's clothing</option>
            <option value="women's clothing">women's clothing</option>
          </select>
        </div>

        {loading ? (
          <center>
            <img src={loadingImg} alt="Loading" />
          </center>
        ) : (
          <ul className="all">
            {filter.length ? (
              filter.map((item) => (
                <li className="all__card" key={item.id}>
                  <img className="all__img" src={item.image} alt={item.title} />
                  <h3 className="all__title">{item.title}</h3>
                  <p className="all__description">{item.description}</p>
                  <p className="all__price">{item.price}</p>
                  <div className="all__btns">
                    <button
                      className="all__btn1"
                      onClick={() => addToFavorites(item)}
                    >
                      <GrFavorite />
                    </button>

                    <button
                      className="all__btn2"
                      onClick={() => addToCart(item)}
                    >
                      <BiSolidCartDownload />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <img src={No} alt="" />
            )}
          </ul>
        )}
      </div>
    </section>
  );
};
