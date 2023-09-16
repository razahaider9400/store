import { useState } from "react";
import Header from "./componenets/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryDetail from "./pages/CategoryDetail";
const App = () => {
  const [cart, setCart] = useState([]);

  const updateCart = (product, qty, minus = false, showSwal = false) => {
    let newCart = [...cart];
    let findProduct = newCart.find((e) => e.id === product.id);
    if (findProduct) {
      if (minus) {
        if (findProduct.qty > 1) {
          findProduct.qty = findProduct.qty - qty;
          setCart(newCart);
        } else {
          swal
            .fire({
              title: "Are you sure?",
              text: "You want to remove the item from the cart!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, remove it!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                setCart(newCart.filter((c) => c.id !== findProduct.id));
                Swal.fire("Removed!", "Item removed from cart.", "success");
              }
            });
        }
      } else {
        findProduct.qty = findProduct.qty + qty;
        setCart(newCart);
        if (showSwal) {
          swal.fire({
            position: "center",
            icon: "success",
            title: "Product added to cart",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } else {
      setCart([...cart, { ...product, qty }]);
      swal.fire({
        position: "center",
        icon: "success",
        title: "Product added to cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const placeOrder = () => {
    setCart([]);
    swal.fire({
      show: true,
      position: "center",
      icon: "success",
      title: "Order placed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <BrowserRouter>
        <Header cart={cart} updateCart={updateCart} placeOrder={placeOrder} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/category-detail/:id"
            element={<CategoryDetail updateCart={updateCart} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
