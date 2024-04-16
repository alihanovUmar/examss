import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Single = () => {
  const { id } = useParams();
  const [single, setSingle] = useState({
    isLoading: true,
    isError: false,
    data: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          setSingle({
            isLoading: false,
            isError: false,
            data: json,
          });
        } else {
          throw new Error("No data received");
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setSingle({
          isLoading: false,
          isError: true,
          data: null,
        });
      });
  }, [id]);

  if (single.isLoading) return <h1 className="loading">Loading...</h1>;
  if (single.isError)
    return <p className="error">Error loading product details</p>;

  return (
    <div className="container">
      <div className="single">
        <div className="singleleftright">
          <div className="single__left">
            <button className="back" onClick={() => navigate(-1)}>
              <MdArrowBack />
              Back
            </button>
          </div>
          <div className="single__right">
            <div className="image-container">
              <img src={single.data.image} alt={single.data.title} />
            </div>
            <div className="content-container">
              <h2 className="title">{single.data.title}</h2>
              <div className="flex">
                <p className="price">Price: ${single.data.price}</p>
                <p className="category">Category: {single.data.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;