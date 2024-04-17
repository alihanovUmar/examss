import React, { useState } from "react";
import useStore from "../../../store/useStore";

export const Adminka = ({ allCount, favoritesCount, cartCount }) => {
  const { setDatas } = useStore((state) => ({
    setDatas: state.setDatas,
  }));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newItem = await response.json();
      setDatas((prevDatas) => [...prevDatas, newItem]); 
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="adminka">
      <div className="container">
        <div className="adminka__left__right">
          <div className="adminka__left">
            <div className="adminka__profil"></div>
            <div className="info">
              <div className="profil__name">Akbar Akbarov</div>
            </div>
          </div>
          <div className="adminka__right">
            <h2>Admin Panel</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
              />
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
