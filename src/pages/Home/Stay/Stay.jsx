import React from "react";

export const Stay = () => {
  return (
    <>
      <section className="stay">
        <div className="container">
          <h2>
            Stay in the Loop with <br /> the Latest Trends and Deals!
          </h2>
          <center>
            <div className="stay__wrapper">
              <input
                className="stay__input"
                type="text"
                placeholder="Email address"
              />
              <button className="stay__btn">Subscribe</button>
            </div>
          </center>
        </div>
      </section>
    </>
  );
};
