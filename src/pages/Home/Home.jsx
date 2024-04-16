import React from "react";
import { Hero } from "./Hero/Hero";
import Slider from "./Slider/Slider";
import  Card  from "../../pages/Home/Card/Card";
import { Free } from "./Free/Free";
import { Customers } from "./Customers/Customers";
import { Stay } from "./Stay/Stay";

export const Home = () => {
  return (
    <div>
      <Hero />
      <Slider />
      <Card />
      <Free />
      <Customers />
      <Stay />
    </div>
  );
};
