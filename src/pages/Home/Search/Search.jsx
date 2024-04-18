import React from "react";
import { TfiSearch } from "react-icons/tfi";

export const Search = ({ setInputVal }) => {
  const inputHandle = (evt) => {
    if (evt.key === "Enter") {
      setInputVal(evt.target.value);
    }
  };

  const buttonHandle = () => {
    const inputVal = document.querySelector(".search__input").value;
    setInputVal(inputVal);
  };

  return (
    <section className="search">
      <div className="container">
        <center>
          <input
            className="search__input"
            type="text"
            placeholder="Search for products"
            onKeyUp={inputHandle}
          />
          <button className="search__btn" onClick={buttonHandle}>
            <TfiSearch />
          </button>
        </center>
      </div>
    </section>
  );
};
