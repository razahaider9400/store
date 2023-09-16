import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



const CategoryDetail = ({updateCart}) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/" + id, {})
      .then((response) => {
        setProduct(response.data);
      });
  }, [product]);

  const increment = () => {
    setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <img
            src={product.image}
            className="w-75 d-block mx-auto mt-5"
            alt=""
          />
        </div>
        <div className="col-md-6 mt-5 ms-2 my-4">
          <h4>{product.title}</h4>
          <p className="mt-5 w-75">{product.description}</p>
          <span className="badge bg-success fs-5"> $ {product.price}</span>
          <div className="mt-5">
            <button
              className="btn btn-danger reounded-pill"
              onClick={increment}
            >
              <i className="bi bi-plus fs-5"></i>
            </button>
            <button className="btn btn-light px-3">{qty}</button>
            <button
              className="btn btn-danger reounded-pill"
              onClick={decrement}
            >
              <i className="bi bi-dash fs-5"></i>
            </button>
          </div>
          <div>
            <button className="btn btn-primary mt-5" onClick={() => updateCart(product, qty)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryDetail;
