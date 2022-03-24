import React from "react";

const ItemCard = (props) => {
  return (
    <div
      className="d-flex flex-column shadow p-3 mb-5 bg-white rounded align-items-center"
      style={{ width: "18rem" }}
    >
      <img
        className="card-img-top w-50 mx-auto mt-1"
        src={props.image}
        alt="book icon"
      />
      <h5 className=" text-center mt-2">{props.title}</h5>
      <p className="card-text text-center">{props.description}</p>

      {props.children}
    </div>
  );
};

export default ItemCard;
