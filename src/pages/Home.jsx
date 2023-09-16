import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [products, setProducts] = useState([]);

  const changeCategory = (c) => {
    setSelectedCategory(c);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories", {})
      .then((response) => {
        setCategories(response.data);
        if (!selectedCategory) {
          setSelectedCategory(response.data[0]);
        }
      });
  }, [categories]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/category/" + selectedCategory, {})
      .then((response) => {
        setProducts(response.data);
      });
  }, [products]);

  return (
    <>
      <div
        className="mx-auto mt-5"
        style={{ overflowX: "auto",whiteSpace:'nowrap'}}
      >
        {categories.map((c) => {
          return (
            <button
              key={c}
              className={
                selectedCategory === c
                  ? "btn bg-danger text-white mx-2"
                  : "btn bg-dark text-white mx-2"
              }
              onClick={() => changeCategory(c)}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-5 mt-5">
        {products.map((p) => {
          return (
            <Link
              key={p.id}
              to={`/category-detail/${p.id}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <div className="col">
                <div className="card">
                  <img
                    src={p.image}
                    className="card-img-top"
                    height={250}
                    width={250}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
