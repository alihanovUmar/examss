import React, { useState, useEffect } from "react";
import useStore from "../../../store/useStore";
import { BiSolidCartDownload } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Search } from "../../Home/Search/Search";
import loadingImg from "../../../assets/images/loading.svg";
import No from "../../../assets/images/No results.jpg";
import { useFavorite } from "../../../context/FavoriteContext";

export const Adminka = () => {
  const {
    favorites,
    removeFromFavorites,
    setFavorites: updateFavorites,
  } = useFavorite();
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
  const [editedProduct, setEditedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setDatas(json);
        setFilter(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedData = datas.filter((item) => item.id !== id);
        setDatas(updatedData);
        setFilter(updatedData);
        localStorage.setItem("adminka_datas", JSON.stringify(updatedData));
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = datas.find((item) => item.id === id);
    setEditedProduct(productToEdit);
    setImageUrl(productToEdit.image);
    setEditedImageUrl(productToEdit.image);
    setIsEditing(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        const updatedData = datas.map((item) => {
          if (item.id === updatedProduct.id) {
            return updatedProduct;
          }
          return item;
        });
        setDatas(updatedData);
        setFilter(updatedData);
        setIsEditing(false);
        setEditedProduct(null);
        localStorage.setItem("adminka_datas", JSON.stringify(updatedData));
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedProduct({ ...editedProduct, image: reader.result });
      setEditedImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditedProduct(null);
  };

  const addProduct = async () => {
    const title = prompt("Enter product title:");
    const price = parseFloat(prompt("Enter product price:"));
    const description = prompt("Enter product description:");
    const category = prompt("Enter product category:");
    const image = prompt("Enter product image URL:");

    if (!title || !price || !description || !category || !image) {
      alert("All fields are required.");
      return;
    }

    const newProduct = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const updatedData = await response.json();
        const newProductId = Math.floor(Math.random() * 1000) + 1;
        setDatas([...datas, { ...updatedData, id: newProductId }]);
        setFilter([...filter, { ...updatedData, id: newProductId }]);
        localStorage.setItem("adminka_datas", JSON.stringify(datas));
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <div className="select__add" >
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

            <button className="back add-product-btn" onClick={addProduct}>
              Add Product
            </button>
          </div>
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
                  <img className="all__img" src={item.id === editedProduct?.id ? editedImageUrl : item.image} alt={item.title} />
                  <h3 className="all__title">{item.title}</h3>
                  <p className="all__description">{item.description}</p>
                  <p className="all__price">{item.price}</p>
                  <div className="all__btns">
                    <button
                      className="all__btn1"
                      onClick={() => {
                        const isFavorite = favorites.some(
                          (favoriteItem) => favoriteItem.id === item.id
                        );
                        if (isFavorite) {
                          removeFromFavoritesFunction(item.id);
                        } else {
                          addToFavorites(item);
                        }
                      }}
                    >
                      <GrFavorite />
                    </button>

                    <button
                      className="all__btn2"
                      onClick={() => addToCart(item)}
                    >
                      <BiSolidCartDownload />
                    </button>

                    <button
                      className="all__btn2"
                      onClick={() => deleteProduct(item.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="all__btn2"
                      onClick={() => handleEditProduct(item.id)}
                    >
                      Edit
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
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editedProduct);
              }}
            >
              <center>
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </center>
              <center>
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </center>
              <center>
                <textarea
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </center>
              <center>
                <input
                  type="text"
                  value={editedImageUrl}
                  onChange={(e) => setEditedImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  required
                />
                {editedImageUrl && (
                  <img src={editedImageUrl} alt="Product" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                )}
              </center>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Adminka;
