import React from "react";
import customersImg from "../../../assets/images/customers.svg";

export const CustomersPropis = (item) => {
  return (
    <div>
      <div className="customers__block">
        <div className="block__left__right">
          <div className="block__left">
            <div className="block__profil">
              <div className="block__left__logo"></div>
              <h2 className="block__left__text">{item.name}</h2>
            </div>
            <p className="block__text">{item.text}</p>
          </div>
          <div className="block__right">
            <img src={customersImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
