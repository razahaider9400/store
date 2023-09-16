import React from "react";
import { Link } from "react-router-dom";
const Header = ({ cart, updateCart, placeOrder }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            E-commerce
          </a>
          <div className="fw-bold fs-5">
            <i
              className="bi bi-cart"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
            ></i>
            <span>{cart.length}</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Cart</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body text-black">
          {cart.map((c) => {
            return (
              <div key={c.id} className="card p-0 border-2 my-3">
                <div className="card-body">
                  <h5 className="text-center">{c.title}</h5>
                  <h6 className="text-center my-3">$ {c.price}</h6>
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="d-block me-auto"
                      width="100"
                      src={c.image}
                      alt=""
                    />

                    <button
                      className="btn btn-danger col-2 text-white"
                      onClick={() => updateCart(c, 1)}
                    >
                      <i className="bi bi-plus text-white fs-5 fw-bold"></i>
                    </button>
                    <button className="btn text-black col-2 py-2">
                      {c.qty}
                    </button>
                    <button
                      className="btn btn-danger col-2 text-white"
                      onClick={() => updateCart(c, 1, true)}
                    >
                      <i className="bi bi-dash text-white fs-5 fw-bold"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {cart.length > 0 ? (
            <>
              <h5 className="text-center mt-5 mb-2">
                Total ={" "}
                {cart.reduce((total, item) => total + item.price * item.qty, 0)}
              </h5>
              <div className="text-center mt-3">
                <button
                  className="col-8 mx-auto btn btn-danger text-white py-2"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </>
          ) : (
            <p className="mt-5"> Cart is empty</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
